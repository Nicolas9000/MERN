const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// POUR PATCH follow/:id  body : { idToFollow: "iaueajze" }  req.body.idToFollow
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../client/public/uploads/profil");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'
  ) {
    console.log("oui")
    cb(null, true);
  } else {
    console.log("non")
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
