'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { PageHeader, primaryButton, secondaryButton, Toast } from './ui';
import { Icon } from './icons';

interface MediaFile {
  path: string;
  name: string;
  url: string;
  createdAt?: string;
  size: number;
  type: string;
  source: 'local' | 'uploaded';
  folder?: string;
}

export default function MediaLibrary({ mode = 'page', onSelect }: { mode?: 'page' | 'picker'; onSelect?: (url: string) => void }) {
  const [images, setImages] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [tab, setTab] = useState<'local' | 'uploaded'>('local');
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchTimerRef = useRef<NodeJS.Timeout>(undefined);

  const fetchMedia = useCallback(async (offset = 0, searchTerm = '', source: 'local' | 'uploaded' = 'local') => {
    try {
      const params = new URLSearchParams();
      params.set('source', source);
      if (offset > 0) params.set('offset', String(offset));
      if (searchTerm) params.set('search', searchTerm);
      const res = await fetch(`/api/admin/media?${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      if (offset === 0) {
        setImages(data.images);
      } else {
        setImages((prev) => [...prev, ...data.images]);
      }
      setHasMore(data.hasMore);
      if (data.total !== undefined) setTotal(data.total);
    } catch {
      setToast({ message: 'Failed to load media', variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setImages([]);
    fetchMedia(0, search, tab);
  }, [fetchMedia, tab]);

  const handleSearch = (value: string) => {
    setSearch(value);
    clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setLoading(true);
      fetchMedia(0, value, tab);
    }, 180);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setToast({ message: 'Invalid file type', variant: 'error' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setToast({ message: 'File must be under 5MB', variant: 'error' });
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/media', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      setToast({ message: 'Image uploaded', variant: 'success' });
      if (tab === 'uploaded') fetchMedia(0, search, 'uploaded');
    } catch {
      setToast({ message: 'Upload failed', variant: 'error' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (img: MediaFile) => {
    if (img.source === 'local') {
      setToast({ message: 'Local project files cannot be deleted from here', variant: 'error' });
      return;
    }
    const usageRes = await fetch(`/api/admin/media?usage=${encodeURIComponent(img.name)}`);
    const usageData = await usageRes.json();
    const usedBy = usageData.usedBy || [];
    let msg = `Delete "${img.name}"?`;
    if (usedBy.length > 0) {
      msg += `\n\nWarning: This image is used in: ${usedBy.join(', ')}`;
    }
    if (!confirm(msg)) return;
    try {
      const res = await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: img.path }),
      });
      if (!res.ok) throw new Error('Delete failed');
      setImages((prev) => prev.filter((i) => i.path !== img.path));
      setToast({ message: 'Image deleted', variant: 'success' });
    } catch {
      setToast({ message: 'Delete failed', variant: 'error' });
    }
  };

  const copyPath = (p: string) => {
    navigator.clipboard.writeText(p);
    setToast({ message: 'Path copied', variant: 'success' });
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isVideo = (type: string) => type?.startsWith('video/');

  const grouped = images.reduce<Record<string, MediaFile[]>>((acc, img) => {
    const folder = img.folder || 'uploads';
    if (!acc[folder]) acc[folder] = [];
    acc[folder].push(img);
    return acc;
  }, {});

  const content = (
    <>
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4 bg-neutral-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab('local')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            tab === 'local'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          Project Files
        </button>
        <button
          onClick={() => setTab('uploaded')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            tab === 'uploaded'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          Uploaded
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Icon name="magnifying-glass" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search images..."
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
          />
        </div>
        {tab === 'local' && total > 0 && (
          <div className="flex items-center text-sm text-neutral-500 whitespace-nowrap">
            {total} files
          </div>
        )}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={primaryButton}
        >
          <Icon name="upload" className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square bg-neutral-200 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-16">
          <Icon name="photo" className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <p className="text-sm text-neutral-500">
            {tab === 'uploaded' ? 'No uploaded images yet. Click Upload to add images.' : 'No images found'}
          </p>
        </div>
      ) : tab === 'local' ? (
        <>
          {Object.entries(grouped).map(([folder, files]) => (
            <div key={folder} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="folder" className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-semibold text-neutral-700">/assets/{folder}</h3>
                <span className="text-xs text-neutral-400">({files.length})</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {files.map((img) => (
                  <MediaCard
                    key={img.path}
                    img={img}
                    mode={mode}
                    isVideo={isVideo(img.type)}
                    onSelect={onSelect}
                    onCopy={copyPath}
                    onDelete={handleDelete}
                    formatSize={formatSize}
                  />
                ))}
              </div>
            </div>
          ))}
          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={() => fetchMedia(images.length, search, tab)}
                className={secondaryButton}
              >
                Load more
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {images.map((img) => (
              <MediaCard
                key={img.path}
                img={img}
                mode={mode}
                isVideo={isVideo(img.type)}
                onSelect={onSelect}
                onCopy={copyPath}
                onDelete={handleDelete}
                formatSize={formatSize}
              />
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={() => fetchMedia(images.length, search, tab)}
                className={secondaryButton}
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </>
  );

  if (mode === 'page') {
    return (
      <div>
        <PageHeader title="Media Library" description="Browse and manage all images and videos for the website." />
        {content}
        {toast && <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
      </div>
    );
  }

  return (
    <>
      {content}
      {toast && <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </>
  );
}

function MediaCard({
  img,
  mode,
  isVideo,
  onSelect,
  onCopy,
  onDelete,
  formatSize,
}: {
  img: MediaFile;
  mode: 'page' | 'picker';
  isVideo: boolean;
  onSelect?: (url: string) => void;
  onCopy: (path: string) => void;
  onDelete: (img: MediaFile) => void;
  formatSize: (bytes: number) => string;
}) {
  return (
    <div
      className={`group relative aspect-square bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200 ${
        mode === 'picker' ? 'cursor-pointer hover:ring-2 hover:ring-emerald-500' : ''
      }`}
      onClick={mode === 'picker' ? () => onSelect?.(img.url) : undefined}
    >
      {isVideo ? (
        <div className="w-full h-full flex items-center justify-center bg-neutral-800">
          <video src={img.url} className="max-w-full max-h-full object-contain" muted preload="metadata" />
          <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
            VIDEO
          </div>
        </div>
      ) : (
        <Image
          src={img.url}
          alt={img.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          unoptimized
        />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors">
        {mode === 'page' && (
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.stopPropagation(); onCopy(img.path); }}
              className="p-1.5 bg-white rounded-md shadow-sm text-neutral-600 hover:text-neutral-900"
              title="Copy path"
            >
              <Icon name="link" className="w-3.5 h-3.5" />
            </button>
            {img.source === 'uploaded' && (
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(img); }}
                className="p-1.5 bg-white rounded-md shadow-sm text-neutral-600 hover:text-red-600"
                title="Delete"
              >
                <Icon name="trash" className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[11px] text-white truncate">{img.name}</p>
        <p className="text-[10px] text-white/70">{formatSize(img.size)}</p>
      </div>
    </div>
  );
}

export function MediaPickerDialog({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">Choose an image</h2>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-neutral-600">
            <Icon name="x-mark" className="w-5 h-5" />
          </button>
        </div>
        <MediaLibrary
          mode="picker"
          onSelect={(url) => {
            onSelect(url);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
