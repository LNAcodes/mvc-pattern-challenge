import { type Request, type Response } from "express";
import {
  getAllPosts,
  getPostBySlug,
  addPost,
  updatePost,
  deletePost,
  slugify,
} from "../models/postModel.js";
import sanitizeHtml from "sanitize-html";

export async function listAdminPosts(_req: Request, res: Response) {
  const posts = await getAllPosts();
  const postsWithSlug = posts.map((post) => ({
    ...post,
    slug: slugify(post.title),
  }));
  res.render("admin", { posts: postsWithSlug });
}

export function showNewPostForm(_req: Request, res: Response) {
  res.render("adminNew");
}

export async function createPost(req: Request, res: Response) {
  // console.log("req.body:", req.body);
  try {
    const newPost = {
      title: req.body.title,
      image: req.body.image,
      author: req.body.author,
      createdAt: Date.now(),
      teaser: req.body.teaser,
      content: sanitizeHtml(req.body.content, {
        allowedTags: ["p", "h1", "h2", "h3", "a", "ul", "ol", "li", "img"],
        allowedAttributes: {
          a: ["href"],
          img: ["src", "alt"],
        },
      }),
    };
    await addPost(newPost);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
}

export async function showEditPostForm(
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
  const newPost = await getPostBySlug(slug);
  if (!newPost) {
    res.status(404).send("Post not found");
    return;
  }
  res.render("adminEdit", {
    post: newPost,
  });
}

export async function handleUpdatePost(
  req: Request<{ slug: string }>,
  res: Response,
) {
  try {
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
    await updatePost(slug, changes);
    // redirect
    res.redirect("/admin");
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
}

export async function handleDeletePost(
  req: Request<{ slug: string }>,
  res: Response,
) {
  try {
    const slug = req.params.slug;
    // console.log("Deleting post with slug:", slug);
    await deletePost(slug);
    res.redirect("/admin");
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
}
