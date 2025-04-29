'use client';

import { HeaderProvider } from '@/components/layout/Gnb/HeaderContext';
import Header from '@/components/layout/Gnb/Header';

export default function BoardPage() {
  return (
    <HeaderProvider>
      <Header onOpenSideMenu={() => {}} />
    </HeaderProvider>
  );
}
