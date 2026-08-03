import { getDB } from "../db/database.js";

export interface Post {
  title: string;
  image: string;
  author: string;
  createdAt: number;
  teaser: string;
  content: string;
}

// const postsFilePath = path.join(__dirname, "..", "..", "data", "posts.json");

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getAllPosts(): Promise<Post[]> {
  const db = getDB();
  return await db.all<Post[]>("SELECT * FROM posts");
  // const raw = fs.readFileSync(postsFilePath, "utf8");
  // // reading data NOW, that's why no import from data/posts.json, because then we would have to start the server every time again when data changes or grows
  // return JSON.parse(raw) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => slugify(post.title) === slug);
}

// export function writePosts(posts: Post[]): void {
//   // posts = what I want to parse, null = no filter, 2 = Pretty-print, indentation with 2 spaces, human readable
//   fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), "utf8");
// }

export async function addPost(post: Post): Promise<void> {
  // TO DO:
  // const posts = getAllPosts();
  // posts.push(post);
  // writePosts(posts);
}

export async function updatePost(
  slug: string,
  changes: Partial<Post>,
): Promise<void> {
  // TO DO:
  // const posts = getAllPosts();
  // const index = posts.findIndex((post) => slugify(post.title) === slug);
  // // if Post not found, cancel
  // if (index === -1) return;
  // // change the post at this position, keep all old fields, change new fields
  // posts[index] = { ...posts[index], ...changes };
  // writePosts(posts);
}

export async function deletePost(slug: string): Promise<void> {
  // TO DO:
  // const posts = getAllPosts();
  // const filtered = posts.filter((post) => slugify(post.title) !== slug);
  // writePosts(filtered);
}
