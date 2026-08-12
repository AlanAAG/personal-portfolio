import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { posts } from '@/content/blog/posts';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl">Post Not Found</h1>
        <Link href="/blog" className="mt-8 text-white/50 hover:text-white underline">Back to Blog</Link>
      </main>
    );
  }

  const html = fs.readFileSync(
    path.join(process.cwd(), 'src', 'content', 'blog', `${post.slug}.html`),
    'utf-8'
  );

  return (
    <main className="min-h-screen bg-black text-white font-sans pb-32">
      <article className="w-full max-w-2xl mx-auto px-6 py-12 md:py-32">
        <Link href="/blog" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12 md:mb-20 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-widest">Back to Blog</span>
        </Link>

        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">{post.date}</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">{post.title}</h1>
        <a
          href={post.mediumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-16"
        >
          Also published on Medium ↗
        </a>

        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-wrap gap-6 font-mono text-xs uppercase tracking-widest">
          <Link href="/blog" className="text-white/50 hover:text-white transition-colors">← All posts</Link>
          <a href={post.mediumUrl} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">Read on Medium ↗</a>
        </div>
      </article>

      <style>{`
        .blog-prose { color: rgba(255,255,255,0.8); font-size: 1.075rem; line-height: 1.8; }
        .blog-prose p { margin-bottom: 1.5rem; }
        .blog-prose h3 { color: #fff; font-weight: 700; font-size: 1.5rem; letter-spacing: -0.02em; margin: 3rem 0 1.25rem; line-height: 1.3; }
        .blog-prose h4 { color: #fff; font-weight: 600; font-size: 1.15rem; margin: 2.5rem 0 1rem; }
        .blog-prose strong { color: #fff; font-weight: 600; }
        .blog-prose a { color: #fff; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: rgba(255,255,255,0.3); }
        .blog-prose a:hover { text-decoration-color: #fff; }
        .blog-prose ul, .blog-prose ol { margin: 0 0 1.5rem 1.5rem; }
        .blog-prose ul { list-style: disc; }
        .blog-prose ol { list-style: decimal; }
        .blog-prose li { margin-bottom: 0.5rem; }
        .blog-prose figure { margin: 2.5rem 0; }
        .blog-prose img { width: 100%; height: auto; border-radius: 1rem; border: 1px solid rgba(255,255,255,0.1); }
        .blog-prose figcaption { font-family: var(--font-mono, monospace); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); text-align: center; margin-top: 0.75rem; }
        .blog-prose pre { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.75rem; padding: 1.25rem; overflow-x: auto; font-size: 0.85rem; line-height: 1.6; margin: 0 0 1.5rem; }
        .blog-prose hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 3rem 0; }
        .blog-prose blockquote { border-left: 2px solid rgba(255,255,255,0.3); padding-left: 1.25rem; font-style: italic; color: rgba(255,255,255,0.6); margin: 0 0 1.5rem; }
        .blog-prose iframe { width: 100%; border-radius: 0.75rem; margin: 0 0 1.5rem; }
      `}</style>
    </main>
  );
}
