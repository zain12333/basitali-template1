'use client';

import React, { useState } from 'react';
import { useInquiries, type Inquiry } from '@/lib/admin/inquiries';
import { PageHeader, card, secondaryButton, Toast } from './ui';
import { Icon } from './icons';

const PER_PAGE = 10;

export default function InquiriesList() {
  const { inquiries, loading, setInquiryStatus, refresh } = useInquiries();
  const [filter, setFilter] = useState<'all' | 'new' | 'replied'>('all');
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' } | null>(null);

  const filtered = inquiries.filter((inq) => {
    if (filter === 'all') return true;
    return inq.status === filter;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const handleStatusToggle = async (inq: Inquiry) => {
    const newStatus = inq.status === 'new' ? 'replied' : 'new';
    await setInquiryStatus(inq.id, newStatus);
    setToast({ message: `Marked as ${newStatus}`, variant: 'success' });
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatRelative = (iso: string) => {
    const diffMs = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filters = [
    { label: 'All', value: 'all' as const, count: inquiries.length },
    { label: 'New', value: 'new' as const, count: inquiries.filter((i) => i.status === 'new').length },
    { label: 'Replied', value: 'replied' as const, count: inquiries.filter((i) => i.status === 'replied').length },
  ];

  return (
    <div>
      <PageHeader title="Inquiries" description="Contact form submissions from the website.">
        <button onClick={refresh} className={secondaryButton}>
          <Icon name="arrow-right" className="w-4 h-4 rotate-[225deg]" />
          Refresh
        </button>
      </PageHeader>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-neutral-100 p-1 rounded-lg w-fit">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => { setFilter(f.value); setPage(0); }}
            className={`px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors ${
              filter === f.value
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-neutral-200 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className={`${card} py-16 text-center`}>
          <Icon name="inbox" className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <p className="text-sm text-neutral-500">No inquiries found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {paged.map((inq) => (
            <div key={inq.id} className={`${card} overflow-hidden`}>
              <button
                onClick={() => toggleExpand(inq.id)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-neutral-50 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold shrink-0">
                  {inq.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-neutral-900">{inq.name}</span>
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full ${
                        inq.status === 'new'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {inq.status === 'new' ? 'New' : 'Replied'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 truncate">
                    {inq.services || inq.company || inq.email}
                  </p>
                </div>
                <span className="text-[11px] text-neutral-400 shrink-0">
                  {formatRelative(inq.receivedAt)}
                </span>
                <Icon
                  name={expanded === inq.id ? 'chevron-up' : 'chevron-down'}
                  className="w-4 h-4 text-neutral-400 shrink-0"
                />
              </button>

              {expanded === inq.id && (
                <div className="px-4 pb-4 border-t border-neutral-100 pt-3 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-neutral-500">Email: </span>
                      <a
                        href={`mailto:${inq.email}`}
                        className="text-emerald-700 hover:underline"
                      >
                        {inq.email}
                      </a>
                    </div>
                    {inq.company && (
                      <div>
                        <span className="text-neutral-500">Company: </span>
                        <span className="text-neutral-900">{inq.company}</span>
                      </div>
                    )}
                    {inq.services && (
                      <div>
                        <span className="text-neutral-500">Service: </span>
                        <span className="text-neutral-900">{inq.services}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-neutral-500">Date: </span>
                      <span className="text-neutral-900">{formatDate(inq.receivedAt)}</span>
                    </div>
                  </div>

                  {inq.message && (
                    <div className="bg-neutral-50 rounded-lg p-3">
                      <p className="text-sm text-neutral-700 whitespace-pre-wrap">{inq.message}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <a
                      href={`mailto:${inq.email}?subject=Re: Inquiry from ${inq.name}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white text-xs font-medium rounded-full hover:bg-emerald-800 transition-colors"
                    >
                      <Icon name="mail" className="w-3.5 h-3.5" />
                      Reply by email
                    </a>
                    <button
                      onClick={() => handleStatusToggle(inq)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-300 text-neutral-700 text-xs font-medium rounded-full hover:bg-neutral-50 transition-colors"
                    >
                      Mark as {inq.status === 'new' ? 'replied' : 'new'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className={secondaryButton}
              >
                Previous
              </button>
              <span className="text-sm text-neutral-500">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className={secondaryButton}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {toast && <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </div>
  );
}
