import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Noto_Sans_Arabic } from 'next/font/google';
import '../styles/tailwind.css';
import { Toaster } from 'sonner';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-noto-arabic',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mobde-mgqno76.public.builtwithrocket.new'),
  title: 'Mobde — Recurring Income for Egyptian Creators',
  description:
    'Mobde helps Egyptian creators, coaches, educators, and businesses build recurring income from their audience. Join the early-access waitlist.',
  keywords: ['Mobde', 'Egyptian creators', 'recurring income', 'memberships', 'subscriptions', 'Egypt'],
  openGraph: {
    title: 'Mobde — Recurring Income for Egyptian Creators',
    description:
      'Build recurring income from your audience. Mobde is being designed for Egypt from the ground up.',
    url: 'https://mobde.co',
    siteName: 'Mobde',
    images: [
      {
        url: '/assets/images/Mobde-1787628974719.png',
        width: 1200,
        height: 630,
        alt: 'Mobde — Recurring Income for Egyptian Creators',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobde — Recurring Income for Egyptian Creators',
    description:
      'Build recurring income from your audience. Mobde is being designed for Egypt from the ground up.',
    images: ['/assets/images/Mobde-1787628974719.png'],
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${notoArabic.variable}`}>
      <body className={plusJakarta.className}>
        {children}
        <Toaster position="bottom-right" richColors />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fmobde3040back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}