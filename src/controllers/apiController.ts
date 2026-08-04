import { type Request, type Response } from "express";

import { getAllPosts } from "../models/postModel.js";

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
  try {
    const id = Number(req.params.id);
    const changes = {
      title: req.body.title,
      image: req.body.image,
      author: req.body.author,
      teaser: req.body.teaser,
      content: req.body.content,
    };
    await updatePost(id, changes);
    res.status(200).json({ message: "Post updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
}
