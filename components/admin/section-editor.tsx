'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getSection, type SectionValues } from '@/lib/admin/sections';
import { PageHeader, Toast, primaryButton, secondaryButton, Skeleton } from './ui';
import { Icon } from './icons';
import { FieldRenderer } from './fields';

export default function SectionEditor({ slug }: { slug: string }) {
  const sectionDef = getSection(slug);
  const [values, setValues] = useState<SectionValues>({});
  const [savedValues, setSavedValues] = useState<SectionValues>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' } | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const isDirty = JSON.stringify(values) !== JSON.stringify(savedValues);

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/content/${slug}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const merged = { ...(sectionDef?.defaults || {}), ...data.values };
      setValues(merged);
      setSavedValues(merged);
      if (data.updatedAt) setLastSaved(data.updatedAt);
    } catch {
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  }, [slug, sectionDef?.defaults]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/content/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Save failed');
      }
      const data = await res.json();
      const merged = { ...(sectionDef?.defaults || {}), ...data.values };
      setValues(merged);
      setSavedValues(merged);
      setLastSaved(new Date().toISOString());
      setToast({ message: 'Changes saved', variant: 'success' });
    } catch (err: any) {
      setToast({ message: err.message, variant: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setValues(savedValues);
  };

  const handleReset = async () => {
    if (!confirm('Reset this section to its default content? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/admin/content/${slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Reset failed');
      const data = await res.json();
      setValues(data.values);
      setSavedValues(data.values);
      setToast({ message: 'Reset to defaults', variant: 'success' });
    } catch (err: any) {
      setToast({ message: err.message, variant: 'error' });
    }
  };

  const updateValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  if (!sectionDef) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-neutral-500">Section not found</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-96 mb-8" />
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-red-600 mb-4">{error}</p>
        <button onClick={fetchContent} className={secondaryButton}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <PageHeader title={sectionDef.title} description={sectionDef.description}>
        {lastSaved && (
          <span className="text-xs text-neutral-400">
            Last saved{' '}
            {new Date(lastSaved).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </span>
        )}
        <a
          href={sectionDef.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
        >
          <Icon name="eye" className="w-3.5 h-3.5" />
          View on site
        </a>
      </PageHeader>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          {sectionDef.fields.map((field, idx) => {
            if (field.type === 'heading') {
              return (
                <div key={idx} className="col-span-1 sm:col-span-2 pt-4 first:pt-0">
                  <h3 className="text-sm font-semibold text-neutral-900 border-b border-neutral-200 pb-2">
                    {field.label}
                  </h3>
                  {field.help && (
                    <p className="text-xs text-neutral-500 mt-1">{field.help}</p>
                  )}
                </div>
              );
            }

            const span = field.span ?? 2;
            return (
              <div
                key={'name' in field ? field.name : idx}
                className={span === 2 ? 'col-span-1 sm:col-span-2' : 'col-span-1'}
              >
                <FieldRenderer
                  field={field}
                  value={'name' in field ? values[field.name] : undefined}
                  onChange={(val) => {
                    if ('name' in field) updateValue(field.name, val);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-white border-t border-neutral-200 px-3 sm:px-6 py-2.5 sm:py-3 z-20">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={handleSave}
            disabled={!isDirty || saving}
            className={primaryButton}
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Icon name="check" className="w-4 h-4" />
            )}
            Save changes
          </button>
          <button
            onClick={handleDiscard}
            disabled={!isDirty}
            className={secondaryButton}
          >
            Discard
          </button>
          <button
            onClick={handleReset}
            className="ml-auto text-xs text-neutral-500 hover:text-red-600 transition-colors whitespace-nowrap"
          >
            Reset to original
          </button>
        </div>
        {isDirty && (
          <p className="max-w-5xl mx-auto text-[11px] text-amber-600 mt-1">
            Saved content is live on the website.
          </p>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
