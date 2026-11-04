'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from './icons';
import { useInquiries } from '@/lib/admin/inquiries';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

interface NavGroupWithChildren {
  label: string;
  icon: string;
  children: NavItem[];
}

interface NavGroup {
  label: string;
  items: (NavItem | NavGroupWithChildren)[];
}

function isNavGroupWithChildren(item: NavItem | NavGroupWithChildren): item is NavGroupWithChildren {
  return 'children' in item;
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { newCount } = useInquiries();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleGroup = (label: string) => {
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin';
  };

  const navGroups: NavGroup[] = [
    {
      label: 'OVERVIEW',
      items: [
        { label: 'Dashboard', href: '/admin/dashboard', icon: 'layout' },
        { label: 'Inquiries', href: '/admin/inquiries', icon: 'mail', badge: newCount || undefined },
      ],
    },
    {
      label: 'WEBSITE PAGES',
      items: [
        {
          label: 'Homepage',
          icon: 'home',
          children: [
            { label: 'Hero', href: '/admin/content/hero', icon: 'layout' },
            { label: 'About Section', href: '/admin/content/about-homepage', icon: 'building' },
            { label: 'Services Section', href: '/admin/content/services-homepage', icon: 'briefcase' },
            { label: 'Projects Section', href: '/admin/content/projects-homepage', icon: 'photo' },
            { label: 'Testimonials', href: '/admin/content/testimonials', icon: 'star' },
            { label: 'FAQ', href: '/admin/content/faq', icon: 'question' },
          ],
        },
        { label: 'About Us', href: '/admin/content/about-page', icon: 'building' },
        {
          label: 'Service Pages',
          icon: 'wrench',
          children: [
            { label: 'Aluminum Windows & Doors', href: '/admin/content/aluminum-windows-doors-page', icon: 'window' },
            { label: 'Glass Doors & Partitions', href: '/admin/content/glass-doors-partitions-page', icon: 'door' },
            { label: 'Shower Cabins', href: '/admin/content/shower-cabins-page', icon: 'droplet' },
            { label: 'Shop Fronts', href: '/admin/content/shop-fronts-page', icon: 'storefront' },
            { label: 'Office Glass Work', href: '/admin/content/office-glass-work-page', icon: 'office-building' },
            { label: 'Tempered Glass', href: '/admin/content/tempered-glass-page', icon: 'fire' },
            { label: 'Vertical Blinds', href: '/admin/content/vertical-blinds-page', icon: 'sun-shade' },
            { label: 'Curtain Wall', href: '/admin/content/curtain-wall-page', icon: 'cube-transparent' },
            { label: 'Mirrors & Glass Repair', href: '/admin/content/mirrors-glass-repair-page', icon: 'sparkles' },
            { label: 'Custom Aluminum', href: '/admin/content/custom-aluminum-fabrication-page', icon: 'bolt' },
          ],
        },
        { label: 'Contact Us', href: '/admin/content/contact', icon: 'phone' },
      ],
    },
    {
      label: 'SITE-WIDE',
      items: [
        { label: 'Navigation', href: '/admin/content/navigation', icon: 'menu' },
        { label: 'Footer', href: '/admin/content/footer', icon: 'footer' },
      ],
    },
    {
      label: 'SITE TOOLS',
      items: [
        { label: 'Media Library', href: '/admin/media', icon: 'photo' },
        { label: 'Settings', href: '/admin/settings', icon: 'cog' },
      ],
    },
  ];

  const isGroupActive = (items: NavItem[]) =>
    items.some((c) => pathname === c.href);

  useEffect(() => {
    navGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (isNavGroupWithChildren(item) && isGroupActive(item.children)) {
          setCollapsed((prev) => ({ ...prev, [item.label]: false }));
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Area */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg overflow-hidden bg-white/10 shrink-0">
            <Image
              src="/assets/aistudio/basit_ali_logo_clean_transparent.png"
              alt="Basit Ali Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-white leading-tight">Basit Ali</div>
            <div className="text-[11px] text-white/50">Content manager</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="admin-sidebar flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="px-3 mb-1.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider">
              {group.label}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                if (isNavGroupWithChildren(item)) {
                  const isOpen = collapsed[item.label] !== true;
                  const active = isGroupActive(item.children);
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => toggleGroup(item.label)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-lg transition-colors ${
                          active
                            ? 'text-white bg-white/10'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon name={item.icon} className="w-4 h-4 shrink-0" />
                        <span className="flex-1 text-left">{item.label}</span>
                        <Icon
                          name={isOpen ? 'chevron-down' : 'chevron-right'}
                          className="w-3.5 h-3.5 text-white/40"
                        />
                      </button>
                      {isOpen && (
                        <div className="ml-4 pl-3 border-l border-white/10 mt-0.5 space-y-0.5">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`flex items-center gap-2 px-3 py-1.5 text-[13px] rounded-lg transition-colors ${
                                pathname === child.href
                                  ? 'text-white bg-white/15 font-medium'
                                  : 'text-white/60 hover:text-white hover:bg-white/5'
                              }`}
                              aria-current={pathname === child.href ? 'page' : undefined}
                            >
                              <Icon name={child.icon} className="w-3.5 h-3.5 shrink-0 opacity-70" />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const navItem = item as NavItem;
                return (
                  <Link
                    key={navItem.href}
                    href={navItem.href}
                    className={`flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-lg transition-colors ${
                      pathname === navItem.href
                        ? 'text-white bg-white/15 font-medium'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                    aria-current={pathname === navItem.href ? 'page' : undefined}
                  >
                    <Icon name={navItem.icon} className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{navItem.label}</span>
                    {navItem.badge ? (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500 text-white rounded-full min-w-[18px] text-center">
                        {navItem.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-white/10 p-3 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <Icon name="eye" className="w-4 h-4" />
          View live site
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <Icon name="arrow-right" className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f3ef]">
      <style jsx global>{`
        .admin-sidebar::-webkit-scrollbar { width: 4px; }
        .admin-sidebar::-webkit-scrollbar-track { background: transparent; }
        .admin-sidebar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
        .admin-sidebar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
        .admin-sidebar { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.15) transparent; }
        html::-webkit-scrollbar, body::-webkit-scrollbar { width: 6px; }
        html::-webkit-scrollbar-track, body::-webkit-scrollbar-track { background: #f5f3ef; }
        html::-webkit-scrollbar-thumb, body::-webkit-scrollbar-thumb { background: #c5c0b8; border-radius: 4px; }
        html::-webkit-scrollbar-thumb:hover, body::-webkit-scrollbar-thumb:hover { background: #a09a90; }
        html, body { scrollbar-width: thin; scrollbar-color: #c5c0b8 #f5f3ef; }
      `}</style>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:fixed md:inset-y-0 md:left-0 md:w-64 md:flex-col bg-[#2c3e2e] z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-20 bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded overflow-hidden">
            <Image
              src="/assets/aistudio/basit_ali_logo_clean_transparent.png"
              alt="Logo"
              width={28}
              height={28}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
          <span className="text-sm font-semibold text-neutral-900">Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 text-neutral-700 hover:bg-neutral-100 rounded-lg"
        >
          <Icon name="bars-3" className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={`admin-sidebar fixed inset-y-0 left-0 w-72 bg-[#2c3e2e] z-50 md:hidden shadow-xl overflow-y-auto transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 text-white/60 hover:text-white rounded"
          >
            <Icon name="x-mark" className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="md:ml-64">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
