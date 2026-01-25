import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'JSON Render Example',
  description: 'Prototype UI with JSON render specs.',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <main className="app">{children}</main>
      </body>
    </html>
  );
}
