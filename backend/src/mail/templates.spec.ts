import * as t from './templates';

const brand: t.Brand = {
  churchName: 'God Seeking Generation',
  websiteUrl: 'https://gsg.example.org',
  logoUrl: 'https://gsg.example.org/GSG.png',
  tagline: "Seeking God's Face",
};
const evil = '<script>alert(1)</script><img src=x onerror=alert(1)>';

const all = [
  t.contactNotification(brand, { name: evil, email: 'a@b.co', message: evil }),
  t.contactAutoReply(brand, { name: evil, message: evil }),
  t.newsletterWelcome(brand, {
    name: evil,
    unsubscribeUrl: 'https://gsg.example.org/u?token=1',
  }),
  t.prayerNotification(brand, { name: evil, request: evil }),
  t.prayerAcknowledgement(brand, { name: evil }),
  t.testimonyNotification(
    brand,
    { name: evil, content: evil },
    'https://admin',
  ),
  t.orderReceipt(brand, {
    buyerName: evil,
    reference: 'gsg_1',
    itemName: evil,
    quantity: 1,
    amount: 50,
    currency: 'GHS',
    paidAt: new Date(),
  }),
  t.orderNotification(brand, {
    buyerName: evil,
    buyerEmail: 'a@b.co',
    reference: 'gsg_1',
    itemName: evil,
    quantity: 2,
    amount: 100,
    currency: 'GHS',
  }),
];

describe('email templates', () => {
  it.each(all.map((m, i) => [i, m] as const))(
    'template %i has logo, theme and escaped user input',
    (_i, mail) => {
      expect(mail.html).toContain(`src="${brand.logoUrl}"`);
      expect(mail.html).toContain(t.THEME.navy);
      expect(mail.html).toContain(t.THEME.primary);
      expect(mail.html).not.toContain('<script>');
      expect(mail.html).not.toContain('<img src=x');
      expect(mail.subject.length).toBeGreaterThan(0);
      expect(mail.text.length).toBeGreaterThan(0);
    },
  );
});
