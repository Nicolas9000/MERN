const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const { promisify } = require("util");
const fs = require("fs");
const unlinkProm = promisify(fs.unlink);

module.exports.uploadProfil = (req, res) => {
  try {
    if (!ObjectID.isValid(req.body.userId)) throw Error("Unknown ID");

    if (
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpeg"
    ) {
    }
    console.log(req.file);
    if (typeof req.file.filename === undefined) {
      throw Error("invalid file");
    }

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    console.log(err);
    const erros = uploadErrors(err);
    return res.status(201).json({ erros });
  }

  // console.log(req.body.userId)
  console.log("abc");
  if (req.file.filename) {
    UserModel.findById(req.body.userId, (err, res) => {
      const oldImage = res.picture;
      if (oldImage !== "./uploads/profil/random-user.png") {
        console.log(oldImage);
        console.log(
          __dirname + "/../client/public/uploads/profil/" + req.file.filename
        );
        unlinkProm(oldImage);
      }
    });

    UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          picture:
            __dirname + "/../client/public/uploads/profil/" + req.file.filename,
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(500).send(err);
      }
    );
  } else {
    return res.send("err");
  }
};
