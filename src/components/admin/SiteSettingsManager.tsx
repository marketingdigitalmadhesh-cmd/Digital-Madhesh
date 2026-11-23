import { useEffect, useState } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Download, Loader2, Plus, Trash2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { useSiteData } from '../../context/SiteDataContext';
import { BlogPost, PortfolioProject, SiteSettings } from '../../types';
import { ImageUploadField } from './ImageUploadField';

interface SiteSettingsManagerProps {
  blogs: BlogPost[];
  projects: PortfolioProject[];
}

export function SiteSettingsManager({ blogs, projects }: SiteSettingsManagerProps) {
  const { settings, services } = useSiteData();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    setSavedMsg(null);
    const docPath = 'site_settings/main';
    try {
      await setDoc(doc(db, 'site_settings', 'main'), {
        ...form,
        heroHeadline: form.heroHeadline.trim().slice(0, 240) || settings.heroHeadline,
        phone: form.phone.trim().slice(0, 40) || '+977 9865529001',
        whatsappNumber: form.whatsappNumber.trim().slice(0, 40) || '9779865529001',
        address: form.address.trim().slice(0, 300) || 'Harion, Sarlahi, Madhesh Province, Nepal',
        teamMembers: (form.teamMembers || []).slice(0, 20),
        testimonials: (form.testimonials || []).slice(0, 20),
        faqs: (form.faqs || []).slice(0, 20),
        serviceAreas: (form.serviceAreas || []).slice(0, 12),
        updatedAt: serverTimestamp(),
      });
      setSavedMsg('Website content and SEO settings saved to Cloud Firestore.');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, docPath);
    } finally {
      setSaving(false);
    }
  };

  const downloadUpdatedSitemap = () => {
    const origin = window.location.origin;
    const staticUrls = ['/', '/about', '/services', '/portfolio', '/service-areas', '/blog', '/contact'];
    const serviceUrls = services.filter((s) => s.active).map((s) => `/services/${s.slug}`);
    const blogUrls = blogs.filter((b) => b.status === 'published').map((b) => `/blog/${b.slug}`);
    const projectUrls = projects.filter((p) => p.status === 'published').map((p) => `/portfolio/${p.slug}`);

    const allUrls = [...staticUrls, ...serviceUrls, ...blogUrls, ...projectUrls];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allUrls
      .map((u) => `  <url><loc>${origin}${u}</loc></url>`)
      .join('\n')}\n</urlset>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-[#171717]">
            Website Content, Team, Testimonials &amp; SEO
          </h2>
          <p className="text-sm text-neutral-600">
            Update homepage messaging, studio photos, About content, business hours, FAQs, and SEO.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadUpdatedSitemap}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border border-neutral-300 text-[#171717] hover:border-[#780033] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export Sitemap XML
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold bg-[#780033] text-white hover:bg-[#5B0027] disabled:opacity-60 cursor-pointer"
          >
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Save All Settings
          </button>
        </div>
      </div>

      {savedMsg && (
        <div className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800">
          {savedMsg}
        </div>
      )}

      {/* 1. Homepage & Hero Imagery */}
      <div className="border border-neutral-200 bg-white p-6 space-y-5">
        <h3 className="font-display text-base font-bold text-[#171717] border-b border-neutral-100 pb-3">
          Homepage Hero &amp; Imagery
        </h3>
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">Hero Headline</label>
          <input
            type="text"
            maxLength={240}
            value={form.heroHeadline}
            onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Hero Supporting Description
          </label>
          <textarea
            rows={3}
            maxLength={800}
            value={form.heroDescription || ''}
            onChange={(e) => setForm({ ...form, heroDescription: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">
              Primary CTA Label
            </label>
            <input
              type="text"
              maxLength={80}
              value={form.heroPrimaryCta || ''}
              onChange={(e) => setForm({ ...form, heroPrimaryCta: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">
              Secondary CTA Label
            </label>
            <input
              type="text"
              maxLength={80}
              value={form.heroSecondaryCta || ''}
              onChange={(e) => setForm({ ...form, heroSecondaryCta: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <ImageUploadField
            label="Hero Studio Photo"
            value={form.heroImage || ''}
            onChange={(url) => setForm({ ...form, heroImage: url })}
            folder="site"
          />
          <ImageUploadField
            label="Homepage Print Showcase Photo"
            value={form.printingImage || ''}
            onChange={(url) => setForm({ ...form, printingImage: url })}
            folder="site"
          />
          <ImageUploadField
            label="About Page Studio Photo"
            value={form.aboutImage || ''}
            onChange={(url) => setForm({ ...form, aboutImage: url })}
            folder="site"
          />
        </div>
      </div>

      {/* 2. Contact, Hours, Maps & Social */}
      <div className="border border-neutral-200 bg-white p-6 space-y-5">
        <h3 className="font-display text-base font-bold text-[#171717] border-b border-neutral-100 pb-3">
          Contact Details, Hours, Maps &amp; Footer
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">Phone Number</label>
            <input
              type="text"
              maxLength={40}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3.5 py-2 text-sm font-mono border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">
              WhatsApp Number (digits with country code)
            </label>
            <input
              type="text"
              maxLength={40}
              value={form.whatsappNumber}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              className="w-full px-3.5 py-2 text-sm font-mono border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">Contact Email</label>
            <input
              type="email"
              maxLength={160}
              value={form.email || ''}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">
              Office Address
            </label>
            <input
              type="text"
              maxLength={300}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">
              Business Hours
            </label>
            <input
              type="text"
              maxLength={300}
              value={form.businessHours || ''}
              onChange={(e) => setForm({ ...form, businessHours: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">
              Google Maps Link URL
            </label>
            <input
              type="url"
              maxLength={1000}
              value={form.googleMapsUrl || ''}
              onChange={(e) => setForm({ ...form, googleMapsUrl: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">
              Google Maps Embed Iframe URL (Optional)
            </label>
            <input
              type="url"
              maxLength={1000}
              value={form.googleMapsEmbedUrl || ''}
              onChange={(e) => setForm({ ...form, googleMapsEmbedUrl: e.target.value })}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">Facebook URL</label>
            <input
              type="url"
              value={form.socialLinks?.facebook || ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  socialLinks: { ...(form.socialLinks || {}), facebook: e.target.value },
                })
              }
              className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">Instagram URL</label>
            <input
              type="url"
              value={form.socialLinks?.instagram || ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  socialLinks: { ...(form.socialLinks || {}), instagram: e.target.value },
                })
              }
              className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">LinkedIn URL</label>
            <input
              type="url"
              value={form.socialLinks?.linkedin || ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  socialLinks: { ...(form.socialLinks || {}), linkedin: e.target.value },
                })
              }
              className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">YouTube URL</label>
            <input
              type="url"
              value={form.socialLinks?.youtube || ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  socialLinks: { ...(form.socialLinks || {}), youtube: e.target.value },
                })
              }
              className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Footer Description
          </label>
          <textarea
            rows={2}
            maxLength={600}
            value={form.footerDescription || ''}
            onChange={(e) => setForm({ ...form, footerDescription: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
          />
        </div>
      </div>

      {/* 3. About Page Copy */}
      <div className="border border-neutral-200 bg-white p-6 space-y-4">
        <h3 className="font-display text-base font-bold text-[#171717] border-b border-neutral-100 pb-3">
          About Us Content
        </h3>
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Company Introduction
          </label>
          <textarea
            rows={3}
            maxLength={3000}
            value={form.aboutIntro || ''}
            onChange={(e) => setForm({ ...form, aboutIntro: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">Mission</label>
            <textarea
              rows={3}
              maxLength={1500}
              value={form.aboutMission || ''}
              onChange={(e) => setForm({ ...form, aboutMission: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">Vision</label>
            <textarea
              rows={3}
              maxLength={1500}
              value={form.aboutVision || ''}
              onChange={(e) => setForm({ ...form, aboutVision: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">Our Approach</label>
          <textarea
            rows={3}
            maxLength={3000}
            value={form.aboutApproach || ''}
            onChange={(e) => setForm({ ...form, aboutApproach: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
          />
        </div>
      </div>

      {/* 4. Real Team Members */}
      <div className="border border-neutral-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div>
            <h3 className="font-display text-base font-bold text-[#171717]">
              Team Members (About Page)
            </h3>
            <p className="text-xs text-neutral-500">
              Only real team members added here appear on the About page.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                teamMembers: [
                  ...(form.teamMembers || []),
                  { name: '', role: '', bio: '', photo: '' },
                ],
              })
            }
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold border border-neutral-300 hover:border-[#780033] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Team Member
          </button>
        </div>

        {(form.teamMembers || []).map((member, idx) => (
          <div key={idx} className="border border-neutral-200 p-4 space-y-3 bg-[#FAFAFA]">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-[#780033]">Member #{idx + 1}</span>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    teamMembers: (form.teamMembers || []).filter((_, i) => i !== idx),
                  })
                }
                className="text-xs text-red-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={member.name}
                onChange={(e) => {
                  const next = [...(form.teamMembers || [])];
                  next[idx] = { ...next[idx], name: e.target.value };
                  setForm({ ...form, teamMembers: next });
                }}
                className="px-3 py-2 text-sm border border-neutral-300 bg-white"
              />
              <input
                type="text"
                placeholder="Role / Title"
                value={member.role}
                onChange={(e) => {
                  const next = [...(form.teamMembers || [])];
                  next[idx] = { ...next[idx], role: e.target.value };
                  setForm({ ...form, teamMembers: next });
                }}
                className="px-3 py-2 text-sm border border-neutral-300 bg-white"
              />
            </div>
            <textarea
              rows={2}
              placeholder="Short bio"
              value={member.bio}
              onChange={(e) => {
                const next = [...(form.teamMembers || [])];
                next[idx] = { ...next[idx], bio: e.target.value };
                setForm({ ...form, teamMembers: next });
              }}
              className="w-full px-3 py-2 text-sm border border-neutral-300 bg-white"
            />
            <ImageUploadField
              label="Member Photo"
              value={member.photo || ''}
              onChange={(url) => {
                const next = [...(form.teamMembers || [])];
                next[idx] = { ...next[idx], photo: url };
                setForm({ ...form, teamMembers: next });
              }}
              folder="team"
            />
          </div>
        ))}
      </div>

      {/* 5. Real Testimonials */}
      <div className="border border-neutral-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div>
            <h3 className="font-display text-base font-bold text-[#171717]">
              Verified Client Testimonials
            </h3>
            <p className="text-xs text-neutral-500">
              Testimonials section appears on the homepage only when genuine entries exist here.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                testimonials: [
                  ...(form.testimonials || []),
                  { name: '', role: '', organization: '', quote: '', outcome: '' },
                ],
              })
            }
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold border border-neutral-300 hover:border-[#780033] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Testimonial
          </button>
        </div>

        {(form.testimonials || []).map((t, idx) => (
          <div key={idx} className="border border-neutral-200 p-4 space-y-3 bg-[#FAFAFA]">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-[#780033]">Testimonial #{idx + 1}</span>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    testimonials: (form.testimonials || []).filter((_, i) => i !== idx),
                  })
                }
                className="text-xs text-red-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Client Name"
                value={t.name}
                onChange={(e) => {
                  const next = [...(form.testimonials || [])];
                  next[idx] = { ...next[idx], name: e.target.value };
                  setForm({ ...form, testimonials: next });
                }}
                className="px-3 py-2 text-sm border border-neutral-300 bg-white"
              />
              <input
                type="text"
                placeholder="Role"
                value={t.role}
                onChange={(e) => {
                  const next = [...(form.testimonials || [])];
                  next[idx] = { ...next[idx], role: e.target.value };
                  setForm({ ...form, testimonials: next });
                }}
                className="px-3 py-2 text-sm border border-neutral-300 bg-white"
              />
              <input
                type="text"
                placeholder="Organization"
                value={t.organization}
                onChange={(e) => {
                  const next = [...(form.testimonials || [])];
                  next[idx] = { ...next[idx], organization: e.target.value };
                  setForm({ ...form, testimonials: next });
                }}
                className="px-3 py-2 text-sm border border-neutral-300 bg-white"
              />
            </div>
            <textarea
              rows={2}
              placeholder="Client quote"
              value={t.quote}
              onChange={(e) => {
                const next = [...(form.testimonials || [])];
                next[idx] = { ...next[idx], quote: e.target.value };
                setForm({ ...form, testimonials: next });
              }}
              className="w-full px-3 py-2 text-sm border border-neutral-300 bg-white"
            />
          </div>
        ))}
      </div>

      {/* 6. FAQs */}
      <div className="border border-neutral-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h3 className="font-display text-base font-bold text-[#171717]">Homepage FAQs</h3>
          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                faqs: [...(form.faqs || []), { question: '', answer: '' }],
              })
            }
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold border border-neutral-300 hover:border-[#780033] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add FAQ
          </button>
        </div>

        {(form.faqs || []).map((faq, idx) => (
          <div key={idx} className="border border-neutral-200 p-4 space-y-2.5 bg-[#FAFAFA]">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-[#780033]">FAQ #{idx + 1}</span>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    faqs: (form.faqs || []).filter((_, i) => i !== idx),
                  })
                }
                className="text-xs text-red-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
            <input
              type="text"
              placeholder="Question"
              value={faq.question}
              onChange={(e) => {
                const next = [...(form.faqs || [])];
                next[idx] = { ...next[idx], question: e.target.value };
                setForm({ ...form, faqs: next });
              }}
              className="w-full px-3 py-2 text-sm border border-neutral-300 bg-white"
            />
            <textarea
              rows={2}
              placeholder="Answer"
              value={faq.answer}
              onChange={(e) => {
                const next = [...(form.faqs || [])];
                next[idx] = { ...next[idx], answer: e.target.value };
                setForm({ ...form, faqs: next });
              }}
              className="w-full px-3 py-2 text-sm border border-neutral-300 bg-white"
            />
          </div>
        ))}
      </div>

      {/* 7. Global SEO Settings */}
      <div className="border border-neutral-200 bg-white p-6 space-y-4">
        <h3 className="font-display text-base font-bold text-[#171717] border-b border-neutral-100 pb-3">
          Global Website SEO Settings
        </h3>
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Homepage SEO Title
          </label>
          <input
            type="text"
            maxLength={160}
            value={form.seoSiteTitle || ''}
            onChange={(e) => setForm({ ...form, seoSiteTitle: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Homepage Meta Description
          </label>
          <textarea
            rows={2}
            maxLength={320}
            value={form.seoMetaDescription || ''}
            onChange={(e) => setForm({ ...form, seoMetaDescription: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
          />
        </div>
        <ImageUploadField
          label="Default Social Share (OpenGraph) Image"
          value={form.seoOgImage || ''}
          onChange={(url) => setForm({ ...form, seoOgImage: url })}
          folder="site"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={saving}
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-6 py-3 text-sm font-semibold bg-[#780033] text-white hover:bg-[#5B0027] disabled:opacity-60 cursor-pointer"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Save All Website Settings
        </button>
      </div>
    </div>
  );
}
