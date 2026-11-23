import React, { useState } from 'react';
import { Loader2, Upload, X } from 'lucide-react';
import { MediaFolder, uploadMediaFile } from '../../lib/firebase';
import { MediaImage } from '../MediaImage';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: MediaFolder;
  helperText?: string;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  folder,
  helperText,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    setProgress(0);
    try {
      const url = await uploadMediaFile(file, folder, setProgress);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-[#171717]">{label}</label>
      <div className="flex flex-col sm:flex-row gap-3 items-start">
        <div className="w-28 h-20 border border-neutral-200 bg-neutral-50 shrink-0 overflow-hidden">
          <MediaImage
            src={value}
            alt={label}
            className="w-full h-full object-cover"
            fallbackTitle="No image"
          />
        </div>
        <div className="flex-1 w-full space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border border-neutral-300 bg-white text-[#171717] hover:border-[#780033] cursor-pointer">
              {uploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-[#780033]" />
              )}
              {uploading ? `Uploading ${progress}%` : 'Upload to Firebase Storage'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
                className="hidden"
                disabled={uploading}
                onChange={handleFileChange}
              />
            </label>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1 px-2.5 py-2 text-xs text-neutral-600 hover:text-red-700 border border-neutral-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste image URL (/src/assets/... or https://...)"
            className="w-full px-3 py-1.5 text-xs border border-neutral-300 bg-white focus:outline-none focus:border-[#780033]"
          />
          {helperText && <p className="text-[11px] text-neutral-500">{helperText}</p>}
          {error && <p className="text-xs text-red-700">{error}</p>}
        </div>
      </div>
    </div>
  );
}
