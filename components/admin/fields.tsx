'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import type {
  FieldDef,
  TextFieldDef,
  TextareaFieldDef,
  NumberFieldDef,
  ImageFieldDef,
  IconFieldDef,
  ColorFieldDef,
  StringListFieldDef,
  ObjectListFieldDef,
  ListItem,
} from '@/lib/admin/sections';
import { inputClass } from './ui';
import { Icon, ICON_CHOICES } from './icons';

interface FieldRendererProps {
  field: FieldDef;
  value: any;
  onChange: (value: any) => void;
}

export function FieldRenderer({ field, value, onChange }: FieldRendererProps) {
  if (field.type === 'heading') return null;

  switch (field.type) {
    case 'text':
      return <TextField field={field} value={value ?? ''} onChange={onChange} />;
    case 'textarea':
      return <TextareaField field={field} value={value ?? ''} onChange={onChange} />;
    case 'number':
      return <NumberField field={field} value={value ?? 0} onChange={onChange} />;
    case 'image':
      return <ImageField field={field} value={value ?? ''} onChange={onChange} />;
    case 'icon':
      return <IconField field={field} value={value ?? ''} onChange={onChange} />;
    case 'color':
      return <ColorField field={field} value={value ?? '#000000'} onChange={onChange} />;
    case 'stringList':
      return <StringListField field={field} value={value ?? []} onChange={onChange} />;
    case 'objectList':
      return <ObjectListField field={field} value={value ?? []} onChange={onChange} />;
    default:
      return null;
  }
}

function FieldLabel({ field }: { field: { label: string; help?: string; optional?: boolean } }) {
  return (
    <div className="mb-1.5">
      <label className="block text-sm font-medium text-neutral-700">
        {field.label}
        {field.optional && (
          <span className="text-neutral-400 font-normal ml-1">(optional)</span>
        )}
      </label>
      {field.help && <p className="text-xs text-neutral-500 mt-0.5">{field.help}</p>}
    </div>
  );
}

function TextField({
  field,
  value,
  onChange,
}: {
  field: TextFieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel field={field} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={inputClass}
      />
    </div>
  );
}

function TextareaField({
  field,
  value,
  onChange,
}: {
  field: TextareaFieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel field={field} />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={field.rows ?? 3}
        placeholder={field.placeholder}
        className={`${inputClass} resize-y`}
      />
    </div>
  );
}

function NumberField({
  field,
  value,
  onChange,
}: {
  field: NumberFieldDef;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <FieldLabel field={field} />
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          if (isFinite(v) && v >= 0) onChange(v);
        }}
        className={inputClass}
      />
    </div>
  );
}

function ImageField({
  field,
  value,
  onChange,
}: {
  field: ImageFieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPEG, PNG, WebP, or SVG file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File must be under 5MB.');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      onChange(data.url);
    } catch {
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const fit = field.fit ?? 'cover';
  const isExternal = value && (value.startsWith('http://') || value.startsWith('https://'));

  return (
    <div>
      <FieldLabel field={field} />
      {value ? (
        <div className="space-y-2">
          <div
            className={`relative overflow-hidden border border-neutral-200 bg-neutral-100 ${
              fit === 'avatar'
                ? 'w-16 h-16 rounded-full'
                : 'w-full h-40 rounded-lg'
            }`}
          >
            {isExternal ? (
              <Image
                src={value}
                alt={field.label}
                fill
                className={fit === 'contain' ? 'object-contain' : 'object-cover'}
                sizes="400px"
                unoptimized
              />
            ) : (
              <Image
                src={value}
                alt={field.label}
                fill
                className={fit === 'contain' ? 'object-contain' : 'object-cover'}
                sizes="400px"
              />
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-neutral-600 hover:text-neutral-900 underline"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Replace'}
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-xs text-red-500 hover:text-red-700 underline"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-3 py-2 text-sm border border-dashed border-neutral-300 rounded-lg text-neutral-600 hover:border-neutral-400 hover:text-neutral-800 transition-colors"
        >
          {uploading ? 'Uploading...' : 'Upload image'}
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}

function IconField({
  field,
  value,
  onChange,
}: {
  field: IconFieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel field={field} />
      <div className="flex items-center gap-3">
        {value && (
          <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center">
            <Icon name={value} className="w-5 h-5 text-neutral-600" />
          </div>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          <option value="">Select an icon</option>
          {ICON_CHOICES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function ColorField({
  field,
  value,
  onChange,
}: {
  field: ColorFieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel field={field} />
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-lg border border-neutral-300 cursor-pointer p-0.5"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v);
          }}
          placeholder="#000000"
          className={`${inputClass} max-w-[120px]`}
        />
      </div>
    </div>
  );
}

function StringListField({
  field,
  value,
  onChange,
}: {
  field: StringListFieldDef;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const add = () => onChange([...value, '']);
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const update = (i: number, v: string) =>
    onChange(value.map((item, idx) => (idx === i ? v : item)));

  const handleDragStart = (i: number) => setDragIdx(i);
  const handleDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    setOverIdx(i);
  };
  const handleDrop = (i: number) => {
    if (dragIdx === null || dragIdx === i) return;
    const copy = [...value];
    const [moved] = copy.splice(dragIdx, 1);
    copy.splice(i, 0, moved);
    onChange(copy);
    setDragIdx(null);
    setOverIdx(null);
  };
  const handleDragEnd = () => {
    setDragIdx(null);
    setOverIdx(null);
  };

  const canRemove = !field.min || value.length > field.min;
  const canAdd = !field.max || value.length < field.max;

  return (
    <div>
      <FieldLabel field={field} />
      <div className="space-y-2">
        {value.map((item, i) => (
          <div
            key={i}
            className={`${
              overIdx === i ? 'border-t-2 border-emerald-500' : ''
            }`}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => handleDragOver(e, i)}
            onDrop={() => handleDrop(i)}
            onDragEnd={handleDragEnd}
          >
            {field.variant === 'image' && item && (
              <div className="mb-1.5 relative w-full h-28 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50">
                <Image
                  src={item}
                  alt={`Image ${i + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="cursor-grab text-neutral-400 hover:text-neutral-600">
                <Icon name="grip-vertical" className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={item}
                onChange={(e) => update(i, e.target.value)}
                placeholder={field.placeholder}
                className={`${inputClass} flex-1`}
              />
              {canRemove && (
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <Icon name="trash" className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {canAdd && (
        <button
          type="button"
          onClick={add}
          className="mt-2 flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
        >
          <Icon name="plus" className="w-4 h-4" />
          {field.addLabel || 'Add item'}
        </button>
      )}
    </div>
  );
}

function ObjectListField({
  field,
  value,
  onChange,
}: {
  field: ObjectListFieldDef;
  value: ListItem[];
  onChange: (v: ListItem[]) => void;
}) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const toggleExpand = (i: number) =>
    setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  const add = () => {
    const empty: ListItem = {};
    field.fields.forEach((f) => {
      empty[f.name] = f.type === 'number' ? 0 : '';
    });
    const newList = [...value, empty];
    onChange(newList);
    setExpanded((prev) => ({ ...prev, [newList.length - 1]: true }));
  };

  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  const updateItem = (i: number, name: string, v: any) =>
    onChange(
      value.map((item, idx) => (idx === i ? { ...item, [name]: v } : item))
    );

  const handleDragStart = (i: number) => setDragIdx(i);
  const handleDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    setOverIdx(i);
  };
  const handleDrop = (i: number) => {
    if (dragIdx === null || dragIdx === i) return;
    const copy = [...value];
    const [moved] = copy.splice(dragIdx, 1);
    copy.splice(i, 0, moved);
    onChange(copy);
    setDragIdx(null);
    setOverIdx(null);
  };
  const handleDragEnd = () => {
    setDragIdx(null);
    setOverIdx(null);
  };

  const canRemove = !field.min || value.length > field.min;
  const canAdd = !field.max || value.length < field.max;

  const getPreview = (item: ListItem) => {
    const firstTextField = field.fields.find((f) => f.type === 'text');
    if (firstTextField) return String(item[firstTextField.name] || '');
    return '';
  };

  return (
    <div>
      <FieldLabel field={field} />
      <div className="space-y-3">
        {value.map((item, i) => {
          const isOpen = expanded[i] ?? false;
          const preview = getPreview(item);
          return (
            <div
              key={i}
              className={`border border-neutral-200 rounded-lg overflow-hidden ${
                overIdx === i ? 'ring-2 ring-emerald-500' : ''
              }`}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={() => handleDrop(i)}
              onDragEnd={handleDragEnd}
            >
              <button
                type="button"
                onClick={() => toggleExpand(i)}
                className="w-full flex items-center gap-2 px-4 py-3 bg-neutral-50 hover:bg-neutral-100 transition-colors text-left"
              >
                <div className="cursor-grab text-neutral-400 hover:text-neutral-600">
                  <Icon name="grip-vertical" className="w-4 h-4" />
                </div>
                <Icon
                  name={isOpen ? 'chevron-down' : 'chevron-right'}
                  className="w-3.5 h-3.5 text-neutral-400"
                />
                <span className="text-sm font-medium text-neutral-700">
                  {field.itemLabel} {i + 1}
                </span>
                {preview && !isOpen && (
                  <span className="text-xs text-neutral-400 truncate ml-1">
                    — {preview}
                  </span>
                )}
                <div className="flex-1" />
                {canRemove && (
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(i);
                    }}
                    className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Icon name="trash" className="w-4 h-4" />
                  </span>
                )}
              </button>
              {isOpen && (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                  {field.fields.map((subField) => {
                    const subSpan = subField.span ?? 2;
                    return (
                      <div
                        key={subField.name}
                        className={
                          subSpan === 2
                            ? 'col-span-1 sm:col-span-2'
                            : 'col-span-1'
                        }
                      >
                        <FieldRenderer
                          field={subField}
                          value={item[subField.name]}
                          onChange={(v) => updateItem(i, subField.name, v)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {canAdd && (
        <button
          type="button"
          onClick={add}
          className="mt-3 flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
        >
          <Icon name="plus" className="w-4 h-4" />
          {field.addLabel || `Add ${field.itemLabel.toLowerCase()}`}
        </button>
      )}
    </div>
  );
}
