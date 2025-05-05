export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6">{children}</div>
  );
}