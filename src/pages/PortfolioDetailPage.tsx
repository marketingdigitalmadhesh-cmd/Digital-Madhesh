import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { ArrowRight } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { PortfolioProject } from '../types';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs, buildBreadcrumbJsonLd } from '../components/Breadcrumbs';
import { MediaImage } from '../components/MediaImage';

export function PortfolioDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<PortfolioProject | null>(null);
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
          collection(db, 'projects'),
          where('status', '==', 'published'),
          where('slug', '==', slug),
          limit(1),
        );
        const snap = await getDocs(q);
        if (active) {
          if (!snap.empty) {
            const d = snap.docs[0];
            setProject({ ...(d.data() as Omit<PortfolioProject, 'id'>), id: d.id });
          } else {
            setProject(null);
          }
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setLoading(false);
          handleFirestoreError(err, OperationType.GET, `projects/${slug}`);
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
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="h-8 w-48 bg-neutral-100 animate-pulse mb-6 rounded-xl" />
        <div className="h-96 bg-neutral-100 animate-pulse rounded-3xl" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <SeoHead
          title="Project Not Found | Digital Madhesh"
          description="The requested portfolio project could not be found."
          noIndex
        />
        <h1 className="font-display text-2xl font-bold text-[#171717] mb-3">Project not found</h1>
        <p className="text-sm text-neutral-600 mb-6">
          This project may have been moved or is not currently published.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[#780033] text-white"
        >
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: project.title },
  ];

  const caseStudySections = [
    { title: 'Project Overview', content: project.overview },
    { title: 'Client or Business Background', content: project.clientBackground },
    { title: 'Challenge', content: project.challenge },
    { title: 'Objective', content: project.objective },
    { title: 'Strategy', content: project.strategy },
    { title: 'Work and Execution', content: project.execution },
    { title: 'Results', content: project.results },
    { title: 'Conclusion', content: project.conclusion },
  ].filter((sec) => Boolean(sec.content && sec.content.trim()));

  return (
    <>
      <SeoHead
        title={project.seoTitle || `${project.title} | Portfolio | Digital Madhesh`}
        description={project.seoDescription || project.summary}
        canonicalPath={`/portfolio/${project.slug}`}
        ogImage={project.coverImage}
        jsonLd={buildBreadcrumbJsonLd(breadcrumbs)}
      />

      <article className="bg-white">
        <section className="bg-[#FAF8F6] border-b border-neutral-200/80 py-12 lg:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mb-3">
              <span className="font-semibold text-[#780033]">{project.category}</span>
              {project.clientName && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Client: {project.clientName}</span>
                </>
              )}
              {project.location && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{project.location}</span>
                </>
              )}
            </div>
            <h1 className="font-display text-[clamp(2rem,3.6vw,3.15rem)] font-extrabold text-[#171717] tracking-tight leading-[1.1] mb-5">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-8 max-w-3xl">
              {project.summary}
            </p>

            {project.coverImage && (
              <div className="rounded-3xl border border-neutral-200 bg-white overflow-hidden shadow-elevated mb-8">
                <MediaImage
                  src={project.coverImage}
                  alt={project.coverImageAlt || project.title}
                  className="w-full max-h-[520px] object-cover"
                  fallbackTitle={project.title}
                />
              </div>
            )}

            <div className="rounded-2xl bg-white border border-neutral-200 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-sm">
              <div>
                <p className="text-xs text-neutral-500 mb-1">Project Type</p>
                <p className="text-sm font-bold text-[#171717] capitalize">{project.projectType}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-1">Client / Brand</p>
                <p className="text-sm font-bold text-[#171717]">
                  {project.clientName || 'Confidential / Institutional Client'}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-1">Services Provided</p>
                <p className="text-sm font-bold text-[#171717]">
                  {project.servicesProvided && project.servicesProvided.length > 0
                    ? project.servicesProvided.join(' · ')
                    : project.category}
                </p>
              </div>
            </div>
          </div>
        </section>

        {((project.metrics && project.metrics.length > 0) || project.printSpecs) && (
          <section className="border-b border-neutral-200 bg-white py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[#780033] mb-3">Verified Outcomes</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-neutral-200 bg-[#FAF8F6] p-5"
                      >
                        <p className="text-sm font-bold text-[#171717] tabular-nums">{metric}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.printSpecs && (
                <div className="rounded-2xl border border-neutral-200 bg-[#171717] text-white p-6">
                  <p className="text-xs font-semibold text-[#DDB34D] mb-2">
                    Printing &amp; Material Specifications
                  </p>
                  <p className="text-sm text-neutral-200 whitespace-pre-line leading-relaxed">
                    {project.printSpecs}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {caseStudySections.length > 0 && (
          <section className="py-14 border-b border-neutral-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {caseStudySections.map((sec, idx) => (
                <div
                  key={sec.title}
                  className="rounded-2xl border border-neutral-200/80 bg-[#FAF8F6] p-7 space-y-2.5"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold text-[#780033]">
                      0{idx + 1}
                    </span>
                    <h2 className="font-display text-xl font-bold text-[#171717]">{sec.title}</h2>
                  </div>
                  <p className="text-base text-neutral-700 leading-relaxed whitespace-pre-line">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.galleryImages && project.galleryImages.length > 0 && (
          <section className="py-14 bg-[#FAF8F6] border-b border-neutral-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-xl font-bold text-[#171717] mb-6">
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.galleryImages.map((imgUrl, idx) => (
                  <div
                    key={`${imgUrl}-${idx}`}
                    className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm"
                  >
                    <MediaImage
                      src={imgUrl}
                      alt={`${project.title} gallery view ${idx + 1}`}
                      className="w-full aspect-[4/3] object-cover"
                      fallbackTitle={`${project.title} Image ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#780033] text-white p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h2 className="font-display text-2xl font-bold mb-1">
                  Planning a similar project?
                </h2>
                <p className="text-sm text-white/85">
                  Discuss your campaign or printing requirements with our team in Harion, Sarlahi.
                </p>
              </div>
              <Link
                to={`/contact?service=${encodeURIComponent(project.category)}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white text-[#780033] hover:bg-neutral-100 transition-colors shrink-0"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
