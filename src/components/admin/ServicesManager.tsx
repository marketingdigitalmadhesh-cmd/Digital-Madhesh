import { useState } from 'react';
import { doc, serverTimestamp, setDoc, writeBatch } from 'firebase/firestore';
import { Loader2, Pencil, RefreshCw, X } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { DEFAULT_SERVICES } from '../../data/defaultServices';
import { ServiceCategory, ServiceItem } from '../../types';
import { ImageUploadField } from './ImageUploadField';

interface ServicesManagerProps {
  services: ServiceItem[];
  isFromDb: boolean;
}

const CATEGORIES: ServiceCategory[] = [
  'Digital Marketing',
  'Creative Services',
  'Website and Tracking',
  'Printing and Advertising',
];

export function ServicesManager({ services, isFromDb }: ServicesManagerProps) {
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('Digital Marketing');
  const [shortDescription, setShortDescription] = useState('');
  const [heroDescription, setHeroDescription] = useState('');
  const [overview, setOverview] = useState('');
  const [benefitsText, setBenefitsText] = useState('');
  const [deliverablesText, setDeliverablesText] = useState('');
  const [image, setImage] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [active, setActive] = useState(true);

  const openEdit = (svc: ServiceItem) => {
    setEditing(svc);
    setTitle(svc.title);
    setCategory(svc.category);
    setShortDescription(svc.shortDescription);
    setHeroDescription(svc.heroDescription || '');
    setOverview(svc.overview || '');
    setBenefitsText((svc.benefits || []).join('\n'));
    setDeliverablesText((svc.deliverables || []).join('\n'));
    setImage(svc.image || '');
    setImageAlt(svc.imageAlt || '');
    setSeoTitle(svc.seoTitle || '');
    setSeoDescription(svc.seoDescription || '');
    setActive(svc.active);
    setFeedback(null);
  };

  const syncDefaultsToFirestore = async () => {
    setSyncing(true);
    setFeedback(null);
    try {
      const batch = writeBatch(db);
      DEFAULT_SERVICES.forEach((svc) => {
        const ref = doc(db, 'services', svc.slug);
        batch.set(ref, {
          title: svc.title,
          slug: svc.slug,
          category: svc.category,
          shortDescription: svc.shortDescription,
          heroDescription: svc.heroDescription || '',
          overview: svc.overview || '',
          benefits: svc.benefits || [],
          deliverables: svc.deliverables || [],
          faqs: svc.faqs || [],
          image: svc.image || '',
          imageAlt: svc.imageAlt || svc.title,
          relatedSlugs: svc.relatedSlugs || [],
          seoTitle: svc.seoTitle || '',
          seoDescription: svc.seoDescription || '',
          sortOrder: svc.sortOrder ?? 100,
          active: svc.active,
          updatedAt: serverTimestamp(),
        });
      });
      await batch.commit();
      setFeedback('All 31 services synced to Cloud Firestore.');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'services');
    } finally {
      setSyncing(false);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setFeedback(null);
    const docPath = `services/${editing.slug}`;
    try {
      await setDoc(doc(db, 'services', editing.slug), {
        title: title.trim().slice(0, 160),
        slug: editing.slug,
        category,
        shortDescription: shortDescription.trim().slice(0, 500),
        heroDescription: heroDescription.trim().slice(0, 1000),
        overview: overview.trim().slice(0, 6000),
        benefits: benefitsText
          .split('\n')
          .map((b) => b.trim())
          .filter(Boolean)
          .slice(0, 12),
        deliverables: deliverablesText
          .split('\n')
          .map((d) => d.trim())
          .filter(Boolean)
          .slice(0, 15),
        faqs: editing.faqs || [],
        image: image.trim().slice(0, 1000),
        imageAlt: imageAlt.trim().slice(0, 240),
        relatedSlugs: editing.relatedSlugs || [],
        seoTitle: seoTitle.trim().slice(0, 160),
        seoDescription: seoDescription.trim().slice(0, 320),
        sortOrder: editing.sortOrder ?? 100,
        active,
        updatedAt: serverTimestamp(),
      });
      setEditing(null);
      setFeedback(`Updated "${title.trim()}".`);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, docPath);
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <div className="border border-neutral-200 bg-white p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <h2 className="font-display text-xl font-bold text-[#171717]">
            Edit Service: {editing.title}
          </h2>
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="p-2 text-neutral-500 hover:text-[#171717] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">Title</label>
            <input
              type="text"
              maxLength={160}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ServiceCategory)}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 bg-white focus:outline-none focus:border-[#780033]"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ImageUploadField
          label="Service Visual"
          value={image}
          onChange={setImage}
          folder="services"
        />

        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">Image Alt Text</label>
          <input
            type="text"
            maxLength={240}
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Short Card Description
          </label>
          <textarea
            rows={2}
            maxLength={500}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Hero Lead Description
          </label>
          <textarea
            rows={2}
            maxLength={1000}
            value={heroDescription}
            onChange={(e) => setHeroDescription(e.target.value)}
            className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1">
            Detailed Overview
          </label>
          <textarea
            rows={4}
            maxLength={6000}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">
              Benefits (1 per line, max 12)
            </label>
            <textarea
              rows={4}
              value={benefitsText}
              onChange={(e) => setBenefitsText(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">
              Deliverables (1 per line, max 15)
            </label>
            <textarea
              rows={4}
              value={deliverablesText}
              onChange={(e) => setDeliverablesText(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">SEO Title</label>
            <input
              type="text"
              maxLength={160}
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1">
              SEO Meta Description
            </label>
            <input
              type="text"
              maxLength={320}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="serviceActive"
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="w-4 h-4 accent-[#780033]"
          />
          <label htmlFor="serviceActive" className="text-sm font-medium text-[#171717]">
            Visible publicly on Services pages
          </label>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-[#780033] text-white hover:bg-[#5B0027] disabled:opacity-60 cursor-pointer"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Service
          </button>
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="px-4 py-2.5 text-sm text-neutral-600 hover:text-[#171717] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-[#171717]">Services Manager</h2>
          <p className="text-sm text-neutral-600">
            Customize copy, deliverables, SEO metadata, and imagery for all 31 agency services.
          </p>
        </div>
        <button
          type="button"
          disabled={syncing}
          onClick={syncDefaultsToFirestore}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border border-[#780033] text-[#780033] hover:bg-[#FDF5F8] cursor-pointer whitespace-nowrap shrink-0"
        >
          {syncing ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <RefreshCw className="w-3.5 h-3.5" />
          )}
          {isFromDb ? 'Re-sync Default Catalog to Firestore' : 'Initialize 31 Services in Firestore'}
        </button>
      </div>

      {feedback && (
        <div className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800">
          {feedback}
        </div>
      )}

      <div className="border border-neutral-200 bg-white overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-[#FAFAFA] text-xs text-neutral-500">
              <th className="py-2.5 px-4 font-medium">Service</th>
              <th className="py-2.5 px-4 font-medium">Category</th>
              <th className="py-2.5 px-4 font-medium">URL</th>
              <th className="py-2.5 px-4 font-medium text-right">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {services.map((svc) => (
              <tr key={svc.slug} className="hover:bg-neutral-50">
                <td className="py-2.5 px-4 font-medium text-[#171717]">{svc.title}</td>
                <td className="py-2.5 px-4 text-xs text-neutral-600">{svc.category}</td>
                <td className="py-2.5 px-4 font-mono text-xs text-neutral-500">
                  /services/{svc.slug}
                </td>
                <td className="py-2.5 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => openEdit(svc)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs border border-neutral-300 hover:border-[#780033] cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
