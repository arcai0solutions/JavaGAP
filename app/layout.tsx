import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Java Global Access - Global Delivery for Tech & Professional Services',
  description: 'Java Global Access Platform (JavaGAP) provides structured professional services and managed operational support for overseas clients, backed by disciplined governance, standardized workflows, and scalable delivery teams.',
  keywords: ['Java Global Access', 'Global Delivery', 'Tech Services', 'Professional Services', 'Managed Support', 'JavaGAP', 'Offshore Teams', 'Software Development', 'IT Services'],
  icons: {
    icon: '/java-favicon.png',
    apple: '/java-favicon.png',
  },
  openGraph: {
    title: 'Java Global Access - Global Delivery for Tech & Professional Services',
    description: 'Java Global Access Platform (JavaGAP) provides structured professional services and managed operational support for overseas clients.',
    url: 'https://javaglobalaccess.com',
    siteName: 'Java Global Access',
    images: [
      {
        url: '/share-img.png',
        width: 1080,
        height: 1350,
        alt: 'Java Global Access Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Java Global Access - Global Delivery for Tech & Professional Services',
    description: 'Java Global Access Platform (JavaGAP) provides structured professional services and managed operational support for overseas clients.',
    images: ['/share-img.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
