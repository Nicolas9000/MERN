const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const { promisify } = require("util");
const fs = require("fs");
const unlinkProm = promisify(fs.unlink);

module.exports.uploadProfil = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.body.userId)) throw Error("Unknown ID");

    if (typeof req.file === "undefined") {
      throw Error("invalid file");
    }

    if (req.file.size > 500000) {
      const path = req.file.path;
      await unlinkProm(path);
      throw Error("max size");
    }

 

    const findUser = async () => {
      return await UserModel.findById(req.body.userId);
    };

    const updateUser = async () => {
      return await UserModel.findByIdAndUpdate(
        req.body.userId,
        {
          $set: {
            picture:
              __dirname +
              "/../client/public/uploads/profil/" +
              req.file.filename,
          },
        },
        { new: true }
      );
    };

    findUser()
      .then(async (res) => {
        const oldImage = res.picture;
        if (oldImage !== "./uploads/profil/random-user.png") {
          console.log(oldImage);
          console.log(
            __dirname + "/../client/public/uploads/profil/" + req.file.filename
          );
         await unlinkProm(oldImage);
          return true;
        }
      })
      .then((resp) => {
        if (resp === true) {
          updateUser().then((docs) => {
            console.log("done");
            res.send(docs);
          })
          .catch((err) => {
            return res.status(500).send(err);
          });
        }
      });
  } catch (err) {
    console.log(err);
    const erros = uploadErrors(err);
    return res.status(201).json({ erros });
  }
};
