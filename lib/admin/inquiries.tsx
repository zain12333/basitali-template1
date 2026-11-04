'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase/client';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string | null;
  services: string | null;
  message: string | null;
  status: 'new' | 'replied';
  receivedAt: string;
}

interface InquiryContextValue {
  inquiries: Inquiry[];
  newCount: number;
  loading: boolean;
  setInquiryStatus: (id: string, status: 'new' | 'replied') => Promise<void>;
  refresh: () => Promise<void>;
}

const InquiryContext = createContext<InquiryContextValue>({
  inquiries: [],
  newCount: 0,
  loading: true,
  setInquiryStatus: async () => {},
  refresh: async () => {},
});

export function useInquiries() {
  return useContext(InquiryContext);
}

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = useCallback(async () => {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (e) {
      console.error('Failed to fetch inquiries:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();

    const sb = getSupabaseBrowser();
    const channel = sb
      .channel('site-inquiries:new')
      .on('broadcast', { event: 'new-inquiry' }, () => {
        fetchInquiries();
      })
      .subscribe();

    return () => {
      sb.removeChannel(channel);
    };
  }, [fetchInquiries]);

  const setInquiryStatus = useCallback(
    async (id: string, status: 'new' | 'replied') => {
      try {
        await fetch('/api/inquiries', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, status }),
        });
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
      } catch (e) {
        console.error('Failed to update inquiry:', e);
      }
    },
    []
  );

  const newCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <InquiryContext.Provider
      value={{ inquiries, newCount, loading, setInquiryStatus, refresh: fetchInquiries }}
    >
      {children}
    </InquiryContext.Provider>
  );
}
