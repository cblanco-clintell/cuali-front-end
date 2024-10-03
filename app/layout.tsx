import '@/styles/globals.css';
import { Inter, DM_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import Provider from '@/redux/provider';
import { Setup } from '@/components/utils';

const font = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cuali',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Add Google Analytics script and other global head elements here */}
        {/* <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=YOUR_GOOGLE_ANALYTICS_ID`}
        /> */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'YOUR_GOOGLE_ANALYTICS_ID');
            `,
          }}
        /> */}
      </head>
      <body className={`h-screen ${font.className}`}>
        <Provider>
          <Setup />
          <div className="flex h-full">
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
