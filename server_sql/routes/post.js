const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPost,
  getPost,
  singlePost,
  removePost,
  updatePost,
} = require("../controller/postController");
const { requireLogin } = require("../controller/auth_Comp_Controller");

router.post("/createPost", requireLogin, createPost);
router.get("/posts", getAllPost);
router.delete("/removePost/:slug", requireLogin, removePost);
router.get("/getPost", requireLogin, getPost);
router.get("/post/:slug", singlePost);
router.put("/updatePost/:slug", requireLogin, updatePost);

module.exports = router;
