import { getPostBySlug, getAllPosts } from '@/libs/posts.ts';

// Generate dynamic paths at buildtime
export async function generateStaticParams() {
  const posts = getAllPosts();
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
      <main>
        <header className="border-b-2 border-emerald-700 pb-2">
          <h1>{post.title}</h1>
        </header>
        <div
          className="pt-2"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        ></div>
      </main>
    </div>
  );
}
