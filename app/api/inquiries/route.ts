import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (body.website && typeof body.website === 'string' && body.website.length > 0) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const { name, email, company, services, message } = body;

  if (!name || typeof name !== 'string' || name.length > 120) {
    return NextResponse.json({ error: 'Name is required (max 120 chars)' }, { status: 400 });
  }

  if (!email || typeof email !== 'string' || email.length > 254) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
  }

  if (company && (typeof company !== 'string' || company.length > 160)) {
    return NextResponse.json({ error: 'Company name too long' }, { status: 400 });
  }

  if (services && (typeof services !== 'string' || services.length > 500)) {
    return NextResponse.json({ error: 'Services field too long' }, { status: 400 });
  }

  if (!message || typeof message !== 'string' || message.length > 5000) {
    return NextResponse.json({ error: 'Message is required (max 5000 chars)' }, { status: 400 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from('site_inquiries')
    .insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || null,
      services: services?.trim() || null,
      message: message.trim(),
    })
    .select('id')
    .single();

  if (error) {
    console.error('Inquiry insert error:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data.id }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from('site_inquiries')
    .select('*')
    .order('received_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  const inquiries = (data || []).map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    services: row.services,
    message: row.message,
    status: row.status,
    receivedAt: row.received_at,
  }));

  return NextResponse.json({ inquiries });
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { id, status } = body;
  if (!id || !status || !['new', 'replied'].includes(status)) {
    return NextResponse.json({ error: 'Invalid id or status' }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin()
    .from('site_inquiries')
    .update({ status })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
