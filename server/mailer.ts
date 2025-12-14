import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  APP_NAME = 'Kabadi',
} = process.env as Record<string, string | undefined>;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
  // Don't throw at import-time; allow app to run without email in dev.
  // We will guard at send-time.
}

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT || 587),
  secure: false, // STARTTLS on 587
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
});

function getRecipients(fallback?: string) {
  const list = (fallback || process.env.CONTACT_NOTIFY_TO || '').trim();
  if (!list) return [] as string[];
  return list.split(',').map(s => s.trim()).filter(Boolean);
}

export async function sendContactNotification(contact: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn('[mailer] SMTP not configured; skipping email send');
    return { skipped: true } as const;
  }

  const to = getRecipients(process.env.CONTACT_NOTIFY_TO || 'sixninefreeloader2022@proton.me');
  if (to.length === 0) {
    console.warn('[mailer] No CONTACT_NOTIFY_TO configured; skipping');
    return { skipped: true } as const;
  }
  const subject = `[${APP_NAME}] New contact message: ${contact.subject}`;

  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(contact.phone)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(contact.subject)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; background:#f7f7f7; padding:12px; border-radius:6px;">${escapeHtml(contact.message)}</pre>
    </div>
  `;

  const text = `New Contact Message\n\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nSubject: ${contact.subject}\n\nMessage:\n${contact.message}`;

  const info = await transporter.sendMail({
    from: SMTP_USER,
    to,
    subject,
    text,
    html,
  });

  return { messageId: info.messageId };
}

export async function sendPickupRequestNotification(request: {
  name: string;
  email: string;
  phone: string | null;
  address: string;
  scrapTypes: string[];
  estimatedQuantity: string | null;
  additionalNotes: string | null;
}) {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn('[mailer] SMTP not configured; skipping email send');
    return { skipped: true } as const;
  }
  const to = getRecipients(process.env.PICKUP_NOTIFY_TO || process.env.CONTACT_NOTIFY_TO || 'sixninefreeloader2022@proton.me');
  if (to.length === 0) return { skipped: true } as const;

  const subject = `[${APP_NAME}] New pickup request from ${request.name}`;
  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>New Pickup Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(request.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(request.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(String(request.phone ?? ''))}</p>
      <p><strong>Address:</strong> ${escapeHtml(request.address)}</p>
      <p><strong>Scrap Types:</strong> ${request.scrapTypes.map(escapeHtml).join(', ')}</p>
      <p><strong>Estimated Quantity:</strong> ${escapeHtml(String(request.estimatedQuantity ?? ''))}</p>
      <p><strong>Additional Notes:</strong></p>
      <pre style="white-space: pre-wrap; background:#f7f7f7; padding:12px; border-radius:6px;">${escapeHtml(String(request.additionalNotes ?? ''))}</pre>
    </div>
  `;
  const text = `New Pickup Request\n\nName: ${request.name}\nEmail: ${request.email}\nPhone: ${request.phone}\nAddress: ${request.address}\nScrap Types: ${request.scrapTypes.join(', ')}\nEstimated Quantity: ${request.estimatedQuantity}\n\nNotes:\n${request.additionalNotes ?? ''}`;

  const info = await transporter.sendMail({ from: SMTP_USER, to, subject, text, html });
  return { messageId: info.messageId };
}

export async function sendCareerApplicationNotification(app: {
  name: string;
  email: string;
  phone: string;
  position: string;
  coverLetter: string | null;
  cvFileName: string | null;
}) {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn('[mailer] SMTP not configured; skipping email send');
    return { skipped: true } as const;
  }
  const to = getRecipients(process.env.CAREER_NOTIFY_TO || process.env.CONTACT_NOTIFY_TO || 'sixninefreeloader2022@proton.me');
  if (to.length === 0) return { skipped: true } as const;

  const subject = `[${APP_NAME}] New career application: ${app.position}`;
  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>New Career Application</h2>
      <p><strong>Name:</strong> ${escapeHtml(app.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(app.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(app.phone)}</p>
      <p><strong>Position:</strong> ${escapeHtml(app.position)}</p>
      <p><strong>Cover Letter:</strong></p>
      <pre style="white-space: pre-wrap; background:#f7f7f7; padding:12px; border-radius:6px;">${escapeHtml(String(app.coverLetter ?? ''))}</pre>
      <p><strong>CV File:</strong> ${escapeHtml(String(app.cvFileName ?? ''))}</p>
    </div>
  `;
  const text = `New Career Application\n\nName: ${app.name}\nEmail: ${app.email}\nPhone: ${app.phone}\nPosition: ${app.position}\n\nCover Letter:\n${app.coverLetter ?? ''}\n\nCV File: ${app.cvFileName ?? ''}`;

  const info = await transporter.sendMail({ from: SMTP_USER, to, subject, text, html });
  return { messageId: info.messageId };
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
