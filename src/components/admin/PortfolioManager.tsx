import React, { useState } from 'react';
import { deleteDoc, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { Eye, Loader2, Pencil, Plus, Trash2, Upload, X } from 'lucide-react';
import { db, handleFirestoreError, OperationType, uploadMediaFile } from '../../lib/firebase';
import { PortfolioProject, ProjectType } from '../../types';
import { ImageUploadField } from './ImageUploadField';

interface PortfolioManagerProps {
  projects: PortfolioProject[];
  loading: boolean;
}

const CATEGORIES = [
  'Digital Marketing',
  'Creative Design',
  'Website & Tracking',
  'Printing & Advertising',
];

function toSlug(val: string): string {
  return val
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 150);
}

export function PortfolioManager({ projects, loading }: PortfolioManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Digital Marketing');
  const [projectType, setProjectType] = useState<ProjectType>('digital');
  const [clientName, setClientName] = useState('');
  const [location, setLocation] = useState('');
  const [servicesText, setServicesText] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverImageAlt, setCoverImageAlt] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [summary, setSummary] = useState('');
  const [overview, setOverview] = useState('');
  const [clientBackground, setClientBackground] = useState('');
  const [challenge, setChallenge] = useState('');
  const [objective, setObjective] = useState('');
  const [strategy, setStrategy] = useState('');
  const [execution, setExecution] = useState('');
  const [results, setResults] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [printSpecs, setPrintSpecs] = useState('');
  const [metricsText, setMetricsText] = useState('');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const openNew = () => {
    setIsCreating(true);
    setEditingId(null);
    setTitle('');
    setSlug('');
    setCategory('Digital Marketing');
    setProjectType('digital');
    setClientName('');
    setLocation('');
    setServicesText('');
    setCoverImage('');
    setCoverImageAlt('');
    setGalleryImages([]);
    setSummary('');
    setOverview('');
    setClientBackground('');
    setChallenge('');
    setObjective('');
    setStrategy('');
    setExecution('');
    setResults('');
    setConclusion('');
    setPrintSpecs('');
    setMetricsText('');
    setFeatured(false);
    setStatus('draft');
    setSeoTitle('');
    setSeoDescription('');
    setErrorMsg(null);
  };

  const openEdit = (p: PortfolioProject) => {
    setIsCreating(false);
    setEditingId(p.id);
    setTitle(p.title);
    setSlug(p.slug);
    setCategory(p.category);
    setProjectType(p.projectType);
    setClientName(p.clientName || '');
    setLocation(p.location || '');
    setServicesText((p.servicesProvided || []).join(', '));
    setCoverImage(p.coverImage || '');
    setCoverImageAlt(p.coverImageAlt || '');
    setGalleryImages(p.galleryImages || []);
    setSummary(p.summary);
    setOverview(p.overview || '');
    setClientBackground(p.clientBackground || '');
    setChallenge(p.challenge || '');
    setObjective(p.objective || '');
    setStrategy(p.strategy || '');
    setExecution(p.execution || '');
    setResults(p.results || '');
    setConclusion(p.conclusion || '');
    setPrintSpecs(p.printSpecs || '');
    setMetricsText((p.metrics || []).join('\n'));
    setFeatured(Boolean(p.featured));
    setStatus(p.status);
    setSeoTitle(p.seoTitle || '');
    setSeoDescription(p.seoDescription || '');
    setErrorMsg(null);
  };

  const closeEditor = () => {
    setIsCreating(false);
    setEditingId(null);
    setErrorMsg(null);
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadingGallery(true);
    setErrorMsg(null);
    try {
      const uploaded: string[] = [];
      for (const file of files.slice(0, 12 - galleryImages.length)) {
        const url = await uploadMediaFile(file, 'portfolio');
        uploaded.push(url);
      }
      setGalleryImages((prev) => [...prev, ...uploaded].slice(0, 12));
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gallery upload failed.');
    } finally {
      setUploadingGallery(false);
      e.target.value = '';
    }
  };

  const handleSave = async (targetStatus: 'draft' | 'published') => {
    setErrorMsg(null);
    const cleanTitle = title.trim();
    const cleanSlug = toSlug(slug || cleanTitle);
    if (cleanTitle.length < 3) {
      setErrorMsg('Project title must be at least 3 characters.');
      return;
    }
    if (cleanSlug.length < 2) {
      setErrorMsg('Please provide a valid URL slug.');
      return;
    }
    if (summary.trim().length < 5) {
      setErrorMsg('Summary must be at least 5 characters.');
      return;
    }

    setSaving(true);
    const servicesProvided = servicesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 15);
    const metrics = metricsText
      .split('\n')
      .map((m) => m.trim())
      .filter(Boolean)
      .slice(0, 8);

    const payload = {
      title: cleanTitle.slice(0, 200),
      slug: cleanSlug,
      category,
      projectType,
      clientName: clientName.trim().slice(0, 160),
      location: location.trim().slice(0, 160),
      servicesProvided,
      coverImage: coverImage.trim().slice(0, 1000),
      coverImageAlt: coverImageAlt.trim().slice(0, 240),
      galleryImages: galleryImages.slice(0, 12),
      summary: summary.trim().slice(0, 600),
      overview: overview.trim().slice(0, 5000),
      clientBackground: clientBackground.trim().slice(0, 5000),
      challenge: challenge.trim().slice(0, 5000),
      objective: objective.trim().slice(0, 5000),
      strategy: strategy.trim().slice(0, 5000),
      execution: execution.trim().slice(0, 5000),
      results: results.trim().slice(0, 5000),
      conclusion: conclusion.trim().slice(0, 5000),
      printSpecs: printSpecs.trim().slice(0, 3000),
      metrics,
      featured,
      status: targetStatus,
      seoTitle: (seoTitle.trim() || cleanTitle).slice(0, 160),
      seoDescription: (seoDescription.trim() || summary.trim()).slice(0, 320),
      updatedAt: serverTimestamp(),
    };

    try {
      if (isCreating) {
        const docId = `${cleanSlug}-${Date.now()}`.slice(0, 120);
        await setDoc(doc(db, 'projects', docId), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      } else if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), payload);
      }
      closeEditor();
    } catch (err) {
      handleFirestoreError(err, isCreating ? OperationType.CREATE : OperationType.UPDATE, 'projects');
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (p: PortfolioProject) => {
    const nextStatus = p.status === 'published' ? 'draft' : 'published';
    try {
      await updateDoc(doc(db, 'projects', p.id), {
        status: nextStatus,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `projects/${p.id}`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      if (editingId === id) closeEditor();
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `projects/${id}`);
    }
  };

  if (isCreating || editingId) {
    return (
      <div className="border border-neutral-200 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <h2 className="font-display text-xl font-bold text-[#171717]">
            {isCreating ? 'New Portfolio Project / Case Study' : 'Edit Portfolio Project'}
          </h2>
          <button
            type="button"
            onClick={closeEditor}
            className="p-2 text-neutral-500 hover:text-[#171717] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
              maxLength={200}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (isCreating && !slug) setSlug(toSlug(e.target.value));
              }}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">
              URL Slug *
            </label>
            <input
              type="text"
              maxLength={160}
              value={slug}
              onChange={(e) => setSlug(toSlug(e.target.value))}
              className="w-full px-3.5 py-2 text-sm font-mono border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-neutral-300 bg-white focus:outline-none focus:border-[#780033]"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">
              Project Type *
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value as ProjectType)}
              className="w-full px-3 py-2 text-sm border border-neutral-300 bg-white focus:outline-none focus:border-[#780033]"
            >
              <option value="digital">Digital Marketing</option>
              <option value="printing">Printing &amp; Signage</option>
              <option value="web">Website &amp; Tracking</option>
              <option value="creative">Creative &amp; Video</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">
              Client Name (Optional)
            </label>
            <input
              type="text"
              maxLength={160}
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">
              Location (Optional)
            </label>
            <input
              type="text"
              maxLength={160}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Harion, Sarlahi"
              className="w-full px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">
              Services Provided (comma separated)
            </label>
            <input
              type="text"
              value={servicesText}
              onChange={(e) => setServicesText(e.target.value)}
              placeholder="Meta Ads, Landing Page, Flex Printing"
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <input
              id="featuredProject"
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 accent-[#780033]"
            />
            <label htmlFor="featuredProject" className="text-sm font-medium text-[#171717]">
              Feature this project on the Homepage
            </label>
          </div>
        </div>

        <ImageUploadField
          label="Cover Image"
          value={coverImage}
          onChange={setCoverImage}
          folder="portfolio"
        />

        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1.5">
            Cover Image Alt Text
          </label>
          <input
            type="text"
            maxLength={240}
            value={coverImageAlt}
            onChange={(e) => setCoverImageAlt(e.target.value)}
            className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
          />
        </div>

        {/* Multi-image gallery */}
        <div className="space-y-2 border border-neutral-200 p-4 bg-[#FAFAFA]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#171717]">
              Gallery Images ({galleryImages.length}/12)
            </label>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-neutral-300 bg-white hover:border-[#780033] cursor-pointer">
              {uploadingGallery ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-[#780033]" />
              )}
              Upload Gallery Images
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="hidden"
                disabled={uploadingGallery}
                onChange={handleGalleryUpload}
              />
            </label>
          </div>
          {galleryImages.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-2">
              {galleryImages.map((url, idx) => (
                <div key={idx} className="relative border border-neutral-200 bg-white">
                  <img src={url} alt="" className="w-full h-16 object-cover" />
                  <button
                    type="button"
                    onClick={() =>
                      setGalleryImages((prev) => prev.filter((_, i) => i !== idx))
                    }
                    className="absolute top-1 right-1 bg-white/90 p-0.5 text-red-700 cursor-pointer"
                    title="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1.5">
            Short Summary * (Shown on portfolio cards)
          </label>
          <textarea
            rows={2}
            maxLength={600}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
          />
        </div>

        {/* Structured Case Study Fields */}
        <div className="border-t border-neutral-200 pt-5 space-y-4">
          <h3 className="font-display text-base font-bold text-[#171717]">
            Case Study Sections
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">
                Project Overview
              </label>
              <textarea
                rows={3}
                maxLength={5000}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">
                Client or Business Background
              </label>
              <textarea
                rows={3}
                maxLength={5000}
                value={clientBackground}
                onChange={(e) => setClientBackground(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">Challenge</label>
              <textarea
                rows={3}
                maxLength={5000}
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">Objective</label>
              <textarea
                rows={3}
                maxLength={5000}
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">Strategy</label>
              <textarea
                rows={3}
                maxLength={5000}
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">
                Work and Execution
              </label>
              <textarea
                rows={3}
                maxLength={5000}
                value={execution}
                onChange={(e) => setExecution(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">Results</label>
              <textarea
                rows={3}
                maxLength={5000}
                value={results}
                onChange={(e) => setResults(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">Conclusion</label>
              <textarea
                rows={3}
                maxLength={5000}
                value={conclusion}
                onChange={(e) => setConclusion(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">
              Printing Specifications (For printing projects: paper/media, size, finish)
            </label>
            <textarea
              rows={3}
              maxLength={3000}
              value={printSpecs}
              onChange={(e) => setPrintSpecs(e.target.value)}
              placeholder="e.g., 300 GSM matte laminated card, size A4, wooden frame..."
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">
              Verified Results / Metrics (1 per line — leave blank if unavailable; never invent metrics)
            </label>
            <textarea
              rows={3}
              value={metricsText}
              onChange={(e) => setMetricsText(e.target.value)}
              placeholder="Only enter real verified metrics..."
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">SEO Title</label>
            <input
              type="text"
              maxLength={160}
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">
              SEO Description
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

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('published')}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-[#780033] text-white hover:bg-[#5B0027] disabled:opacity-60 cursor-pointer"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {status === 'published' ? 'Update Published Project' : 'Publish Project'}
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('draft')}
            className="px-5 py-2.5 text-sm font-semibold border border-neutral-300 text-[#171717] hover:border-[#171717] cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={closeEditor}
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
          <h2 className="font-display text-xl font-bold text-[#171717]">
            Portfolio &amp; Case Study CMS
          </h2>
          <p className="text-sm text-neutral-600">
            Publish digital marketing case studies, website projects, and printing showcases.
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-[#780033] text-white hover:bg-[#5B0027] cursor-pointer whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      <div className="border border-neutral-200 bg-white overflow-x-auto">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-10 bg-neutral-100 animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <p className="text-sm text-neutral-600">No portfolio projects added yet.</p>
            <button
              type="button"
              onClick={openNew}
              className="px-4 py-2 text-xs font-semibold bg-[#780033] text-white cursor-pointer"
            >
              Add First Project
            </button>
          </div>
        ) : (
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-[#FAFAFA] text-xs text-neutral-500">
                <th className="py-2.5 px-4 font-medium">Project</th>
                <th className="py-2.5 px-4 font-medium">Category</th>
                <th className="py-2.5 px-4 font-medium">Client / Location</th>
                <th className="py-2.5 px-4 font-medium">Status</th>
                <th className="py-2.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-[#171717]">
                      {p.title}{' '}
                      {p.featured && (
                        <span className="text-[11px] font-normal text-[#780033]">· Featured</span>
                      )}
                    </p>
                    <p className="font-mono text-xs text-neutral-500">/portfolio/{p.slug}</p>
                  </td>
                  <td className="py-3 px-4 text-xs text-neutral-700">{p.category}</td>
                  <td className="py-3 px-4 text-xs text-neutral-600">
                    {[p.clientName, p.location].filter(Boolean).join(' · ') || '—'}
                  </td>
                  <td className="py-3 px-4 text-xs font-semibold">
                    <span
                      className={p.status === 'published' ? 'text-emerald-700' : 'text-amber-700'}
                    >
                      {p.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      {p.status === 'published' && (
                        <a
                          href={`/portfolio/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-neutral-500 hover:text-[#171717]"
                          title="View public project"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => togglePublish(p)}
                        className="px-2.5 py-1 text-xs border border-neutral-300 hover:border-[#780033] cursor-pointer"
                      >
                        {p.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEdit(p)}
                        className="p-1.5 text-neutral-600 hover:text-[#780033] cursor-pointer"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 text-neutral-500 hover:text-red-700 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
