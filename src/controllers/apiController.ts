import { type Request, type Response } from "express";

import { getAllPosts } from "../models/postModel.js";

export function getRandomPost(_req: Request, res: Response) {
  const posts = getAllPosts();
  const randomIndex = Math.floor(Math.random() * posts.length);
  const randomPost = posts[randomIndex];
  res.json(randomPost);
}

export function getLatestPosts(_req: Request, res: Response) {
  const posts = getAllPosts();
  const sortedPosts = posts.sort((a, b) => b.createdAt - a.createdAt);
  const latestPosts = sortedPosts.slice(0, 3);
  res.json(latestPosts);
}

export function getStats(_req: Request, res: Response) {
  const posts = getAllPosts();
  const totalPosts = posts.length;
  const sortedPosts = posts.sort((a, b) => b.createdAt - a.createdAt);
  const newestPost = sortedPosts[0];
  res.json({ totalPosts, newestPostDate: newestPost.createdAt });
}
