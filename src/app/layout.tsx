import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const generalSans = localFont({
  src: [
    { path: '../../public/fonts/general-sans/GeneralSans-300.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/general-sans/GeneralSans-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/general-sans/GeneralSans-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/general-sans/GeneralSans-600.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/general-sans/GeneralSans-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-general-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
  display: 'swap',
});

const siteName = 'Arthur Vasconcellos';
const siteDescription = 'Personal site by Arthur Vasconcellos - Software Engineer.';

export const metadata: Metadata = {
  metadataBase: new URL('https://arthurvasconcellos.com'),
  title: {
    default: `${siteName} - AV LABS`,
    template: '%s · AV LABS',
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: `${siteName} - AV LABS`,
    title: `${siteName} - AV LABS`,
    description: siteDescription,
    url: 'https://arthurvasconcellos.com',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - AV LABS`,
    description: siteDescription,
  },
  icons: {
    icon: [
      { url: '/icons/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f3' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1d20' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${generalSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-background text-foreground min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
