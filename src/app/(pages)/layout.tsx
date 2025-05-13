'use client';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 md:px-6">
      <div className="mx-auto max-w-[1200px]">{children}</div>
    </div>
  );
}
