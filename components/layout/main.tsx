import { LayoutProps } from '@/models/index';
import Link from 'next/link';
import { useEffect } from 'react';

export function MainLayout({ children }: LayoutProps) {
  useEffect(() => {
    console.log('Mounting...');

    return () => console.log('UnMounting...');
  }, []);
  return (
    <div className="layout main-layout">
      <h1>Main Layout</h1>

      <Link href="/">Home</Link>
      <Link href="/about">About</Link>

      {children}
    </div>
  );
}
