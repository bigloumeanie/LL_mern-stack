import express from "express";

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
  dislikePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);
router.patch("/:id/dislikePost", dislikePost);

export default router;

// import express from "express";

// import { getPosts, createPost, updatePost } from "../controllers/posts.js";

// const router = express.Router();

// router.get('/', getPosts);
// router.post('/', createPost);
// router.patch('/:id', updatePost)

// export default router;
