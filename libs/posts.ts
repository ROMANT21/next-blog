import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';

// Define types for post
export type PostData = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

export type Post = PostData & {
  contentHtml: string;
};

// Get the full path to the posts directory
const postsDirectory = path.join(process.cwd(), 'posts');

// Get all posts metadata
export function getSortedPostsData(): PostData[] {
  const filenames = fs.readdirSync(postsDirectory);

  const allPostsData = filenames.map((filename) => {
    // Read the meta data from each .md file
    const filepath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filepath, 'utf8');
    const { data } = matter(fileContents);

    // Return the filename (without .md) and metadata
    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
    };
  });

  // Sort the posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get post content
export async function getPostBySlug(slug: string): Promise<Post> {
  // Get the metadata and content from .md file
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Convert .md content to renderable HTML
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkToc)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeFormat)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

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
