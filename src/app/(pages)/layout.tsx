'use client';

import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="px-4 md:px-6">
      <div className="mx-auto max-w-[1200px]">{children}</div>
    </main>
  );
}
