import { type Request, type Response } from "express";
import {
  getAllPosts,
  getPostBySlug,
  addPost,
  updatePost,
  deletePost,
} from "../models/postModel.js";

export function listAdminPosts(_req: Request, res: Response) {
  const posts = getAllPosts();
  res.render("admin", { posts });
}

export function showNewPostForm(_req: Request, res: Response) {
  res.render("adminNew");
}

export function createPost(req: Request, res: Response) {
  const newPost = {
    title: req.body.title,
    image: req.body.image,
    author: req.body.author,
    createdAt: req.body.createdAt,
    teaser: req.body.teaser,
    content: req.body.content,
  };
  addPost(newPost);
  res.redirect("/admin");
}

export function showEditPostForm(
  req: Request<{ slug: string }>,
  res: Response,
) {
  const slug = Array.isArray(req.params.slug)
    ? req.params.slug[0]
    : req.params.slug;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    res.status(400).send("Invalid slug");
    return;
  }
  const newPost = getPostBySlug(slug);
  if (!newPost) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("adminEdit", {
    post: newPost,
  });
}

export function handleUpdatePost(
  req: Request<{ slug: string }>,
  res: Response,
) {
  // slug aus URL holen
  const slug = req.params.slug;
  // changes aus req.body bauen
  const changes = {
    title: req.body.title,
    image: req.body.image,
    author: req.body.author,
    createdAt: req.body.createdAt,
    teaser: req.body.teaser,
    content: req.body.content,
  };
  // updatePost() aufrufen
  updatePost(slug, changes);
  // redirect
  res.redirect("/admin");
}

export function handleDeletePost(
  req: Request<{ slug: string }>,
  res: Response,
) {
  const slug = req.params.slug;
  deletePost(slug);
  res.redirect("/admin");
}
