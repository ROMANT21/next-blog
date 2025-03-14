import { getPostBySlug, getSortedPostsData } from '@/libs/posts.ts';

// Return a 404 if the user visits a site not pre-generated
export const dynamicParams = false

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
      <main className="max-w-3xl mx-auto w-full">
        <header className="border-b-2 border-emerald-700 pb-4">
          <h1>{post.title}</h1>
          <p>Last Updated: { post.date }</p>
          <p>
            <a href="https://github.com/ROMANT21/commit-suggestions"
             className="text-emerald-700 hover:text-emerald-900 underline">
                Link to codebase
             </a>
          </p>
        </header>
        <div
          className="prose prose-stone pt-4"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        ></div>
      </main>
    </div>
  );
}
