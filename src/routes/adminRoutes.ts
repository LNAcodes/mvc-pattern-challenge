import { Router } from "express";
import {
  listAdminPosts,
  showNewPostForm,
  createPost,
  showEditPostForm,
  handleUpdatePost,
  handleDeletePost,
} from "../controllers/adminController.js";

const router = Router();

router.get("/", listAdminPosts);
router.get("/posts/new", showNewPostForm);
router.get("/posts/:slug/edit", showEditPostForm);
router.post("/posts", createPost);
router.post("/posts/:slug", handleUpdatePost);
router.post("/posts/:slug/delete", handleDeletePost);

export default router;
