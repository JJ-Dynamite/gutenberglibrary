import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '70,000 free classic books',
  description: '70,000 free classic books - Built with Rust + Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
