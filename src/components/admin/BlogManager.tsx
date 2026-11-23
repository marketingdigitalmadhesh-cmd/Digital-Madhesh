import React, { useState } from 'react';
import { deleteDoc, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { Eye, Loader2, Pencil, Plus, Trash2, X } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { BlogPost } from '../../types';
import { ImageUploadField } from './ImageUploadField';

interface BlogManagerProps {
  blogs: BlogPost[];
  loading: boolean;
}

function toSlug(val: string): string {
  return val
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 150);
}

export function BlogManager({ blogs, loading }: BlogManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Digital Marketing');
  const [author, setAuthor] = useState('Digital Madhesh Editorial');
  const [publishedAt, setPublishedAt] = useState(() => new Date().toISOString().slice(0, 10));
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [featuredImageAlt, setFeaturedImageAlt] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const openNew = () => {
    setIsCreating(true);
    setEditingId(null);
    setTitle('');
    setSlug('');
    setCategory('Digital Marketing');
    setAuthor('Digital Madhesh Editorial');
    setPublishedAt(new Date().toISOString().slice(0, 10));
    setExcerpt('');
    setContent('');
    setTagsText('');
    setFeaturedImage('');
    setFeaturedImageAlt('');
    setSeoTitle('');
    setSeoDescription('');
    setStatus('draft');
    setErrorMsg(null);
  };

  const openEdit = (post: BlogPost) => {
    setIsCreating(false);
    setEditingId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category);
    setAuthor(post.author);
    setPublishedAt(post.publishedAt || new Date().toISOString().slice(0, 10));
    setExcerpt(post.excerpt || '');
    setContent(post.content);
    setTagsText((post.tags || []).join(', '));
    setFeaturedImage(post.featuredImage || '');
    setFeaturedImageAlt(post.featuredImageAlt || '');
    setSeoTitle(post.seoTitle || '');
    setSeoDescription(post.seoDescription || '');
    setStatus(post.status);
    setErrorMsg(null);
  };

  const closeEditor = () => {
    setIsCreating(false);
    setEditingId(null);
    setErrorMsg(null);
  };

  const handleSave = async (targetStatus: 'draft' | 'published') => {
    setErrorMsg(null);
    const cleanTitle = title.trim();
    const cleanSlug = toSlug(slug || cleanTitle);
    if (cleanTitle.length < 3) {
      setErrorMsg('Title must be at least 3 characters.');
      return;
    }
    if (cleanSlug.length < 2) {
      setErrorMsg('Please provide a valid URL slug.');
      return;
    }
    if (content.trim().length < 10) {
      setErrorMsg('Article content must be at least 10 characters.');
      return;
    }

    setSaving(true);
    const tags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 10);

    const basePayload = {
      title: cleanTitle.slice(0, 200),
      slug: cleanSlug,
      excerpt: excerpt.trim().slice(0, 500),
      content: content.trim().slice(0, 50000),
      category: category.trim().slice(0, 80) || 'Digital Marketing',
      tags,
      author: author.trim().slice(0, 100) || 'Digital Madhesh Editorial',
      featuredImage: featuredImage.trim().slice(0, 1000),
      featuredImageAlt: featuredImageAlt.trim().slice(0, 240),
      status: targetStatus,
      publishedAt: publishedAt.trim().slice(0, 40),
      seoTitle: (seoTitle.trim() || cleanTitle).slice(0, 160),
      seoDescription: (seoDescription.trim() || excerpt.trim()).slice(0, 320),
      updatedAt: serverTimestamp(),
    };

    try {
      if (isCreating) {
        const docId = `${cleanSlug}-${Date.now()}`.slice(0, 120);
        await setDoc(doc(db, 'blogs', docId), {
          ...basePayload,
          createdAt: serverTimestamp(),
        });
      } else if (editingId) {
        await updateDoc(doc(db, 'blogs', editingId), basePayload);
      }
      closeEditor();
    } catch (err) {
      handleFirestoreError(err, isCreating ? OperationType.CREATE : OperationType.UPDATE, 'blogs');
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    const nextStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      await updateDoc(doc(db, 'blogs', post.id), {
        status: nextStatus,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `blogs/${post.id}`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'blogs', id));
      if (editingId === id) closeEditor();
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `blogs/${id}`);
    }
  };

  if (isCreating || editingId) {
    return (
      <div className="border border-neutral-200 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <h2 className="font-display text-xl font-bold text-[#171717]">
            {isCreating ? 'New Blog Post' : 'Edit Blog Post'}
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
              Post Title *
            </label>
            <input
              type="text"
              maxLength={200}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (isCreating && !slug) {
                  setSlug(toSlug(e.target.value));
                }
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
              placeholder="meta-ads-guide-madhesh"
              className="w-full px-3.5 py-2 text-sm font-mono border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">Category *</label>
            <input
              type="text"
              maxLength={80}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">Author *</label>
            <input
              type="text"
              maxLength={100}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">
              Publication Date
            </label>
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="w-full px-3.5 py-2 text-sm font-mono border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
        </div>

        <ImageUploadField
          label="Featured Image"
          value={featuredImage}
          onChange={setFeaturedImage}
          folder="blogs"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">
              Featured Image Alt Text
            </label>
            <input
              type="text"
              maxLength={240}
              value={featuredImageAlt}
              onChange={(e) => setFeaturedImageAlt(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#171717] mb-1.5">
              Tags (comma separated, max 10)
            </label>
            <input
              type="text"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="Meta Ads, Sarlahi, Lead Generation"
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1.5">Excerpt</label>
          <textarea
            rows={2}
            maxLength={500}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-3.5 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#171717] mb-1.5">
            Article Body * (Use ## for headings, - for bullets, blank lines for paragraphs)
          </label>
          <textarea
            rows={12}
            maxLength={50000}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 focus:outline-none focus:border-[#780033] font-sans"
          />
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

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('published')}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-[#780033] text-white hover:bg-[#5B0027] disabled:opacity-60 cursor-pointer"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {status === 'published' ? 'Update Published Post' : 'Publish Post'}
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
          <h2 className="font-display text-xl font-bold text-[#171717]">Blog CMS</h2>
          <p className="text-sm text-neutral-600">
            Create, draft, publish, and manage articles with SEO metadata and Article schema.
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-[#780033] text-white hover:bg-[#5B0027] cursor-pointer whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Blog Post
        </button>
      </div>

      <div className="border border-neutral-200 bg-white overflow-x-auto">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-10 bg-neutral-100 animate-pulse" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <p className="text-sm text-neutral-600">No blog posts created yet.</p>
            <button
              type="button"
              onClick={openNew}
              className="px-4 py-2 text-xs font-semibold bg-[#780033] text-white cursor-pointer"
            >
              Create First Article
            </button>
          </div>
        ) : (
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-[#FAFAFA] text-xs text-neutral-500">
                <th className="py-2.5 px-4 font-medium">Title</th>
                <th className="py-2.5 px-4 font-medium">Category</th>
                <th className="py-2.5 px-4 font-medium">Author</th>
                <th className="py-2.5 px-4 font-medium">Status</th>
                <th className="py-2.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {blogs.map((post) => (
                <tr key={post.id} className="hover:bg-neutral-50">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-[#171717]">{post.title}</p>
                    <p className="font-mono text-xs text-neutral-500">/blog/{post.slug}</p>
                  </td>
                  <td className="py-3 px-4 text-xs text-neutral-700">{post.category}</td>
                  <td className="py-3 px-4 text-xs text-neutral-700">{post.author}</td>
                  <td className="py-3 px-4 text-xs font-semibold">
                    <span
                      className={
                        post.status === 'published' ? 'text-emerald-700' : 'text-amber-700'
                      }
                    >
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      {post.status === 'published' && (
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-neutral-500 hover:text-[#171717]"
                          title="View public article"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => togglePublish(post)}
                        className="px-2.5 py-1 text-xs border border-neutral-300 hover:border-[#780033] cursor-pointer"
                      >
                        {post.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEdit(post)}
                        className="p-1.5 text-neutral-600 hover:text-[#780033] cursor-pointer"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
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
