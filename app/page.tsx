import Link from 'next/link';
import { getAllPosts } from '@/libs/posts.ts';

export default function Page() {
  const posts = getAllPosts();
  return (
    <div className="flex min-h-screen justify-center bg-stone-100 p-6 text-gray-900">
      <main>
        <header className="text-center">
          <h1>Welcome to my blog!</h1>
          <p>
            My name is Tyler Roman, and this is where I write about my projects,
            ideas, and current fixations.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="border-b-2 border-emerald-700">Latest Posts</h2>
          <ul>
            {posts.map((post) => (
              <li
                key={post.slug}
                className="rounded-md p-2 transition duration-300 hover:bg-stone-200"
              >
                <Link href={`/${post.slug}`}>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
