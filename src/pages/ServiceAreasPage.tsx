import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Truck } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs, buildBreadcrumbJsonLd } from '../components/Breadcrumbs';
import { ArchGeometry } from '../components/BrandMotif';

export function ServiceAreasPage() {
  const { settings } = useSiteData();
  const [activeDistrict, setActiveDistrict] = useState('Sarlahi');
  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Service Areas' }];

  const areas = settings.serviceAreas || [];
  const selected = areas.find((a) => a.district === activeDistrict) || areas[0];

  return (
    <>
      <SeoHead
        title="Madhesh Province Service Areas (All 8 Districts) | Digital Madhesh"
        description="Digital Madhesh provides digital marketing, website development, and commercial printing across Saptari, Siraha, Dhanusha, Mahottari, Sarlahi, Rautahat, Bara, and Parsa."
        canonicalPath="/service-areas"
        jsonLd={buildBreadcrumbJsonLd(breadcrumbs)}
      />

      {/* Charcoal Header + Interactive Corridor Explorer */}
      <section className="relative bg-[#141414] text-white overflow-hidden">
        <ArchGeometry className="hidden lg:block absolute -right-12 -bottom-24 w-96 h-96 text-[#DDB34D]/15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-18 relative">
          <div className="[&_a]:text-neutral-400 [&_a:hover]:text-[#DDB34D] [&_span[aria-current]]:text-white">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-semibold tracking-wider text-[#DDB34D] mb-2">
              Regional Service Footprint
            </p>
            <h1 className="font-display text-[clamp(2.1rem,3.8vw,3.3rem)] font-extrabold tracking-tight leading-[1.1] mb-4">
              Serving all eight districts across Madhesh Province
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              Headquartered in Harion, Sarlahi along the East-West Highway corridor, we deliver
              localized digital campaigns and commercial print consignments across every district.
            </p>
          </div>

          {/* Interactive Corridor Strip */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8">
            <p className="text-xs font-semibold text-[#DDB34D] mb-4">
              Select a District Along the Madhesh Corridor
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {areas.map((a) => {
                const isActive = a.district === selected?.district;
                return (
                  <button
                    key={a.district}
                    type="button"
                    onClick={() => setActiveDistrict(a.district)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#780033] text-white shadow-card'
                        : 'bg-neutral-800 text-neutral-300 hover:text-white'
                    }`}
                  >
                    {a.district}
                    {a.district === 'Sarlahi' ? ' (HQ)' : ''}
                  </button>
                );
              })}
            </div>

            {selected && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-t border-neutral-800 pt-6">
                <div className="lg:col-span-8 space-y-2">
                  <h2 className="font-display text-2xl font-bold text-white">
                    {selected.district} District Coverage
                  </h2>
                  <p className="text-xs font-semibold text-[#DDB34D]">
                    Key Commercial Hubs: {selected.hubs}
                  </p>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {selected.description}
                  </p>
                </div>
                <div className="lg:col-span-4 flex lg:justify-end">
                  <Link
                    to={`/contact?service=${encodeURIComponent(`Inquiry from ${selected.district}`)}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[#DDB34D] text-[#171717] hover:bg-[#c99e3b] transition-colors"
                  >
                    <span>Inquire from {selected.district}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Regional Coordination Steps */}
      <section className="py-12 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-neutral-200 bg-[#FAF8F6] p-6">
            <p className="font-mono text-xs font-bold text-[#780033] mb-2">
              01 · Remote &amp; On-Site Digital
            </p>
            <h2 className="font-display text-lg font-bold text-[#171717] mb-2">
              District-Targeted Ad Campaigns
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Meta Ads and Google Search campaigns calibrated to exact city radii, highway towns,
              and local language preferences across every district.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-[#FAF8F6] p-6">
            <p className="font-mono text-xs font-bold text-[#780033] mb-2">02 · Print Dispatch</p>
            <h2 className="font-display text-lg font-bold text-[#171717] mb-2">
              Highway &amp; Courier Delivery
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Printed flex banners, offset booklets, bill pads, and framed certificates are packed
              in Harion and dispatched reliably across East-West and feeder routes.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-[#FAF8F6] p-6">
            <p className="font-mono text-xs font-bold text-[#780033] mb-2">03 · Local Support</p>
            <h2 className="font-display text-lg font-bold text-[#171717] mb-2">
              Direct WhatsApp &amp; Phone Desk
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Communicate directly with our strategists and print coordinators in Nepali, Maithili,
              Bhojpuri, or English.
            </p>
          </div>
        </div>
      </section>

      {/* All 8 Districts Grid */}
      <section className="py-16 bg-[#FAF8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#171717]">
              District-by-district overview
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areas.map((area) => (
              <div
                key={area.district}
                className="rounded-2xl border border-neutral-200 p-7 bg-white shadow-sm flex flex-col justify-between hover:border-[#780033]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-9 h-9 rounded-xl bg-[#FDF5F8] text-[#780033] flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <h3 className="font-display text-xl font-bold text-[#171717]">
                        {area.district} District
                      </h3>
                    </div>
                    <span className="text-xs font-medium text-neutral-500">Madhesh Province</span>
                  </div>
                  <p className="text-xs font-semibold text-[#780033] mb-3">
                    Hubs: {area.hubs}
                  </p>
                  <p className="text-sm text-neutral-700 leading-relaxed mb-5">
                    {area.description}
                  </p>
                </div>
                <div className="border-t border-neutral-100 pt-4 flex items-center justify-between gap-4">
                  <span className="text-xs text-neutral-500 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#780033] shrink-0" />
                    {area.focusServices}
                  </span>
                  <Link
                    to={`/contact?service=${encodeURIComponent(`Inquiry from ${area.district}`)}`}
                    className="text-xs font-semibold text-[#780033] hover:underline whitespace-nowrap shrink-0"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
