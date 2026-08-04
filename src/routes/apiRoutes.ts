import { Router } from "express";
import {
  getRandomPost,
  getLatestPosts,
  getStats,
  updatePostById,
  deletePostById,
} from "../controllers/apiController.js";

const router = Router();

router.get("/posts/random", getRandomPost);
router.get("/posts/latest", getLatestPosts);
router.get("/stats", getStats);
// console.log("apiRoutes loaded");
router.put("/posts/:id", updatePostById);
router.delete("/posts/:id", deletePostById);

export default router;
