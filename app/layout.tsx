import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Navbar from '@/components/navbar';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FakeStore',
  description:
    'A simple e-commerce application built with Next.js, TypeScript and fake store API.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-svh w-full flex-col">
          <Navbar />
          <main className="flex-1 xl:mx-[248px] mx-4 md:mx-16 pt-20">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
