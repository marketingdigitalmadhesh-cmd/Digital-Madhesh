import { useSearchParams } from 'react-router-dom';
import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs, buildBreadcrumbJsonLd } from '../components/Breadcrumbs';
import { ContactForm } from '../components/ContactForm';
import { ArchGeometry } from '../components/BrandMotif';

export function ContactPage() {
  const { settings } = useSiteData();
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Contact' }];
  const whatsappDigits = settings.whatsappNumber.replace(/[^0-9]/g, '') || '9779865529001';
  const whatsappHref = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
    'Hello Digital Madhesh, I would like to discuss a project or request a quote.',
  )}`;

  const hasValidEmbed =
    settings.googleMapsEmbedUrl &&
    (settings.googleMapsEmbedUrl.startsWith('https://www.google.com/maps/embed') ||
      settings.googleMapsEmbedUrl.startsWith('https://maps.google.com'));

  return (
    <>
      <SeoHead
        title="Contact Digital Madhesh | Harion, Sarlahi, Nepal"
        description="Contact Digital Madhesh in Harion, Sarlahi for digital marketing, Meta Ads, website development, and commercial printing inquiries across Madhesh Province."
        canonicalPath="/contact"
        jsonLd={buildBreadcrumbJsonLd(breadcrumbs)}
      />

      {/* Split-Screen High-Contrast Studio Layout */}
      <section className="bg-[#FAF8F6] bg-dot-grid py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Charcoal Agency Desk Panel */}
            <div className="lg:col-span-5 rounded-3xl bg-[#141414] text-white p-8 sm:p-10 relative overflow-hidden shadow-elevated space-y-8">
              <ArchGeometry className="absolute -right-16 -bottom-20 w-72 h-72 text-[#DDB34D]/15 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <p className="text-xs font-semibold tracking-wider text-[#DDB34D]">
                  Direct Consultation Desk
                </p>
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.1]">
                  Start a project or request a quote
                </h1>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Share your marketing goals or printing specifications. Every form submission
                  generates a unique reference ID for tracking.
                </p>
              </div>

              <div className="relative z-10 space-y-5 text-sm border-t border-neutral-800 pt-6">
                <div className="flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-[#780033] text-[#DDB34D] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs text-neutral-400">Official Phone</p>
                    <a
                      href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                      className="font-mono tabular-nums font-bold text-white hover:text-[#DDB34D]"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-[#780033] text-[#DDB34D] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs text-neutral-400">WhatsApp Desk</p>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#DDB34D] hover:underline"
                    >
                      Start WhatsApp Chat
                    </a>
                  </div>
                </div>

                {settings.email && (
                  <div className="flex items-start gap-3.5">
                    <span className="w-9 h-9 rounded-xl bg-neutral-800 text-[#DDB34D] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs text-neutral-400">Email</p>
                      <a
                        href={`mailto:${settings.email}`}
                        className="font-medium text-neutral-200 hover:text-[#DDB34D] break-all"
                      >
                        {settings.email}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-neutral-800 text-[#DDB34D] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs text-neutral-400">Office Location</p>
                    <p className="font-medium text-white">{settings.address}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Serving Saptari, Siraha, Dhanusha, Mahottari, Sarlahi, Rautahat, Bara &amp;
                      Parsa
                    </p>
                  </div>
                </div>

                {settings.businessHours && (
                  <div className="flex items-start gap-3.5">
                    <span className="w-9 h-9 rounded-xl bg-neutral-800 text-[#DDB34D] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs text-neutral-400">Business Hours</p>
                      <p className="font-medium text-neutral-200">{settings.businessHours}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative z-10 flex flex-wrap gap-3 pt-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-[#DDB34D] text-[#171717] hover:bg-[#c99e3b] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message on WhatsApp</span>
                </a>
                {settings.googleMapsUrl && (
                  <a
                    href={settings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium border border-neutral-700 text-neutral-200 hover:border-[#DDB34D] transition-colors"
                  >
                    <span>Open Map</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {hasValidEmbed && (
                <div className="relative z-10 rounded-2xl overflow-hidden border border-neutral-800">
                  <iframe
                    title="Digital Madhesh Location Map"
                    src={settings.googleMapsEmbedUrl}
                    className="w-full h-52 border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>

            {/* Right Elevated White Form Card */}
            <div className="lg:col-span-7 rounded-3xl border border-neutral-200 bg-white p-7 sm:p-10 shadow-elevated">
              <div className="mb-7 pb-5 border-b border-neutral-100">
                <p className="text-xs font-semibold text-[#780033] mb-1">Inquiry Form</p>
                <h2 className="font-display text-2xl font-bold text-[#171717]">
                  Tell us about your campaign or printing requirements
                </h2>
              </div>
              <ContactForm defaultService={preselectedService} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
