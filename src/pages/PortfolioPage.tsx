import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { ArrowRight, ArrowUpRight, FolderOpen } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { PortfolioProject } from '../types';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs, buildBreadcrumbJsonLd } from '../components/Breadcrumbs';
import { MediaImage } from '../components/MediaImage';
import { ArchGeometry } from '../components/BrandMotif';

const FILTER_CATEGORIES = [
  'All',
  'Digital Marketing',
  'Creative Design',
  'Website & Tracking',
  'Printing & Advertising',
];

export function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const q = query(collection(db, 'projects'), where('status', '==', 'published'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({
          ...(d.data() as Omit<PortfolioProject, 'id'>),
          id: d.id,
        }));
        setProjects(list);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        handleFirestoreError(error, OperationType.LIST, 'projects');
      },
    );
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Portfolio' }];

  return (
    <>
      <SeoHead
        title="Portfolio & Case Studies | Digital Madhesh"
        description="Explore digital marketing campaigns, websites, conversion tracking implementations, and commercial printing projects by Digital Madhesh across Madhesh Province."
        canonicalPath="/portfolio"
        jsonLd={buildBreadcrumbJsonLd(breadcrumbs)}
      />

      {/* Dark Showcase Hero */}
      <section className="relative bg-[#141414] text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-light opacity-40 pointer-events-none" />
        <ArchGeometry className="hidden lg:block absolute right-10 -bottom-24 w-96 h-96 text-[#780033]/50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-18 relative">
          <div className="[&_a]:text-neutral-400 [&_a:hover]:text-[#DDB34D] [&_span[aria-current]]:text-white">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wider text-[#DDB34D] mb-2">
              Selected Work &amp; Case Studies
            </p>
            <h1 className="font-display text-[clamp(2.1rem,3.8vw,3.3rem)] font-extrabold tracking-tight leading-[1.1] mb-4">
              Digital campaigns, websites, and commercial print showcases
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              Every published project documents the actual scope, execution, and verified outcomes
              without fabricated metrics.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#780033] text-white border-[#780033]'
                    : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-[#DDB34D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-[#FAF8F6] min-h-[440px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-3xl border border-neutral-200 bg-white h-80 animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-neutral-200 bg-white p-10 sm:p-14 text-center max-w-2xl mx-auto shadow-card">
              <div className="w-14 h-14 rounded-2xl bg-[#FDF5F8] text-[#780033] flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#171717] mb-2">
                {activeCategory === 'All'
                  ? 'No published portfolio projects yet'
                  : `No published projects in ${activeCategory}`}
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Our team publishes approved case studies and printing showcases directly from the
                agency CMS. Contact us if you would like to inspect relevant samples for your
                business sector.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[#780033] text-white hover:bg-[#580025] transition-colors"
              >
                <span>Request Industry Samples</span>
                <ArrowRight className="w-4 h-4 text-[#DDB34D]" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-7">
              {filtered.map((project, idx) => {
                const isLead = idx === 0 && filtered.length >= 3;
                return (
                  <Link
                    key={project.id}
                    to={`/portfolio/${project.slug}`}
                    className={`group rounded-3xl border border-neutral-200 bg-white overflow-hidden flex flex-col shadow-card hover:border-[#780033] transition-all duration-200 hover:-translate-y-0.5 ${
                      isLead ? 'lg:col-span-8' : 'lg:col-span-4'
                    }`}
                  >
                    <div
                      className={`bg-neutral-100 overflow-hidden relative ${
                        isLead ? 'aspect-[16/9]' : 'aspect-[4/3]'
                      }`}
                    >
                      <MediaImage
                        src={project.coverImage}
                        alt={project.coverImageAlt || project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        fallbackTitle={project.title}
                      />
                    </div>
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mb-2">
                          <span className="font-semibold text-[#780033]">{project.category}</span>
                          {project.clientName && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{project.clientName}</span>
                            </>
                          )}
                          {project.location && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{project.location}</span>
                            </>
                          )}
                        </div>
                        <h2 className="font-display text-xl font-bold text-[#171717] group-hover:text-[#780033] transition-colors mb-2">
                          {project.title}
                        </h2>
                        <p className="text-sm text-neutral-600 line-clamp-3">{project.summary}</p>
                      </div>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#780033]">
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
