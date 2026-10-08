/**
 * Plain, inline-styled HTML emails (email clients ignore <style> blocks and
 * external CSS). Every user-supplied value MUST go through `esc()`.
 */

export const esc = (value: string | number | null | undefined) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Escape, then keep the sender's line breaks. */
const paragraphs = (value: string) => esc(value).replace(/\r?\n/g, '<br />');

export interface Brand {
  churchName: string;
  websiteUrl: string;
  /** Absolute URL of the logo image (emails can't use relative paths). */
  logoUrl: string;
  tagline: string;
}

/**
 * Website theme (web/app/globals.css), converted from oklch to hex because
 * email clients don't support oklch().
 */
export const THEME = {
  navy: '#001226', // dark-mode background — header/footer band
  primary: '#305880', // buttons & links
  primaryFg: '#f1f9ff',
  background: '#f4fbff', // page background (soft light blue)
  card: '#ffffff',
  foreground: '#030b1c', // body text (deep navy)
  muted: '#eaf2f7', // quote / panel background
  mutedFg: '#2e3b50', // secondary text
  accent: '#95d4d8', // cyan accent
  border: '#cbdae2',
  font: "Geist, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
} as const;

export function layout(brand: Brand, title: string, body: string, footer = '') {
  const T = THEME;
  const site = esc(brand.websiteUrl);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${T.background};font-family:${T.font};color:${T.foreground};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${T.background};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${T.card};border:1px solid ${T.border};border-radius:12px;overflow:hidden;">
        <tr><td style="background:${T.navy};padding:22px 28px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;padding-right:14px;">
              <a href="${site}"><img src="${esc(brand.logoUrl)}" width="52" height="52" alt="${esc(brand.churchName)} logo" style="display:block;width:52px;height:52px;border:0;border-radius:50%;background:#ffffff;" /></a>
            </td>
            <td style="vertical-align:middle;">
              <div style="font-size:17px;font-weight:bold;letter-spacing:0.5px;color:${T.primaryFg};text-transform:uppercase;">${esc(brand.churchName)}</div>
              <div style="font-size:12px;color:${T.accent};margin-top:2px;">${esc(brand.tagline)}</div>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="height:4px;background:${T.primary};line-height:4px;font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:30px 28px 18px;">
          <h1 style="margin:0 0 18px;font-size:21px;line-height:1.3;color:${T.foreground};">${esc(title)}</h1>
          ${body}
        </td></tr>
        <tr><td style="padding:18px 28px;background:${T.muted};border-top:1px solid ${T.border};font-size:12px;line-height:1.7;color:${T.mutedFg};">
          ${footer}
          <a href="${site}" style="color:${T.primary};font-weight:bold;text-decoration:none;">${esc(brand.websiteUrl.replace(/^https?:\/\//, ''))}</a><br />
          ${esc(brand.churchName)} · Obomeng-Kwahu, Eastern Region, Ghana
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const p = (html: string) =>
  `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:${THEME.foreground};">${html}</p>`;

const quote = (text: string) =>
  `<div style="margin:0 0 16px;padding:14px 16px;background:${THEME.muted};border-left:4px solid ${THEME.accent};border-radius:6px;font-size:14px;line-height:1.65;color:${THEME.foreground};">${paragraphs(text)}</div>`;

const rows = (pairs: [string, string | number | null | undefined][]) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 16px;font-size:14px;line-height:1.65;">${pairs
    .filter(([, v]) => v !== null && v !== undefined && v !== '')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:3px 18px 3px 0;color:${THEME.mutedFg};vertical-align:top;white-space:nowrap;">${esc(k)}</td><td style="padding:3px 0;color:${THEME.foreground};font-weight:600;">${esc(v)}</td></tr>`,
    )
    .join('')}</table>`;

const button = (label: string, href: string) =>
  `<p style="margin:22px 0;"><a href="${esc(href)}" style="display:inline-block;background:${THEME.primary};color:${THEME.primaryFg};text-decoration:none;padding:11px 20px;border-radius:8px;font-size:14px;font-weight:bold;">${esc(label)}</a></p>`;

// ── Contact ("Write to us") ────────────────────────────────────────────────

export function contactNotification(
  brand: Brand,
  m: {
    name: string;
    email: string;
    phone?: string | null;
    subject?: string | null;
    message: string;
  },
) {
  return {
    subject: `New message from ${m.name}${m.subject ? ` — ${m.subject}` : ''}`,
    html: layout(
      brand,
      'New message from the website',
      rows([
        ['Name', m.name],
        ['Email', m.email],
        ['Phone', m.phone],
        ['Subject', m.subject],
      ]) +
        quote(m.message) +
        p('Reply to this email to respond directly to the sender.'),
    ),
    text: `New website message\n\nName: ${m.name}\nEmail: ${m.email}\nPhone: ${m.phone ?? '-'}\n\n${m.message}`,
  };
}

export function contactAutoReply(brand: Brand) {
  // Deliberately static: echoing the sender's name or message would let anyone
  // send arbitrary text to any address from the church's domain.
  return {
    subject: `We received your message — ${brand.churchName}`,
    html: layout(
      brand,
      'Thank you for contacting us',
      p(
        'We have received your message and someone from our team will get back to you soon. God bless you.',
      ) + p("If you didn't send this message, you can ignore this email."),
    ),
    text: `Thank you for contacting us.

We have received your message and someone from our team will get back to you soon. God bless you.

If you didn't send this message, you can ignore this email.

— ${brand.churchName}`,
  };
}

// ── Newsletter ─────────────────────────────────────────────────────────────

/** Double opt-in confirmation. Contains nothing the requester typed. */
export function newsletterConfirm(brand: Brand, confirmUrl: string) {
  return {
    subject: `Confirm your subscription — ${brand.churchName}`,
    html: layout(
      brand,
      'Confirm your subscription',
      p('Please confirm that you want to receive the church newsletter.') +
        button('Confirm subscription', confirmUrl) +
        p(
          "If you didn't sign up, ignore this email and you won't be subscribed.",
        ),
    ),
    text: `Please confirm that you want to receive the ${brand.churchName} newsletter:
${confirmUrl}

If you didn't sign up, ignore this email and you won't be subscribed.`,
  };
}

export function newsletterWelcome(
  brand: Brand,
  s: { name?: string | null; unsubscribeUrl: string },
) {
  return {
    subject: `Welcome to the ${brand.churchName} newsletter`,
    html: layout(
      brand,
      'Welcome!',
      p(
        "Thank you for subscribing. You'll now receive news about upcoming events, conventions, camp meetings and what God is doing across our branches.",
      ) + button('Visit our website', brand.websiteUrl),
      `You're receiving this because you subscribed on our website. <a href="${esc(s.unsubscribeUrl)}" style="color:${THEME.mutedFg};">Unsubscribe</a> · `,
    ),
    text: `Thank you for subscribing to the ${brand.churchName} newsletter.\n\nUnsubscribe: ${s.unsubscribeUrl}`,
  };
}

// ── Prayer requests & testimonies ──────────────────────────────────────────

export function prayerNotification(
  brand: Brand,
  r: {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    request: string;
    isAnonymous?: boolean;
  },
) {
  return {
    subject: `New prayer request${r.isAnonymous || !r.name ? '' : ` from ${r.name}`}`,
    html: layout(
      brand,
      'New prayer request',
      rows(
        r.isAnonymous
          ? [['From', 'Anonymous']]
          : [
              ['Name', r.name],
              ['Email', r.email],
              ['Phone', r.phone],
            ],
      ) + quote(r.request),
    ),
    text: `New prayer request\n\n${r.isAnonymous ? 'Anonymous' : `${r.name ?? ''} ${r.email ?? ''} ${r.phone ?? ''}`}\n\n${r.request}`,
  };
}

export function prayerAcknowledgement(brand: Brand) {
  return {
    subject: `We are praying with you — ${brand.churchName}`,
    html: layout(
      brand,
      'We are praying with you',
      p(
        'Your prayer request has been received and shared with our prayer team. "The effective, fervent prayer of a righteous man avails much." — James 5:16',
      ),
    ),
    text: `Your prayer request has been received and shared with our prayer team. God bless you.\n\n— ${brand.churchName}`,
  };
}

export function testimonyNotification(
  brand: Brand,
  t: { name: string; title?: string | null; content: string },
  adminUrl: string,
) {
  return {
    subject: `New testimony awaiting approval — ${t.name}`,
    html: layout(
      brand,
      'New testimony awaiting approval',
      rows([
        ['From', t.name],
        ['Title', t.title],
      ]) +
        quote(t.content) +
        p('It will appear on the website once an admin approves it.') +
        button('Review testimonies', adminUrl),
    ),
    text: `New testimony from ${t.name} awaiting approval:\n\n${t.content}`,
  };
}

// ── Store ──────────────────────────────────────────────────────────────────

export function orderReceipt(
  brand: Brand,
  o: {
    buyerName: string;
    reference: string;
    itemName: string;
    size?: string | null;
    quantity: number;
    amount: number;
    currency: string;
    paidAt: Date | null;
  },
) {
  const amount = `${o.currency} ${o.amount.toFixed(2)}`;
  return {
    subject: `Payment received — ${o.itemName}`,
    html: layout(
      brand,
      `Thank you, ${o.buyerName}!`,
      p('Your payment was successful. Here are your order details:') +
        rows([
          ['Reference', o.reference],
          ['Item', o.itemName],
          ['Size', o.size],
          ['Quantity', o.quantity],
          ['Amount paid', amount],
          ['Date', o.paidAt?.toUTCString()],
        ]) +
        p(
          'We will contact you about collection or delivery. Reply to this email if you have any questions.',
        ),
    ),
    text: `Payment received.\n\nReference: ${o.reference}\nItem: ${o.itemName}\nQuantity: ${o.quantity}\nAmount: ${amount}`,
  };
}

export function orderNotification(
  brand: Brand,
  o: {
    buyerName: string;
    buyerEmail: string;
    buyerPhone?: string | null;
    reference: string;
    itemName: string;
    size?: string | null;
    quantity: number;
    amount: number;
    currency: string;
  },
) {
  const amount = `${o.currency} ${o.amount.toFixed(2)}`;
  return {
    subject: `New paid order: ${o.itemName} (${amount})`,
    html: layout(
      brand,
      'New paid order',
      rows([
        ['Reference', o.reference],
        ['Item', o.itemName],
        ['Size', o.size],
        ['Quantity', o.quantity],
        ['Amount', amount],
        ['Buyer', o.buyerName],
        ['Email', o.buyerEmail],
        ['Phone', o.buyerPhone],
      ]),
    ),
    text: `New paid order ${o.reference}: ${o.quantity} x ${o.itemName} — ${amount}\nBuyer: ${o.buyerName} <${o.buyerEmail}> ${o.buyerPhone ?? ''}`,
  };
}
