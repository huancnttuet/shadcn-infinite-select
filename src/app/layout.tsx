import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';

import { cn } from '@/lib/utils';
import { META_THEME_COLORS, siteConfig } from '@/configs/site';
import { fontMono, fontSans } from '@/lib/font';
import { ThemeProvider } from '@/providers/theme';
import Header from '@/components/layout/header';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Radix UI',
  ],
  authors: [
    {
      name: 'shadcn',
      url: 'https://shadcn.com',
    },
  ],
  creator: 'shadcn',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@shadcn',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html
        lang='en'
        suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
            }}
          />
        </head>
        <body
          className={cn(
            'min-h-svh bg-background font-sans antialiased',
            fontSans.variable,
            fontMono.variable,
          )}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            enableColorScheme>
            <div className='relative flex min-h-svh flex-col bg-background '>
              <div
                data-wrapper=''
                className='border-grid flex flex-1 flex-col'>
                <Header />
                <main className='flex flex-1 flex-col'>{children}</main>
              </div>
            </div>

            {/* <ThemeSwitcher /> */}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
