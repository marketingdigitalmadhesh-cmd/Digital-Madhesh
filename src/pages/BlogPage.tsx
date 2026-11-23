import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { ArrowRight, ArrowUpRight, BookOpen, Search } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { BlogPost } from '../types';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs, buildBreadcrumbJsonLd } from '../components/Breadcrumbs';
import { MediaImage } from '../components/MediaImage';

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const q = query(collection(db, 'blogs'), where('status', '==', 'published'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs
          .map((d) => ({ ...(d.data() as Omit<BlogPost, 'id'>), id: d.id }))
          .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
        setPosts(list);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        handleFirestoreError(error, OperationType.LIST, 'blogs');
      },
    );
    return () => unsub();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
    return ['All', ...unique];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const catOk = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const qOk =
        !q ||
        post.title.toLowerCase().includes(q) ||
        (post.excerpt || '').toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [posts, selectedCategory, searchQuery]);

  const [leadPost, ...restPosts] = filteredPosts;
  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Blog' }];

  return (
    <>
      <SeoHead
        title="Blog & Marketing Guides | Digital Madhesh"
        description="Practical guides on Meta Ads, Google Ads, conversion tracking, website growth, and commercial printing for businesses across Madhesh Province, Nepal."
        canonicalPath="/blog"
        jsonLd={buildBreadcrumbJsonLd(breadcrumbs)}
      />

      <section className="border-b border-neutral-200 bg-[#FAF8F6] bg-dot-grid py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wider text-[#780033] mb-2">
              Editorial &amp; Field Guides
            </p>
            <h1 className="font-display text-[clamp(2.1rem,3.8vw,3.3rem)] font-extrabold text-[#171717] tracking-tight leading-[1.1] mb-4">
              Insights on digital advertising, tracking, and printing
            </h1>
            <p className="text-base text-neutral-600 leading-relaxed">
              Practical articles written for business owners, schools, and organizations in
              Madhesh Province.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#780033] text-white border-[#780033]'
                      : 'bg-white text-[#171717] border-neutral-200 hover:border-[#780033]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                aria-label="Search blog articles"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-neutral-300 bg-white focus:outline-none focus:border-[#780033]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white min-h-[420px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-3xl border border-neutral-200 bg-white h-80 animate-pulse"
                />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="rounded-3xl border border-neutral-200 bg-[#FAF8F6] p-10 sm:p-14 text-center max-w-2xl mx-auto shadow-card">
              <div className="w-14 h-14 rounded-2xl bg-white text-[#780033] border border-neutral-200 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#171717] mb-2">
                No published articles yet
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Articles published through the Digital Madhesh Blog CMS appear here automatically.
                Have a specific question about ads, websites, or printing? Reach out directly.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[#780033] text-white hover:bg-[#580025] transition-colors"
              >
                <span>Ask Our Team</span>
                <ArrowRight className="w-4 h-4 text-[#DDB34D]" />
              </Link>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Lead Post */}
              {leadPost && (
                <Link
                  to={`/blog/${leadPost.slug}`}
                  className="group rounded-3xl border border-neutral-200 bg-[#FAF8F6] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-card hover:border-[#780033] transition-colors"
                >
                  {leadPost.featuredImage && (
                    <div className="lg:col-span-6 bg-neutral-100 overflow-hidden">
                      <MediaImage
                        src={leadPost.featuredImage}
                        alt={leadPost.featuredImageAlt || leadPost.title}
                        className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        fallbackTitle={leadPost.title}
                      />
                    </div>
                  )}
                  <div
                    className={`p-8 sm:p-10 flex flex-col justify-between ${
                      leadPost.featuredImage ? 'lg:col-span-6' : 'lg:col-span-12'
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mb-3">
                        <span className="font-semibold text-[#780033]">{leadPost.category}</span>
                        {leadPost.publishedAt && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">{leadPost.publishedAt}</span>
                          </>
                        )}
                        <span aria-hidden="true">·</span>
                        <span>{leadPost.author}</span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#171717] group-hover:text-[#780033] transition-colors mb-3">
                        {leadPost.title}
                      </h2>
                      {leadPost.excerpt && (
                        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                          {leadPost.excerpt}
                        </p>
                      )}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#780033]">
                      <span>Read Featured Article</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              )}

              {/* Remaining Posts Grid */}
              {restPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {restPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden flex flex-col hover:border-[#780033] hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
                    >
                      {post.featuredImage && (
                        <div className="aspect-[16/10] bg-neutral-100 overflow-hidden">
                          <MediaImage
                            src={post.featuredImage}
                            alt={post.featuredImageAlt || post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            fallbackTitle={post.title}
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mb-2">
                            <span className="font-semibold text-[#780033]">{post.category}</span>
                            {post.publishedAt && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="font-mono tabular-nums">{post.publishedAt}</span>
                              </>
                            )}
                            <span aria-hidden="true">·</span>
                            <span>{post.author}</span>
                          </div>
                          <h3 className="font-display text-lg font-bold text-[#171717] group-hover:text-[#780033] transition-colors mb-2">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-sm text-neutral-600 line-clamp-3">{post.excerpt}</p>
                          )}
                        </div>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#780033]">
                          <span>Read Article</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
