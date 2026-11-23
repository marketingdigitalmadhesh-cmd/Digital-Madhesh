import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { ServiceCategory } from '../types';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs, buildBreadcrumbJsonLd } from '../components/Breadcrumbs';
import { ArchGeometry } from '../components/BrandMotif';

const CATEGORIES: ('All' | ServiceCategory)[] = [
  'All',
  'Digital Marketing',
  'Creative Services',
  'Website and Tracking',
  'Printing and Advertising',
];

const CATEGORY_SUMMARY: Record<ServiceCategory, string> = {
  'Digital Marketing':
    'Paid Meta & Google campaigns, lead generation funnels, and strategy tailored to Madhesh Province audiences.',
  'Creative Services':
    'Mobile-ready social creatives, highway hoarding designs, brand photography, video production, and copywriting.',
  'Website and Tracking':
    'Fast websites, dedicated landing pages, Meta Pixel, server-side Conversion API, and GA4 conversion attribution.',
  'Printing and Advertising':
    'Flex hoardings, banners, offset brochures, bill pads, framed certificates, wedding cards, and custom corporate gifts.',
};

export function ServicesPage() {
  const { services } = useSiteData();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') as 'All' | ServiceCategory | null;
  const [activeCategory, setActiveCategory] = useState<'All' | ServiceCategory>(
    initialCat && CATEGORIES.includes(initialCat) ? initialCat : 'All',
  );
  const [queryText, setQueryText] = useState('');

  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Services' }];

  const filteredServices = useMemo(() => {
    return services.filter((svc) => {
      const matchesCat = activeCategory === 'All' || svc.category === activeCategory;
      const q = queryText.trim().toLowerCase();
      const matchesQuery =
        !q ||
        svc.title.toLowerCase().includes(q) ||
        svc.shortDescription.toLowerCase().includes(q) ||
        svc.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [services, activeCategory, queryText]);

  const groupedCategories = useMemo(() => {
    const order: ServiceCategory[] = [
      'Digital Marketing',
      'Creative Services',
      'Website and Tracking',
      'Printing and Advertising',
    ];
    return order
      .map((cat) => ({
        category: cat,
        items: filteredServices.filter((s) => s.category === cat),
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredServices]);

  const handleCategoryChange = (cat: 'All' | ServiceCategory) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <>
      <SeoHead
        title="Digital Marketing, Web Tracking & Printing Services | Digital Madhesh"
        description="Explore all Digital Madhesh services: Facebook & Instagram Ads, Google Ads, Graphic Design, Video Production, Websites, Meta Pixel, CAPI, Flex, Offset & Custom Printing."
        canonicalPath="/services"
        jsonLd={buildBreadcrumbJsonLd(breadcrumbs)}
      />

      {/* Maroon Header Band */}
      <section className="relative bg-[#780033] text-white overflow-hidden">
        <ArchGeometry className="hidden lg:block absolute -right-12 -bottom-20 w-80 h-80 text-[#DDB34D]/20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
          <div className="[&_a]:text-white/75 [&_a:hover]:text-[#DDB34D] [&_span[aria-current]]:text-white">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wider text-[#DDB34D] mb-2">
              Complete Agency Directory
            </p>
            <h1 className="font-display text-[clamp(2.1rem,3.8vw,3.3rem)] font-extrabold tracking-tight leading-[1.1] mb-4">
              Digital marketing, web tracking, creative design, and commercial printing
            </h1>
            <p className="text-base text-white/85 leading-relaxed">
              Select a category or search below to inspect detailed deliverables, benefits, and FAQs
              for every service.
            </p>
          </div>
        </div>
      </section>

      {/* Sidebar + Directory Layout (Distinct from Homepage) */}
      <section className="py-12 lg:py-16 bg-[#FAF8F6] min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky Filter Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-5">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  placeholder="Filter services..."
                  aria-label="Search services"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 bg-white text-[#171717] focus:outline-none focus:border-[#780033]"
                />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-neutral-500 px-2 pb-1">Categories</p>
                {CATEGORIES.map((cat) => {
                  const active = activeCategory === cat;
                  const count =
                    cat === 'All'
                      ? services.length
                      : services.filter((s) => s.category === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                        active
                          ? 'bg-[#780033] text-white'
                          : 'text-[#171717] hover:bg-neutral-100'
                      }`}
                    >
                      <span className="truncate pr-2">{cat}</span>
                      <span
                        className={`font-mono tabular-nums ${
                          active ? 'text-[#DDB34D]' : 'text-neutral-400'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl bg-[#171717] text-white p-6 space-y-3">
              <p className="text-xs font-semibold text-[#DDB34D]">Need a Combined Package?</p>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Bundle Meta Ads, landing page tracking, and commercial printing under one timeline.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#DDB34D] text-[#171717] hover:bg-[#c99e3b] transition-colors"
              >
                Request Custom Package
              </Link>
            </div>
          </aside>

          {/* Right Grouped Service Cards */}
          <div className="lg:col-span-9 space-y-12">
            {groupedCategories.length === 0 ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center">
                <p className="text-base font-bold text-[#171717] mb-2">
                  No services matched “{queryText}”
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQueryText('');
                    handleCategoryChange('All');
                  }}
                  className="text-sm font-semibold text-[#780033] hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              groupedCategories.map((group) => (
                <div key={group.category} className="space-y-5">
                  <div className="rounded-2xl bg-white border border-neutral-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-[#171717]">
                        {group.category}
                      </h2>
                      <p className="text-sm text-neutral-600 mt-1">
                        {CATEGORY_SUMMARY[group.category]}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#780033] tabular-nums shrink-0">
                      {group.items.length} services
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {group.items.map((svc, idx) => (
                      <Link
                        key={svc.slug}
                        to={`/services/${svc.slug}`}
                        className="group rounded-2xl border border-neutral-200 bg-white p-6 flex flex-col justify-between hover:border-[#780033] hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <span className="font-mono text-xs text-neutral-400">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#780033] transition-colors" />
                          </div>
                          <h3 className="font-display text-lg font-bold text-[#171717] group-hover:text-[#780033] transition-colors mb-2">
                            {svc.title}
                          </h3>
                          <p className="text-sm text-neutral-600 leading-relaxed">
                            {svc.shortDescription}
                          </p>
                        </div>
                        <span className="mt-5 text-xs font-semibold text-[#780033]">
                          View Service Specification
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
