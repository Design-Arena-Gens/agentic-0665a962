import type { Metadata } from 'next';
import './globals.css';
import { Vazirmatn } from 'next/font/google';

const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['200','300','400','500','600','700','800','900'] });

export const metadata: Metadata = {
  title: '???? ??? | ???? ??????? ???',
  description: '????? ???? ??????? ???? ???????? ? ????? ???? ?????',
  metadataBase: new URL('https://agentic-0665a962.vercel.app')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.className} antialiased container-rtl min-h-dvh`}>{children}</body>
    </html>
  );
}
