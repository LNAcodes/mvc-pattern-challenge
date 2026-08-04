import { type Request, type Response } from "express";

import {
  getAllPosts,
  updatePostById as updatePostByIdInDB,
  deletePostById as deletePostByIdInDB,
} from "../models/postModel.js";

// console.log("apiController loaded");

export async function getRandomPost(_req: Request, res: Response) {
  const posts = await getAllPosts();
  const randomIndex = Math.floor(Math.random() * posts.length);
  const randomPost = posts[randomIndex];
  res.json(randomPost);
}

export async function getLatestPosts(_req: Request, res: Response) {
  const posts = await getAllPosts();
  const sortedPosts = posts.sort((a, b) => b.createdAt - a.createdAt);
  const latestPosts = sortedPosts.slice(0, 3);
  res.json(latestPosts);
}

export async function getStats(_req: Request, res: Response) {
  const posts = await getAllPosts();
  const totalPosts = posts.length;
  const sortedPosts = posts.sort((a, b) => b.createdAt - a.createdAt);
  const newestPost = sortedPosts[0];
  res.json({ totalPosts, newestPostDate: newestPost.createdAt });
}

export async function updatePostById(
  req: Request<{ id: string }>,
  res: Response,
) {
  console.log("updatePostById controller hit!");
  console.log("id:", req.params.id);
  console.log("body:", req.body);
  try {
    const id = Number(req.params.id);
    const changes = {
      title: req.body.title,
      image: req.body.image,
      author: req.body.author,
      teaser: req.body.teaser,
      content: req.body.content,
    };
    console.log("calling updatePostByIdInDB with:", id, changes);
    await updatePostByIdInDB(id, changes);
    res.status(200).json({ message: "Post updated" });
  } catch (err) {
    console.log("error:", err);
    res.status(500).json({ error: "Failed to update post" });
  }
}

export async function deletePostById(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = Number(req.params.id);
    console.log("updatePostById called with id:", id);
    console.log("req.body:", req.body);
    await deletePostByIdInDB(id);
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
}
