import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shivam Chauhan - Portfolio',
  description: 'Computer Science & Engineering student at VIT University with expertise in software development and front-end technologies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white flex flex-col min-h-screen`}>
        <main className="flex-grow">{children}</main>
        <footer className="text-center text-gray-500 py-4 mt-8 border-t border-gray-700">
          © 2025 Copyright Shivam Chauhan. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
