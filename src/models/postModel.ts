import { getDB } from "../db/database.js";

export interface Post {
  id?: number;
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

export async function addPost(post: Omit<Post, "id">): Promise<number> {
  // Omit<Post, "id"> explicitly excludes id — SQLite auto-generates it via AUTOINCREMENT
  const db = getDB();
  const result = await db.run(
    `INSERT INTO posts ( title,
  image,
  author,
  createdAt,
  teaser,
  content) VALUES (@title, @image, @author, @createdAt, @teaser, @content)`,
    {
      "@title": post.title,
      "@image": post.image,
      "@author": post.author,
      "@createdAt": post.createdAt,
      "@teaser": post.teaser,
      "@content": post.content,
    },
  );
  return result.lastID!;
}

export async function updatePost(
  slug: string,
  changes: Partial<Post>,
): Promise<void> {
  const db = getDB();
  const post = await getPostBySlug(slug);
  // console.log("found post:", post);
  if (!post) return;
  // console.log("updating with id:", post.id);
  // console.log("changes:", changes);
  await db.run(
    `UPDATE posts SET title = @title, image = @image, author = @author, teaser = @teaser, content = @content
    WHERE id = @id`,
    {
      "@title": changes.title,
      "@image": changes.image,
      "@author": changes.author,
      "@teaser": changes.teaser,
      "@content": changes.content,
      "@id": post.id,
    },
  );
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
  const db = getDB();
  const post = await getPostBySlug(slug);
  if (!post) return;

  await db.run(`DELETE FROM posts WHERE id = @id`, { "@id": post.id });
  // TO DO:
  // const posts = getAllPosts();
  // const filtered = posts.filter((post) => slugify(post.title) !== slug);
  // writePosts(filtered);
}

export async function updatePostById(
  id: number,
  changes: Partial<Post>,
): Promise<void> {
  const db = getDB();
  await db.run(
    `UPDATE posts SET title = @title, image = @image, author = @author, teaser = @teaser, content = @content
    WHERE id = @id`,
    {
      "@title": changes.title,
      "@image": changes.image,
      "@author": changes.author,
      "@teaser": changes.teaser,
      "@content": changes.content,
      "@id": id,
    },
  );
  // TO DO:
  // const posts = getAllPosts();
  // const index = posts.findIndex((post) => slugify(post.title) === slug);
  // // if Post not found, cancel
  // if (index === -1) return;
  // // change the post at this position, keep all old fields, change new fields
  // posts[index] = { ...posts[index], ...changes };
  // writePosts(posts);
}

export async function deletePostById(id: number): Promise<void> {
  const db = getDB();
  await db.run(`DELETE FROM posts WHERE id = @id`, { "@id": id });
  // TO DO:
  // const posts = getAllPosts();
  // const filtered = posts.filter((post) => slugify(post.title) !== slug);
  // writePosts(filtered);
}

export async function getAllPostsWithAuthors(): Promise<Post[]> {
  const db = getDB();
  return await db.all<Post[]>(
    `SELECT posts.*, authors.name AS author_name
    FROM posts
    JOIN authors ON posts.author_id = authors.id`,
  );
}
