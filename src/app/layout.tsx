import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '../context/AppContext';

export const metadata: Metadata = {
  title: 'MatriSetu - Maternal & Child Healthcare Navigation System',
  description: 'Connected healthcare journey for mothers, caregivers, and doctors across India. Dynamic timeline, government scheme finder, consent matrix, and WhatsApp alerts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-teal-100 selection:text-teal-900">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
