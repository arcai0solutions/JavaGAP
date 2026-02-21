import './globals.css';
import { AiChatWidget } from '@/components/ai-chat-widget';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://javaglobalaccess.com'),
  title: 'Java Global Access | Global Delivery for Tech & Professional Services',
  description: 'Java Global Access Platform (JavaGAP) delivers structured professional services, managed operational support, and scalable delivery teams for overseas clients — backed by disciplined governance and standardized workflows.',
  keywords: ['Java Global Access', 'Global Delivery', 'Tech Services', 'Professional Services', 'Managed Support', 'JavaGAP', 'Offshore Teams', 'Software Development', 'IT Services'],
  icons: {
    icon: '/javagap-favicon.png',
    apple: '/javagap-favicon.png',
  },
  openGraph: {
    title: 'Java Global Access | Global Delivery for Tech & Professional Services',
    description: 'Structured professional services, managed operational support, and scalable delivery teams for overseas clients — backed by disciplined governance and standardized workflows.',
    url: 'https://javaglobalaccess.com',
    siteName: 'Java Global Access',
    images: [
      {
        url: '/new-shareable-img.jpg',
        width: 1200,
        height: 630,
        alt: 'Java Global Access — Your Global Delivery Partner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Java Global Access | Global Delivery for Tech & Professional Services',
    description: 'Structured professional services, managed operational support, and scalable delivery teams for overseas clients — backed by disciplined governance and standardized workflows.',
    images: ['/new-shareable-img.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-clip">
      <body id="root" className={`${inter.className} overflow-x-clip`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md">
          Skip to main content
        </a>
        {children}
        <AiChatWidget />
      </body>
    </html>
  );
}
