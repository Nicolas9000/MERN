const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");

router.get("/", postController.readPost);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../client/public/uploads/posts");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    console.log("oui");
    cb(null, true);
  } else {
    console.log("non");
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
router.post("/", upload.single("file"), postController.createPost);

router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
