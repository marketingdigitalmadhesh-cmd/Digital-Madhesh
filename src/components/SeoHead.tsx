import { useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function SeoHead({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImage,
  jsonLd,
  noIndex = false,
}: SeoHeadProps) {
  const { settings } = useSiteData();

  useEffect(() => {
    document.title = title;

    const origin = window.location.origin;
    const path = canonicalPath ?? window.location.pathname;
    const fullUrl = `${origin}${path}`;
    const resolvedImage = ogImage || settings.seoOgImage || '/assets/aistudio/Logo_PNG_social_poster_use_95e15f02.png';
    const fullImageUrl = resolvedImage.startsWith('http') ? resolvedImage : `${origin}${resolvedImage}`;

    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:site_name', 'Digital Madhesh');

    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImageUrl);

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', fullUrl);

    const existingScripts = document.querySelectorAll('script[data-dm-jsonld="true"]');
    existingScripts.forEach((s) => s.remove());

    const baseOrganizationSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'ProfessionalService'],
      name: 'Digital Madhesh',
      url: origin,
      logo: `${origin}/assets/aistudio/Logo_PNG_social_poster_use_95e15f02.png`,
      image: `${origin}/assets/aistudio/Logo_PNG_social_poster_use_95e15f02.png`,
      telephone: settings.phone,
      email: settings.email || 'marketing.digitalmadhesh@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Harion',
        addressLocality: 'Sarlahi',
        addressRegion: 'Madhesh Province',
        addressCountry: 'NP',
      },
      areaServed: [
        'Saptari',
        'Siraha',
        'Dhanusha',
        'Mahottari',
        'Sarlahi',
        'Rautahat',
        'Bara',
        'Parsa',
      ].map((district) => ({ '@type': 'AdministrativeArea', name: `${district}, Madhesh Province, Nepal` })),
    };

    const schemas = jsonLd
      ? Array.isArray(jsonLd)
        ? [baseOrganizationSchema, ...jsonLd]
        : [baseOrganizationSchema, jsonLd]
      : [baseOrganizationSchema];

    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-dm-jsonld', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [title, description, canonicalPath, ogType, ogImage, jsonLd, noIndex, settings]);

  return null;
}
