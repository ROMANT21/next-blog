import { getPostBySlug, getSortedPostsData } from '@/libs/posts.ts';

// Return a 404 if the user visits a site not pre-generated
export const dynamicParams = false;

// Generate dynamic paths at buildtime
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return (
    <div className="flex min-h-screen flex-col bg-stone-100 p-6 text-gray-900">
      <main className="mx-auto w-full max-w-3xl">
        <header className="border-b-2 border-emerald-700 pb-4">
          <h1>{post.title}</h1>
          <p>Last Updated: {post.date}</p>
          <p>
            <a href="https://github.com/ROMANT21/commit-suggestions">
              Link to codebase
            </a>
          </p>
        </header>
        <div
          className="min-w-full space-y-4 pt-4 text-wrap"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        ></div>
      </main>
    </div>
  );
}
