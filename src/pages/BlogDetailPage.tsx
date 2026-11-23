import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { ArrowRight } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { BlogPost } from '../types';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs, buildBreadcrumbJsonLd } from '../components/Breadcrumbs';
import { MediaImage } from '../components/MediaImage';

function ArticleBody({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="space-y-5 text-base text-neutral-800 leading-relaxed">
      {blocks.map((block, idx) => {
        if (block.startsWith('### ')) {
          return (
            <h3 key={idx} className="font-display text-xl font-bold text-[#171717] pt-3">
              {block.slice(4)}
            </h3>
          );
        }
        if (block.startsWith('## ')) {
          return (
            <h2 key={idx} className="font-display text-2xl font-bold text-[#171717] pt-4">
              {block.slice(3)}
            </h2>
          );
        }
        if (block.startsWith('- ')) {
          const items = block
            .split('\n')
            .map((line) => line.replace(/^-\s+/, '').trim())
            .filter(Boolean);
          return (
            <ul key={idx} className="list-disc pl-6 space-y-2 text-neutral-700">
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={idx} className="whitespace-pre-line">
            {block}
          </p>
        );
      })}
    </div>
  );
}

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!slug) {
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, 'blogs'),
          where('status', '==', 'published'),
          where('slug', '==', slug),
          limit(1),
        );
        const snap = await getDocs(q);
        if (active) {
          if (!snap.empty) {
            const d = snap.docs[0];
            setPost({ ...(d.data() as Omit<BlogPost, 'id'>), id: d.id });
          } else {
            setPost(null);
          }
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setLoading(false);
          handleFirestoreError(err, OperationType.GET, `blogs/${slug}`);
        }
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="h-8 w-40 bg-neutral-100 animate-pulse mb-6 rounded-xl" />
        <div className="h-64 bg-neutral-100 animate-pulse rounded-3xl" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <SeoHead
          title="Article Not Found | Digital Madhesh"
          description="The requested blog article could not be found."
          noIndex
        />
        <h1 className="font-display text-2xl font-bold text-[#171717] mb-3">Article not found</h1>
        <p className="text-sm text-neutral-600 mb-6">
          This article may have been moved or is not currently published.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[#780033] text-white"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Blog', to: '/blog' },
    { label: post.title },
  ];

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || '',
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Digital Madhesh',
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/assets/aistudio/Logo_PNG_social_poster_use_95e15f02.png`,
      },
    },
    datePublished: post.publishedAt || undefined,
    image:
      post.featuredImage || `${origin}/assets/aistudio/Logo_PNG_social_poster_use_95e15f02.png`,
  };

  return (
    <>
      <SeoHead
        title={post.seoTitle || `${post.title} | Digital Madhesh Blog`}
        description={post.seoDescription || post.excerpt || post.title}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.featuredImage}
        jsonLd={[articleSchema, buildBreadcrumbJsonLd(breadcrumbs)]}
      />

      <article className="bg-white py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mb-3">
            <span className="font-semibold text-[#780033]">{post.category}</span>
            {post.publishedAt && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{post.publishedAt}</span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>By {post.author}</span>
          </div>

          <h1 className="font-display text-[clamp(1.95rem,3.6vw,2.95rem)] font-extrabold text-[#171717] tracking-tight leading-[1.12] mb-6">
            {post.title}
          </h1>

          {post.featuredImage && (
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 overflow-hidden shadow-card mb-8">
              <MediaImage
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                className="w-full max-h-[440px] object-cover"
                fallbackTitle={post.title}
              />
            </div>
          )}

          <ArticleBody content={post.content} />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
              <span className="font-semibold text-[#171717]">Topics:</span>
              {post.tags.map((tag, idx) => (
                <span key={`${tag}-${idx}`}>
                  {idx > 0 && <span className="mr-2">·</span>}
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-12 rounded-3xl bg-[#171717] text-white p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <h2 className="font-display text-lg font-bold mb-1">
                Need help applying this for your business?
              </h2>
              <p className="text-sm text-neutral-300">
                Talk directly with Digital Madhesh in Harion, Sarlahi.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[#780033] text-white hover:bg-[#580025] transition-colors shrink-0"
            >
              <span>Get a Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#DDB34D]" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
