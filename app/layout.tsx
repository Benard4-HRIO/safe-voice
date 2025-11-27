import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/components/I18nProvider';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PanicButton } from '@/components/PanicButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SafeVoice - Secure Platform for GBV Reporting',
  description: 'A secure platform for reporting and support against gender-based violence',
  keywords: ['GBV', 'gender-based violence', 'reporting', 'support', 'anonymous'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.className} antialiased`}>
        <I18nProvider>
          <div className="min-h-screen flex flex-col bg-white">
            <Navigation />
            <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
              <div className="max-w-4xl mx-auto">
                {children}
              </div>
            </main>
            <Footer />
            <PanicButton />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}