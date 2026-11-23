import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, MessageCircle } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs, buildBreadcrumbJsonLd } from '../components/Breadcrumbs';
import { MediaImage } from '../components/MediaImage';
import { ArchGeometry } from '../components/BrandMotif';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { services, settings } = useSiteData();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <SeoHead
          title="Service Not Found | Digital Madhesh"
          description="The requested service page could not be found."
          noIndex
        />
        <h1 className="font-display text-2xl font-bold text-[#171717] mb-3">
          Service not found
        </h1>
        <p className="text-sm text-neutral-600 mb-6">
          Please browse our complete directory of digital marketing and printing services.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[#780033] text-white"
        >
          View All Services
        </Link>
      </div>
    );
  }

  const relatedServices = services
    .filter(
      (s) =>
        s.slug !== service.slug &&
        (service.relatedSlugs?.includes(s.slug) || s.category === service.category),
    )
    .slice(0, 3);

  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: service.title },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.category,
    description: service.seoDescription || service.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Digital Madhesh',
      telephone: settings.phone,
      address: settings.address,
    },
    areaServed: 'Madhesh Province, Nepal',
  };

  const whatsappDigits = settings.whatsappNumber.replace(/[^0-9]/g, '') || '9779865529001';
  const whatsappHref = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
    `Hello Digital Madhesh, I would like to inquire about ${service.title}.`,
  )}`;

  return (
    <>
      <SeoHead
        title={service.seoTitle || `${service.title} | Digital Madhesh`}
        description={service.seoDescription || service.shortDescription}
        canonicalPath={`/services/${service.slug}`}
        ogImage={service.image}
        jsonLd={[serviceSchema, buildBreadcrumbJsonLd(breadcrumbs)]}
      />

      {/* Rich Maroon + Layered Image Hero */}
      <section className="relative bg-[#780033] text-white overflow-hidden">
        <ArchGeometry className="hidden lg:block absolute -left-20 -bottom-24 w-96 h-96 text-[#DDB34D]/20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-18 relative">
          <div className="[&_a]:text-white/75 [&_a:hover]:text-[#DDB34D] [&_span[aria-current]]:text-white">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold tracking-wider text-[#DDB34D]">
                {service.category} · Madhesh Province
              </p>
              <h1 className="font-display text-[clamp(2.1rem,3.8vw,3.3rem)] font-extrabold tracking-tight leading-[1.08]">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl">
                {service.heroDescription || service.shortDescription}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white text-[#780033] hover:bg-neutral-100 transition-colors"
                >
                  <span>Request {service.title} Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-[#580025] border border-white/25 text-white hover:border-[#DDB34D] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#DDB34D]" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="hidden sm:block absolute -bottom-3 -right-3 w-full h-full rounded-3xl bg-[#DDB34D]" />
              <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-neutral-900 shadow-elevated">
                <MediaImage
                  src={service.image}
                  alt={service.imageAlt || service.title}
                  className="w-full h-72 lg:h-80 object-cover"
                  fallbackTitle={service.title}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content + Sticky Deliverables Brief */}
      <section className="py-16 bg-[#FAF8F6] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-3xl bg-white border border-neutral-200 p-7 sm:p-9 shadow-sm space-y-4">
              <h2 className="font-display text-2xl font-bold text-[#171717]">
                How Digital Madhesh delivers {service.title}
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed">
                {service.overview || service.shortDescription}
              </p>
            </div>

            {service.benefits && service.benefits.length > 0 && (
              <div className="rounded-3xl bg-white border border-neutral-200 p-7 sm:p-9 shadow-sm">
                <h3 className="font-display text-xl font-bold text-[#171717] mb-5">
                  Key Benefits for Your Organization
                </h3>
                <ul className="space-y-3.5">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-neutral-700">
                      <span className="w-6 h-6 rounded-lg bg-[#FDF5F8] text-[#780033] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-3xl bg-[#171717] text-white p-7 sm:p-8 shadow-elevated space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#DDB34D] mb-1.5">Included Scope</p>
                <h3 className="font-display text-xl font-bold">Typical Deliverables</h3>
              </div>

              {service.deliverables && service.deliverables.length > 0 && (
                <ul className="space-y-3.5 border-t border-neutral-800 pt-5">
                  {service.deliverables.map((d, idx) => (
                    <li key={d} className="flex items-start gap-3 text-sm text-neutral-200">
                      <span className="font-mono text-xs text-[#DDB34D] font-bold mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="border-t border-neutral-800 pt-5 flex flex-col gap-2.5">
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-[#780033] text-white hover:bg-[#580025] transition-colors"
                >
                  <span>Start This Service</span>
                  <ArrowRight className="w-4 h-4 text-[#DDB34D]" />
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold border border-neutral-700 text-neutral-200 hover:border-[#DDB34D] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#DDB34D]" />
                  <span>Quick WhatsApp Estimate</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Service-Specific FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-16 bg-white border-b border-neutral-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#171717] mb-8">
              Questions about {service.title}
            </h2>
            <div className="space-y-3">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={faq.question}
                    className={`rounded-2xl border transition-colors ${
                      isOpen ? 'border-[#780033]/40 bg-[#FAF8F6]' : 'border-neutral-200 bg-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <span className="font-display text-base font-bold text-[#171717]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#780033]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm text-neutral-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-[#FAF8F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-bold text-[#171717]">Related Services</h2>
              <Link to="/services" className="text-sm font-semibold text-[#780033] hover:underline">
                All Services
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/services/${rel.slug}`}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 hover:border-[#780033] hover:shadow-card transition-all flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs text-neutral-500 mb-1.5">{rel.category}</p>
                    <h3 className="font-display text-base font-bold text-[#171717] mb-2">
                      {rel.title}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-2">{rel.shortDescription}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#780033]">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
