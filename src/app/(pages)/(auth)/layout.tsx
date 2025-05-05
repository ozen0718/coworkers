import { AuthPagesLayout } from "@/styles/pageStyle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={AuthPagesLayout}>{children}</div>;
}
