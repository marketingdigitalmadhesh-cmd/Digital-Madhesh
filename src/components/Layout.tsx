import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/service-areas', label: 'Service Areas' },
  { to: '/blog', label: 'Blog' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { settings } = useSiteData();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappDigits = settings.whatsappNumber.replace(/[^0-9]/g, '') || '9779865529001';
  const whatsappHref = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
    'Hello Digital Madhesh, I would like to discuss a marketing or printing inquiry.',
  )}`;

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#171717]">
      {/* Strict 3-Zone Top Bar Contract with elevated scroll glass */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-white/92 backdrop-blur-md border-b border-neutral-200/80 shadow-[0_8px_30px_-14px_rgba(23,23,23,0.12)]'
            : 'bg-white border-b border-neutral-200/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Lockup (single link element) */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-[#780033]"
            aria-label="Digital Madhesh Home"
          >
            <img
              src="/assets/aistudio/Logo_PNG_social_poster_use_95e15f02.png"
              alt="Digital Madhesh"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </Link>

          {/* Zone 2: 5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary Navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-sm font-medium whitespace-nowrap shrink-0 py-1.5 transition-colors ${
                    isActive ? 'text-[#780033]' : 'text-neutral-700 hover:text-[#780033]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <span
                      className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full transition-transform duration-200 origin-left ${
                        isActive ? 'bg-[#780033] scale-x-100' : 'bg-[#DDB34D] scale-x-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + mobile menu button */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-xl bg-[#780033] text-white hover:bg-[#580025] shadow-[0_10px_24px_-10px_rgba(120,0,51,0.55)] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <span>Get Free Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-[#DDB34D]" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-neutral-200 text-[#171717] hover:border-[#780033]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-4 py-5 space-y-1 shadow-xl">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive ? 'text-[#780033] bg-[#FDF5F8]' : 'text-[#171717] hover:bg-neutral-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2.5">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-5 py-3 rounded-xl text-sm font-semibold bg-[#780033] text-white"
              >
                Get Free Consultation
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-5 py-3 rounded-xl text-sm font-semibold border border-neutral-300 text-[#171717] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#780033]" />
                WhatsApp {settings.phone}
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Layered Charcoal Footer */}
      <footer className="bg-[#141414] text-neutral-300 relative overflow-hidden">
        {/* Accent top trim */}
        <div className="h-1 w-full bg-gradient-to-r from-[#780033] via-[#DDB34D] to-[#780033]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
            <div className="lg:col-span-4 space-y-4">
              <Link to="/" className="inline-flex items-center gap-3">
                <img
                  src="/assets/aistudio/Icon_Based_Logo_828d99ce.png"
                  alt="Digital Madhesh Mark"
                  className="w-11 h-11 rounded-xl object-contain"
                />
                <div>
                  <span className="font-display text-lg font-bold text-white tracking-tight block">
                    Digital Madhesh
                  </span>
                  <span className="text-xs text-[#DDB34D]">
                    Built for Madhesh Businesses
                  </span>
                </div>
              </Link>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
                {settings.footerDescription}
              </p>
              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#780033] text-white hover:bg-[#580025] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#DDB34D]" />
                  WhatsApp Chat
                </a>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-neutral-700 text-neutral-200 hover:border-[#DDB34D] transition-colors font-mono tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[#DDB34D]" />
                  {settings.phone}
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/" className="hover:text-[#DDB34D] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#DDB34D] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-[#DDB34D] transition-colors">
                    All Services
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="hover:text-[#DDB34D] transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/service-areas" className="hover:text-[#DDB34D] transition-colors">
                    Service Areas
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-[#DDB34D] transition-colors">
                    Blog &amp; Guides
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h3 className="text-sm font-semibold text-white mb-4">Core Capabilities</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    to="/services/facebook-and-instagram-ads"
                    className="hover:text-[#DDB34D] transition-colors"
                  >
                    Facebook &amp; Instagram Ads
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/google-ads"
                    className="hover:text-[#DDB34D] transition-colors"
                  >
                    Google Search Ads
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/website-development"
                    className="hover:text-[#DDB34D] transition-colors"
                  >
                    Website &amp; Landing Pages
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/conversion-api-setup"
                    className="hover:text-[#DDB34D] transition-colors"
                  >
                    Meta Pixel &amp; Conversion API
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/flex-printing"
                    className="hover:text-[#DDB34D] transition-colors"
                  >
                    Flex &amp; Banner Printing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/offset-printing"
                    className="hover:text-[#DDB34D] transition-colors"
                  >
                    Offset &amp; Stationery Printing
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 space-y-3 text-sm">
                <h3 className="text-sm font-semibold text-white">Harion Studio Desk</h3>
                <p className="text-neutral-300 text-xs leading-relaxed">{settings.address}</p>
                {settings.email && (
                  <p className="text-xs">
                    <a href={`mailto:${settings.email}`} className="text-[#DDB34D] hover:underline break-all">
                      {settings.email}
                    </a>
                  </p>
                )}
                {settings.businessHours && (
                  <p className="text-xs text-neutral-400 leading-relaxed pt-1 border-t border-neutral-800">
                    {settings.businessHours}
                  </p>
                )}
                {settings.socialLinks &&
                  Object.values(settings.socialLinks).some((v) => Boolean(v && v.trim())) && (
                    <div className="pt-2 flex flex-wrap gap-3 text-xs border-t border-neutral-800">
                      {settings.socialLinks.facebook && (
                        <a
                          href={settings.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#DDB34D]"
                        >
                          Facebook
                        </a>
                      )}
                      {settings.socialLinks.instagram && (
                        <a
                          href={settings.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#DDB34D]"
                        >
                          Instagram
                        </a>
                      )}
                      {settings.socialLinks.linkedin && (
                        <a
                          href={settings.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#DDB34D]"
                        >
                          LinkedIn
                        </a>
                      )}
                      {settings.socialLinks.youtube && (
                        <a
                          href={settings.socialLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#DDB34D]"
                        >
                          YouTube
                        </a>
                      )}
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
            <p>
              &copy; {new Date().getFullYear()} Digital Madhesh. Serving Saptari, Siraha, Dhanusha,
              Mahottari, Sarlahi, Rautahat, Bara &amp; Parsa.
            </p>
            <div className="flex items-center gap-5">
              <Link to="/contact" className="hover:text-white transition-colors">
                Request Quote
              </Link>
              <Link to="/admin" className="hover:text-[#DDB34D] transition-colors">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Compact Floating WhatsApp Quick Action */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Digital Madhesh"
        className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#171717] text-white border border-[#DDB34D]/60 shadow-elevated hover:bg-[#780033] transition-all duration-200 hover:-translate-y-0.5 text-xs font-semibold"
      >
        <MessageCircle className="w-4 h-4 text-[#DDB34D]" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>
    </div>
  );
}
