'use client';

import React from 'react';
import Link from 'next/link';
import { useInquiries } from '@/lib/admin/inquiries';
import { Icon } from './icons';
import { card, PageHeader } from './ui';

export default function Dashboard() {
  const { inquiries, newCount, loading } = useInquiries();

  const stats = [
    { label: 'New inquiries', value: newCount, icon: 'mail', href: '/admin/inquiries' },
    { label: 'Services', value: 10, icon: 'briefcase', href: '/admin/content/services-homepage' },
    { label: 'Client reviews', value: 0, icon: 'star', href: '/admin/content/testimonials' },
    { label: 'FAQs', value: 0, icon: 'question', href: '/admin/content/faq' },
  ];

  const quickActions = [
    { label: 'Edit the hero', icon: 'pencil', href: '/admin/content/hero' },
    { label: 'Add a service', icon: 'briefcase', href: '/admin/content/services-homepage' },
    { label: 'Add a client review', icon: 'star', href: '/admin/content/testimonials' },
    { label: 'Update contact details', icon: 'pencil', href: '/admin/content/contact' },
  ];

  const latestInquiries = inquiries.slice(0, 4);

  return (
    <div>
      <PageHeader
        title="Content dashboard"
        description="Everything on the public website is editable from here. Start with new inquiries, then work down the sidebar."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`${card} p-5 hover:shadow-md transition-shadow group`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center">
                <Icon name={stat.icon} className="w-[18px] h-[18px] text-neutral-500" />
              </div>
              <Icon name="arrow-right" className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500 transition-colors" />
            </div>
            <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
            <div className="text-xs text-neutral-500 mt-0.5">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Latest Inquiries */}
        <div className={`${card} p-5 lg:col-span-3`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">Latest inquiries</h2>
              <p className="text-xs text-neutral-500">{inquiries.length} total · {newCount} awaiting a reply</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-neutral-100 rounded animate-pulse" />
              ))}
            </div>
          ) : latestInquiries.length === 0 ? (
            <p className="text-sm text-neutral-400 py-6 text-center">No inquiries yet</p>
          ) : (
            <div className="space-y-2">
              {latestInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {inq.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-neutral-900 truncate">{inq.name}</span>
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`${card} p-5 lg:col-span-2`}>
          <h2 className="text-sm font-semibold text-neutral-900 mb-4">Quick actions</h2>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-neutral-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <Icon name={action.icon} className="w-4 h-4 text-neutral-600" />
                </div>
                <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatRelative(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = now - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
