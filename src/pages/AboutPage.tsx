import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs, buildBreadcrumbJsonLd } from '../components/Breadcrumbs';
import { MediaImage } from '../components/MediaImage';
import { ArchGeometry } from '../components/BrandMotif';

export function AboutPage() {
  const { settings } = useSiteData();
  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'About Us' }];

  return (
    <>
      <SeoHead
        title="About Digital Madhesh | Marketing & Printing Agency in Sarlahi"
        description="Learn about Digital Madhesh—our mission, practical approach, core values, and integrated digital marketing and printing services across Madhesh Province."
        canonicalPath="/about"
        jsonLd={buildBreadcrumbJsonLd(breadcrumbs)}
      />

      {/* Editorial Dark Charcoal Studio Header */}
      <section className="relative bg-[#141414] text-white overflow-hidden">
        <ArchGeometry className="hidden lg:block absolute right-10 -bottom-24 w-96 h-96 text-[#DDB34D]/15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative">
          <div className="[&_a]:text-neutral-400 [&_a:hover]:text-[#DDB34D] [&_span[aria-current]]:text-white">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#DDB34D]">
                <span className="w-6 h-0.5 bg-[#DDB34D]" aria-hidden="true" />
                <span>Agency Profile · Harion, Sarlahi</span>
              </div>
              <h1 className="font-display text-[clamp(2.15rem,4vw,3.4rem)] font-extrabold tracking-tight leading-[1.08]">
                Practical digital marketing and dependable printing for Madhesh Province
              </h1>
              <p className="text-base text-neutral-300 leading-relaxed">{settings.aboutIntro}</p>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="hidden sm:block absolute -top-3 -right-3 w-full h-full rounded-3xl border border-[#DDB34D]/40" />
              <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-elevated">
                <MediaImage
                  src={settings.aboutImage}
                  alt="Digital Madhesh team planning campaigns in studio"
                  className="w-full aspect-[4/3] object-cover object-left"
                  fallbackTitle="Digital Madhesh Studio"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Split Cards */}
      <section className="py-16 lg:py-20 bg-[#FAF8F6] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-white border border-neutral-200 p-8 sm:p-10 shadow-card">
            <span className="font-mono text-xs font-bold text-[#780033] block mb-3">01 · Mission</span>
            <h2 className="font-display text-2xl font-bold text-[#171717] mb-3">
              Measurable growth without disconnected vendors
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              {settings.aboutMission}
            </p>
          </div>
          <div className="rounded-3xl bg-[#780033] text-white p-8 sm:p-10 shadow-card relative overflow-hidden">
            <ArchGeometry className="absolute -right-10 -bottom-12 w-44 h-44 text-white/10 pointer-events-none" />
            <div className="relative z-10">
              <span className="font-mono text-xs font-bold text-[#DDB34D] block mb-3">
                02 · Vision
              </span>
              <h2 className="font-display text-2xl font-bold mb-3">
                Trusted regional execution across all eight districts
              </h2>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                {settings.aboutVision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach & Differentiators */}
      <section className="py-16 lg:py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-semibold tracking-wider text-[#780033]">Our Approach</p>
            <h2 className="font-display text-3xl font-extrabold text-[#171717] tracking-tight">
              Strategy first, verified tracking second, consistent execution throughout
            </h2>
            <p className="text-base text-neutral-700 leading-relaxed">{settings.aboutApproach}</p>
          </div>

          <div className="lg:col-span-6 rounded-3xl border border-neutral-200 bg-[#FAF8F6] p-8">
            <h3 className="font-display text-lg font-bold text-[#171717] mb-5">
              What Makes Digital Madhesh Different
            </h3>
            <ul className="space-y-4">
              {(settings.aboutDifferentiators || []).map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                  <span className="w-6 h-6 rounded-lg bg-[#780033] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#DDB34D]" />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-20 bg-[#FAF8F6] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-wider text-[#780033] mb-2">Core Values</p>
            <h2 className="font-display text-3xl font-extrabold text-[#171717] tracking-tight">
              Standards we apply to every campaign and print run
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(settings.aboutValues || []).map((val, idx) => (
              <div
                key={val.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <span className="font-mono text-xs font-bold text-[#780033]">0{idx + 1}</span>
                <h3 className="font-display text-lg font-bold text-[#171717] mt-2 mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Team Members (Rendered ONLY when added via Admin) */}
      {settings.teamMembers && settings.teamMembers.length > 0 && (
        <section className="py-16 lg:py-20 bg-white border-b border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-xs font-semibold tracking-wider text-[#780033] mb-2">
                Leadership &amp; Specialists
              </p>
              <h2 className="font-display text-3xl font-extrabold text-[#171717] tracking-tight">
                Meet the Digital Madhesh team
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {settings.teamMembers.map((member, idx) => (
                <div
                  key={`${member.name}-${idx}`}
                  className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-card"
                >
                  {member.photo && (
                    <div className="aspect-square bg-neutral-100 overflow-hidden">
                      <MediaImage
                        src={member.photo}
                        alt={`${member.name} — ${member.role}`}
                        className="w-full h-full object-cover"
                        fallbackTitle={member.name}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-[#171717]">{member.name}</h3>
                    <p className="text-xs font-semibold text-[#780033] mb-3">{member.role}</p>
                    <p className="text-sm text-neutral-600 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#171717] text-white p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-1">
                Work with Digital Madhesh
              </h2>
              <p className="text-sm text-neutral-300">
                Reach out from anywhere in Madhesh Province for a consultation or print quote.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[#780033] text-white hover:bg-[#580025] transition-colors shrink-0"
            >
              <span>Contact Our Team</span>
              <ArrowRight className="w-4 h-4 text-[#DDB34D]" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
