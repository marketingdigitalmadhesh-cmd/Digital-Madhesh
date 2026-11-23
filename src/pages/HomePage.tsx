import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
  Printer,
  Target,
  TrendingUp,
} from 'lucide-react';
import { db } from '../lib/firebase';
import { useSiteData } from '../context/SiteDataContext';
import { PortfolioProject, ServiceCategory } from '../types';
import { SeoHead } from '../components/SeoHead';
import { MediaImage } from '../components/MediaImage';
import { ArchGeometry, GeometricCornerAccent } from '../components/BrandMotif';

const SERVICE_PILLARS: {
  number: string;
  category: ServiceCategory;
  description: string;
  featuredSlugs: string[];
  span: string;
  tone: 'dark' | 'light' | 'warm' | 'maroon';
  icon: typeof Target;
}[] = [
  {
    number: '01',
    category: 'Digital Marketing',
    description:
      'Targeted Meta Ads, Google Search campaigns, and lead-generation funnels built around real phone and WhatsApp inquiries across your target districts.',
    featuredSlugs: [
      'facebook-and-instagram-ads',
      'meta-ads-management',
      'google-ads',
      'lead-generation-campaigns',
    ],
    span: 'lg:col-span-7',
    tone: 'dark',
    icon: Target,
  },
  {
    number: '02',
    category: 'Creative Services',
    description:
      'Feed-native social creatives, highway hoarding artwork, commercial video shoots, and bilingual copywriting.',
    featuredSlugs: [
      'graphic-design',
      'social-media-creative-design',
      'advertising-design',
      'promotional-video-editing',
    ],
    span: 'lg:col-span-5',
    tone: 'light',
    icon: Layers,
  },
  {
    number: '03',
    category: 'Website and Tracking',
    description:
      'Mobile-first websites, dedicated campaign landing pages, Meta Pixel, server-side Conversion API, and GA4 reporting.',
    featuredSlugs: [
      'website-development',
      'landing-page-development',
      'meta-pixel-setup',
      'conversion-api-setup',
    ],
    span: 'lg:col-span-5',
    tone: 'warm',
    icon: TrendingUp,
  },
  {
    number: '04',
    category: 'Printing and Advertising',
    description:
      'Commercial flex and star-flex hoardings, bulk offset brochures, bill pads, framed certificates, wedding cards, and custom corporate gifts.',
    featuredSlugs: [
      'flex-printing',
      'offset-printing',
      'bill-pad-and-letterhead-printing',
      'certificate-printing-with-frame',
    ],
    span: 'lg:col-span-7',
    tone: 'maroon',
    icon: Printer,
  },
];

const INDUSTRIES = [
  {
    num: '01',
    title: 'Schools, Colleges & Institutes',
    detail: 'Admission lead campaigns, prospectuses, admit cards, framed certificates, and stage backdrops.',
  },
  {
    num: '02',
    title: 'Hospitals, Clinics & Labs',
    detail: 'Patient appointment campaigns, local search visibility, patient record files, and clinic signage.',
  },
  {
    num: '03',
    title: 'Retail Showrooms & Dealers',
    detail: 'Local radius Meta ads, seasonal offer reels, highway flex boards, and branded carry bags.',
  },
  {
    num: '04',
    title: 'Hotels, Resorts & Banquet Halls',
    detail: 'Booking websites, wedding showcase videos, directional banners, and invitation stationery.',
  },
  {
    num: '05',
    title: 'Cooperatives, Traders & Industries',
    detail: 'Official letterheads, numbered receipt books, B2B websites, and catalog printing.',
  },
  {
    num: '06',
    title: 'NGOs & Community Programs',
    detail: 'Complete seminar print kits, delegate badges, banners, tokens of love, and event video coverage.',
  },
];

export function HomePage() {
  const { settings, services } = useSiteData();
  const [featuredProjects, setFeaturedProjects] = useState<PortfolioProject[]>([]);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Sarlahi');

  useEffect(() => {
    const q = query(
      collection(db, 'projects'),
      where('status', '==', 'published'),
      limit(6),
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({
          ...(d.data() as Omit<PortfolioProject, 'id'>),
          id: d.id,
        }));
        const prioritized = list.sort(
          (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
        );
        setFeaturedProjects(prioritized.slice(0, 3));
      },
      () => {
        setFeaturedProjects([]);
      },
    );
    return () => unsub();
  }, []);

  const whatsappDigits = settings.whatsappNumber.replace(/[^0-9]/g, '') || '9779865529001';
  const whatsappHref = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
    'Hello Digital Madhesh, I would like to request a free consultation.',
  )}`;

  const activeDistrictArea =
    (settings.serviceAreas || []).find((a) => a.district === selectedDistrict) ||
    (settings.serviceAreas || [])[0];

  const faqSchema =
    settings.faqs && settings.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: settings.faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        }
      : undefined;

  return (
    <>
      <SeoHead
        title={settings.seoSiteTitle || 'Digital Madhesh | Digital Marketing & Printing Agency in Sarlahi, Nepal'}
        description={
          settings.seoMetaDescription ||
          'Digital Madhesh provides Meta Ads, Google Ads, website development, conversion tracking, and commercial printing across all 8 districts of Madhesh Province.'
        }
        canonicalPath="/"
        jsonLd={faqSchema}
      />

      {/* 1. Layered Split-Screen Hero */}
      <section className="relative overflow-hidden bg-[#FAF8F6] bg-dot-grid border-b border-neutral-200/80">
        <ArchGeometry className="hidden lg:block absolute -right-24 -top-12 w-[520px] h-[520px] text-[#780033]/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 lg:pt-20 lg:pb-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Typographic Anchor */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wider text-[#780033]">
                <span className="w-8 h-0.5 bg-[#DDB34D]" aria-hidden="true" />
                <span>Harion, Sarlahi · Madhesh Province, Nepal</span>
              </div>

              <h1 className="font-display text-[clamp(2.35rem,4.3vw,3.85rem)] font-extrabold text-[#171717] tracking-tight leading-[1.06]">
                {settings.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
                {settings.heroDescription}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold bg-[#780033] text-white hover:bg-[#580025] shadow-[0_14px_30px_-10px_rgba(120,0,51,0.55)] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                >
                  <span>{settings.heroPrimaryCta || 'Get a Free Consultation'}</span>
                  <ArrowRight className="w-4 h-4 text-[#DDB34D]" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-semibold bg-white border border-neutral-300 text-[#171717] hover:border-[#780033] shadow-sm transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                >
                  {settings.heroSecondaryCta || 'View Our Services'}
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm font-semibold bg-[#DDB34D]/20 text-[#171717] hover:bg-[#DDB34D]/35 border border-[#DDB34D]/50 transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-[#780033]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Layered 2D Composition */}
            <div className="lg:col-span-6 relative lg:pl-6">
              <div className="relative mx-auto max-w-xl lg:max-w-none">
                {/* Maroon Geometric Offset Backplate */}
                <div
                  aria-hidden="true"
                  className="hidden sm:block absolute -top-4 -right-4 w-full h-full rounded-3xl bg-[#780033]"
                />
                {/* Gold Corner Trim */}
                <div
                  aria-hidden="true"
                  className="hidden sm:block absolute -bottom-4 -left-4 w-32 h-32 rounded-3xl bg-[#DDB34D]"
                />

                {/* Main Studio Photo */}
                <div className="relative z-10 rounded-2xl overflow-hidden border border-neutral-200/80 bg-white shadow-elevated">
                  <MediaImage
                    src={settings.heroImage}
                    alt="Digital Madhesh marketing strategists reviewing campaign analytics"
                    className="w-full h-72 sm:h-96 lg:h-[430px] object-cover"
                    fallbackTitle="Digital Madhesh Agency Studio"
                  />
                </div>

                {/* Floating Card 1: Top-Left Brand Studio Anchor */}
                <div className="hidden sm:flex items-center gap-3 absolute -top-6 -left-6 z-20 bg-white rounded-2xl px-4 py-3 shadow-elevated border border-neutral-100">
                  <img
                    src="/assets/aistudio/Icon_Based_Logo_828d99ce.png"
                    alt="Digital Madhesh emblem"
                    className="w-10 h-10 rounded-xl object-contain shrink-0"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#171717]">Digital + Print Studio</p>
                    <p className="text-[11px] text-neutral-500">Harion, Sarlahi HQ</p>
                  </div>
                </div>

                {/* Floating Card 2: Bottom-Right Coverage Anchor */}
                <div className="hidden sm:block absolute -bottom-6 -right-3 z-20 bg-[#171717] text-white rounded-2xl px-5 py-3.5 shadow-elevated border border-neutral-800">
                  <p className="text-[11px] font-medium text-[#DDB34D]">Regional Coverage</p>
                  <p className="text-sm font-bold tracking-tight">
                    All 8 Districts · Madhesh Province
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grounded Elevated Anchor Strip */}
          <div className="mt-14 bg-white rounded-2xl border border-neutral-200/80 shadow-card p-6 sm:p-7 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-neutral-100">
            <div className="lg:pr-6">
              <p className="text-xs text-neutral-500 mb-1">Agency Office</p>
              <p className="text-sm font-bold text-[#171717]">Harion, Sarlahi, Nepal</p>
            </div>
            <div className="lg:px-6 pt-3 sm:pt-0">
              <p className="text-xs text-neutral-500 mb-1">Service Footprint</p>
              <p className="text-sm font-bold text-[#171717] tabular-nums">
                8 Madhesh Districts
              </p>
            </div>
            <div className="lg:px-6 pt-3 sm:pt-0">
              <p className="text-xs text-neutral-500 mb-1">Integrated Disciplines</p>
              <p className="text-sm font-bold text-[#171717]">
                Ads, Web, Tracking &amp; Print
              </p>
            </div>
            <div className="lg:pl-6 pt-3 sm:pt-0">
              <p className="text-xs text-neutral-500 mb-1">Direct Consultation Desk</p>
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="text-sm font-bold font-mono tabular-nums text-[#780033] hover:underline"
              >
                {settings.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Distinctive Asymmetric Bento Services Grid */}
      <section className="py-18 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider text-[#780033] mb-2">
                Core Capabilities
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
                Four specialized practices under one roof
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-300 text-sm font-semibold text-[#171717] hover:border-[#780033] hover:text-[#780033] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Explore All 31 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {SERVICE_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const matchedServices = services.filter((s) =>
                pillar.featuredSlugs.includes(s.slug),
              );
              const totalInCategory = services.filter(
                (s) => s.category === pillar.category,
              ).length;

              const toneClasses =
                pillar.tone === 'dark'
                  ? 'bg-[#171717] text-white border-neutral-800'
                  : pillar.tone === 'maroon'
                  ? 'bg-[#780033] text-white border-[#580025]'
                  : pillar.tone === 'warm'
                  ? 'bg-[#FAF8F6] text-[#171717] border-neutral-200'
                  : 'bg-white text-[#171717] border-neutral-200 shadow-card';

              const isDark = pillar.tone === 'dark' || pillar.tone === 'maroon';

              return (
                <motion.div
                  key={pillar.category}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className={`${pillar.span} ${toneClasses} rounded-3xl border p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden`}
                >
                  {isDark && (
                    <ArchGeometry className="absolute -right-14 -bottom-16 w-56 h-56 text-white/10 pointer-events-none" />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                            pillar.tone === 'dark'
                              ? 'bg-[#780033] text-[#DDB34D]'
                              : pillar.tone === 'maroon'
                              ? 'bg-white/15 text-[#DDB34D]'
                              : 'bg-[#FDF5F8] text-[#780033]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span
                          className={`font-mono text-xs font-semibold ${
                            isDark ? 'text-[#DDB34D]' : 'text-[#780033]'
                          }`}
                        >
                          {pillar.number}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-medium ${
                          isDark ? 'text-neutral-300' : 'text-neutral-500'
                        }`}
                      >
                        {totalInCategory} services
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold mb-3">{pillar.category}</h3>
                    <p
                      className={`text-sm leading-relaxed mb-7 max-w-xl ${
                        isDark ? 'text-neutral-200' : 'text-neutral-600'
                      }`}
                    >
                      {pillar.description}
                    </p>

                    <div
                      className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-5 border-t ${
                        isDark ? 'border-white/15' : 'border-neutral-200/80'
                      }`}
                    >
                      {matchedServices.map((svc) => (
                        <Link
                          key={svc.slug}
                          to={`/services/${svc.slug}`}
                          className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            isDark
                              ? 'bg-white/5 hover:bg-white/15 text-white'
                              : 'bg-neutral-50 hover:bg-[#FDF5F8] text-[#171717] hover:text-[#780033]'
                          }`}
                        >
                          <span className="truncate pr-2">{svc.title}</span>
                          <ArrowUpRight
                            className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                              isDark ? 'text-[#DDB34D]' : 'text-neutral-400 group-hover:text-[#780033]'
                            }`}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 mt-6 pt-2">
                    <Link
                      to={`/services?category=${encodeURIComponent(pillar.category)}`}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                        isDark
                          ? 'text-[#DDB34D] hover:text-white'
                          : 'text-[#780033] hover:text-[#580025]'
                      }`}
                    >
                      <span>View all {pillar.category}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Visually Rich Layered About Section */}
      <section className="py-18 lg:py-24 bg-[#FAF8F6] border-y border-neutral-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Overlapping 2D Photo Composition */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-6 relative pb-10 sm:pb-14 pr-0 sm:pr-10"
            >
              <GeometricCornerAccent className="hidden sm:block absolute -top-8 -left-8 w-36 h-36 text-[#DDB34D] pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden border border-neutral-200 bg-white shadow-elevated">
                <MediaImage
                  src={settings.printingImage}
                  alt="Commercial printed corporate stationery and custom certificates by Digital Madhesh"
                  className="w-full aspect-[4/3] object-cover"
                  fallbackTitle="Digital & Print Production"
                />
              </div>

              {/* Overlapping Inset Studio Frame */}
              <div className="hidden sm:block absolute bottom-0 right-0 w-56 md:w-64 rounded-2xl overflow-hidden border-4 border-white shadow-elevated bg-white">
                <MediaImage
                  src={settings.aboutImage}
                  alt="Digital Madhesh planning session"
                  className="w-full aspect-[4/3] object-cover object-left"
                  fallbackTitle="Agency Strategy"
                />
              </div>
            </motion.div>

            {/* Right Narrative */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#780033]">
                <span className="w-6 h-0.5 bg-[#DDB34D]" aria-hidden="true" />
                <span>About Digital Madhesh</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight leading-[1.12]">
                One accountable studio bridging online campaigns and commercial print
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed">{settings.aboutIntro}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {(settings.aboutValues || []).slice(0, 4).map((val) => (
                  <div
                    key={val.title}
                    className="rounded-2xl bg-white border border-neutral-200/80 p-4 shadow-sm"
                  >
                    <h3 className="font-display text-sm font-bold text-[#171717] mb-1">
                      {val.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">{val.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[#171717] text-white hover:bg-[#780033] transition-colors"
                >
                  <span>Our Approach &amp; Story</span>
                  <ArrowRight className="w-4 h-4 text-[#DDB34D]" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border border-neutral-300 bg-white text-[#171717] hover:border-[#780033] transition-colors"
                >
                  Schedule Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Creative Portfolio Showcase */}
      <section className="py-18 lg:py-24 bg-[#141414] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-light opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#DDB34D] mb-2">
                Selected Work &amp; Case Studies
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                Crafted for businesses across Madhesh
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-700 text-sm font-semibold text-white hover:border-[#DDB34D] hover:text-[#DDB34D] transition-colors whitespace-nowrap shrink-0"
            >
              <span>View Portfolio Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {featuredProjects.map((project, idx) => {
                const isLead = idx === 0 && featuredProjects.length >= 2;
                return (
                  <Link
                    key={project.id}
                    to={`/portfolio/${project.slug}`}
                    className={`group relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 flex flex-col justify-end min-h-[340px] ${
                      isLead ? 'lg:col-span-6 lg:min-h-[420px]' : 'lg:col-span-3'
                    }`}
                  >
                    <MediaImage
                      src={project.coverImage}
                      alt={project.coverImageAlt || project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      fallbackTitle={project.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />
                    <div className="relative z-10 p-6 sm:p-7 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-[#DDB34D]">
                        <span>{project.category}</span>
                        {project.location && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{project.location}</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-[#DDB34D] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2">
                        {project.summary}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-neutral-800 relative min-h-[300px]">
                <MediaImage
                  src="/src/assets/images/printing_press_production_1795419642157.jpg"
                  alt="Digital Madhesh printing and creative production studio"
                  className="w-full h-full object-cover"
                  fallbackTitle="Production Showcase"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs font-semibold text-[#DDB34D] mb-1">
                    Digital + Physical Execution
                  </p>
                  <p className="font-display text-xl font-bold text-white">
                    Campaign creatives, conversion landing pages, and commercial printing
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-3xl border border-neutral-800 bg-neutral-900 p-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="font-mono text-xs text-[#DDB34D]">Portfolio Archive</span>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Real case studies published via our CMS
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    We publish only verified client case studies and print samples—never invented
                    ROAS or artificial results. Request industry-relevant work samples directly on
                    WhatsApp or via consultation.
                  </p>
                </div>
                <div className="pt-6 flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[#780033] text-white hover:bg-[#580025] transition-colors"
                  >
                    <span>Request Work Samples</span>
                    <ArrowRight className="w-4 h-4 text-[#DDB34D]" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Industries We Serve */}
      <section className="py-18 lg:py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold tracking-wider text-[#780033] mb-2">
              Industries We Serve
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              Built for institutions, healthcare, retail, and regional trade
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.title}
                className="rounded-2xl border border-neutral-200/90 bg-[#FAF8F6] p-7 hover:bg-white hover:border-[#780033]/50 hover:shadow-card transition-all duration-200"
              >
                <span className="font-mono text-xs font-bold text-[#780033] block mb-3">
                  {ind.num}
                </span>
                <h3 className="font-display text-lg font-bold text-[#171717] mb-2">
                  {ind.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{ind.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Interactive Madhesh Province 8-District Coverage */}
      <section className="py-18 lg:py-24 bg-[#FAF8F6] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#780033] mb-2">
                Madhesh Province Coverage
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
                Active service across all eight districts
              </h2>
            </div>
            <Link
              to="/service-areas"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#780033] hover:text-[#580025] whitespace-nowrap shrink-0"
            >
              <span>Full Regional Coverage Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Interactive District Selector */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(settings.serviceAreas || []).map((area) => {
                const isSelected = area.district === activeDistrictArea?.district;
                return (
                  <button
                    key={area.district}
                    type="button"
                    onClick={() => setSelectedDistrict(area.district)}
                    className={`text-left rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#780033] text-white border-[#780033] shadow-card -translate-y-0.5'
                        : 'bg-white text-[#171717] border-neutral-200 hover:border-[#780033]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <MapPin
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-[#DDB34D]' : 'text-[#780033]'
                        }`}
                      />
                      {area.district === 'Sarlahi' && (
                        <span
                          className={`text-[10px] font-semibold ${
                            isSelected ? 'text-[#DDB34D]' : 'text-[#780033]'
                          }`}
                        >
                          HQ
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-display text-base font-bold">{area.district}</p>
                      <p
                        className={`text-[11px] mt-1 line-clamp-1 ${
                          isSelected ? 'text-white/80' : 'text-neutral-500'
                        }`}
                      >
                        {area.hubs}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Active District Spotlight Card */}
            {activeDistrictArea && (
              <div className="lg:col-span-5 rounded-3xl bg-[#171717] text-white p-7 sm:p-8 flex flex-col justify-between shadow-elevated">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-[#DDB34D]">
                      District Spotlight
                    </span>
                    <span className="text-xs text-neutral-400">Madhesh Province</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold">
                    {activeDistrictArea.district} District
                  </h3>
                  <p className="text-xs font-medium text-[#DDB34D]">
                    Hubs: {activeDistrictArea.hubs}
                  </p>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {activeDistrictArea.description}
                  </p>
                  <div className="pt-2 border-t border-neutral-800">
                    <p className="text-[11px] text-neutral-400 mb-1">Common Requests</p>
                    <p className="text-xs font-medium text-white">
                      {activeDistrictArea.focusServices}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    to={`/contact?service=${encodeURIComponent(
                      `Inquiry from ${activeDistrictArea.district}`,
                    )}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-[#DDB34D] text-[#171717] hover:bg-[#c99e3b] transition-colors"
                  >
                    <span>Inquire for {activeDistrictArea.district}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Real Testimonials (Rendered ONLY when real entries exist in Firestore) */}
      {settings.testimonials && settings.testimonials.length > 0 && (
        <section className="py-18 lg:py-22 bg-white border-b border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-xs font-semibold tracking-wider text-[#780033] mb-2">
                Client Feedback
              </p>
              <h2 className="font-display text-3xl font-extrabold text-[#171717] tracking-tight">
                Verified feedback from Madhesh organizations
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {settings.testimonials.map((t, idx) => (
                <div
                  key={`${t.name}-${idx}`}
                  className="rounded-2xl border border-neutral-200 bg-[#FAF8F6] p-7 flex flex-col justify-between"
                >
                  <p className="text-sm text-neutral-700 leading-relaxed mb-6">“{t.quote}”</p>
                  <div className="border-t border-neutral-200 pt-4">
                    <p className="text-sm font-bold text-[#171717]">{t.name}</p>
                    <p className="text-xs text-neutral-500">
                      {t.role} · {t.organization}
                    </p>
                    {t.outcome && (
                      <p className="text-xs font-semibold text-[#780033] mt-1">{t.outcome}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. FAQs */}
      {settings.faqs && settings.faqs.length > 0 && (
        <section className="py-18 lg:py-22 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-wider text-[#780033] mb-2">
                Frequently Asked Questions
              </p>
              <h2 className="font-display text-3xl font-extrabold text-[#171717] tracking-tight">
                Clear answers before we begin
              </h2>
            </div>

            <div className="space-y-3">
              {settings.faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={faq.question}
                    className={`rounded-2xl border transition-colors ${
                      isOpen
                        ? 'border-[#780033]/40 bg-[#FAF8F6]'
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
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

      {/* 9. Layered Maroon Contact CTA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#780033] text-white p-8 sm:p-12 lg:p-14 overflow-hidden shadow-elevated">
            <ArchGeometry className="hidden md:block absolute -right-12 -bottom-16 w-80 h-80 text-[#DDB34D]/25 pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold tracking-wider text-[#DDB34D]">
                  Start Your Project
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Ready to launch your next campaign or commercial print order?
                </h2>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  Talk directly with Digital Madhesh in Harion, Sarlahi—either via our consultation
                  form or directly on WhatsApp.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold bg-white text-[#780033] hover:bg-neutral-100 transition-colors"
                >
                  <span>Get a Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold bg-[#580025] border border-white/25 text-white hover:border-[#DDB34D] transition-colors font-mono tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#DDB34D]" />
                  <span>{settings.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
