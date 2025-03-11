import Link from "next/link";
import { getAllPosts } from "@/libs/posts.ts";

export default function Page() {
  const posts = getAllPosts();
  return (
    <>
      <h1>Hi, this my blog!</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/${post.slug}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
