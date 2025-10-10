import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>IN-FOMO. - Digital Solutions That Matter</title>
        <meta name="description" content="IN-FOMO. builds innovative solutions for forward-thinking businesses." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
