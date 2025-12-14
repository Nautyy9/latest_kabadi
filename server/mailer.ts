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

  const to = 'sixninefreeloader2022@proton.me';
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

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
