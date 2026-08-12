import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { posts } from '@/content/blog/posts';

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans pb-32">
      <div className="w-full max-w-3xl mx-auto px-6 py-12 md:py-32">
        <Link href="/" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12 md:mb-20 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-widest">Back to Portfolio</span>
        </Link>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Blog</h1>
        <p className="text-xl font-serif italic text-white/50 mb-16 md:mb-24">
          Essays and ideas.
        </p>

        <div className="flex flex-col">
          {posts.map((post) => (
            <div key={post.slug} className="py-10 border-t border-white/10 last:border-b">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">{post.date}</p>
              <Link href={`/blog/${post.slug}`} className="group block mb-3">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-snug group-hover:text-white/70 transition-colors">
                    {post.title}
                  </h2>
                  <ArrowUpRight className="w-5 h-5 shrink-0 mt-1 text-white/40 transition-transform duration-300 group-hover:rotate-45 group-hover:text-white" />
                </div>
              </Link>
              <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-2xl mb-4">{post.intro}</p>
              <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest">
                <Link href={`/blog/${post.slug}`} className="text-white/70 hover:text-white underline underline-offset-4 transition-colors">
                  Read here
                </Link>
                <a href={post.mediumUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                  Read on Medium ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://medium.com/@alanayalag"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-16 px-5 py-2 border border-white/20 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
        >
          Follow on Medium ↗
        </a>
      </div>
    </main>
  );
}
