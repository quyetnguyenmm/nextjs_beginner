import { LayoutProps } from '@/models/index';

export function EmptyLayout({ children }: LayoutProps) {
  return <div className="layout empty-layout">{children}</div>;
}
