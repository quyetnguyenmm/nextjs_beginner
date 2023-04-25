import { LayoutProps } from '@/models/index';
import Link from 'next/link';

export function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="layout admin-layout">
      <h1>Main Layout</h1>
      <div>Sidebar</div>

      <Link href="/">Home</Link>
      <Link href="/about">About</Link>

      {children}
    </div>
  );
}
