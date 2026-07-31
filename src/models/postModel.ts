import fs from "node:fs";
import path from "node:path";

export interface Post {
  title: string;
  image: string;
  author: string;
  createdAt: number;
  teaser: string;
  content: string;
}

const postsFilePath = path.join(__dirname, "..", "..", "data", "posts.json");

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAllPosts(): Post[] {
  const raw = fs.readFileSync(postsFilePath, "utf8");
  // reading data NOW, that's why no import from data/posts.json, because then we would have to start the server every time again when data changes or grows
  return JSON.parse(raw) as Post[];
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => slugify(post.title) === slug);
}

export function writePosts(posts: Post[]): void {
  // posts = what I want to parse, null = no filter, 2 = Pretty-print, indentation with 2 spaces, human readable
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), "utf8");
}

export function addPost(post: Post): void {
  const posts = getAllPosts();
  posts.push(post);
  writePosts(posts);
}

export function updatePost(slug: string, changes: Partial<Post>): void {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => slugify(post.title) === slug);
  // if Post not found, cancel
  if (index === -1) return;
  // change the post at this position, keep all old fields, change new fields
  posts[index] = { ...posts[index], ...changes };
  writePosts(posts);
}

export function deletePost(slug: string): void {
  const posts = getAllPosts();
  const filtered = posts.filter((post) => slugify(post.title) !== slug);
  writePosts(filtered);
}
