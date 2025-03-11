import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Define types for post
export type PostMetadata = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

export type Post = PostMetadata & {
  contentHtml: string;
};

// Get the full path to the posts directory
const postsDirectory = path.join(process.cwd(), "posts");

// Get all posts metadata
export function getAllPosts(): PostMetadata[] {
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
    // Read the meta data from each .md file
    const filepath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filepath, "utf8");
    const { data } = matter(fileContents);

    // Return the filename (without .md) and metadata
    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
    };
  });
}

getAllPosts();

// Get post content
export async function getPostBySlug(slug: string): Promise<Post> {
  // Get the metadata and content from .md file
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Convert .md content to renderable HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  // Return a Post back
  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    contentHtml,
  };
}
