import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const DAILY_LIMIT = 3;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getIP(request) {
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    '0.0.0.0'
  );
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

export async function POST(request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Email delivery is not configured' }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim().replace(/[\r\n]/g, ' ') : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }
  if (name.length > 100 || email.length > 254 || message.length > 3000 || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'Please check the message details and try again.' }, { status: 400 });
  }

  const ip = getIP(request);
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  const { count, error: countError } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true })
    .eq('ip', ip)
    .gte('created_at', dayStart.toISOString());

  if (countError) {
    console.error('Inquiry rate-limit lookup failed:', countError);
    return NextResponse.json({ error: 'Unable to accept messages right now.' }, { status: 503 });
  }

  if ((count ?? 0) >= DAILY_LIMIT) {
    return NextResponse.json(
      { error: `Too many messages. You can send up to ${DAILY_LIMIT} messages per day.` },
      { status: 429 }
    );
  }

  try {
    const { error: dbError } = await supabase.from('inquiries').insert([{ name, email, message, ip }]);
    if (dbError) console.error('Supabase insert error:', dbError);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);
    const { error: emailError } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0d0d0d;color:#fff;padding:32px;border-radius:12px">
          <h2 style="color:#F26B38;margin:0 0 24px">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#999;width:80px">From</td><td style="padding:8px 0;color:#fff">${safeName}</td></tr>
            <tr><td style="padding:8px 0;color:#999">Email</td><td style="padding:8px 0;color:#F26B38"><a href="mailto:${safeEmail}" style="color:#F26B38">${safeEmail}</a></td></tr>
          </table>
          <hr style="border:1px solid #222;margin:20px 0"/>
          <p style="color:#ccc;line-height:1.7;white-space:pre-wrap">${safeMessage}</p>
        </div>
      `,
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
