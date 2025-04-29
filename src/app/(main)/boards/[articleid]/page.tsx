'use client';

import { HeaderProvider } from '@/components/layout/Gnb/HeaderContext';
import Header from '@/components/layout/Gnb/Header';

export default function ArticleDetail() {
  return (
    <HeaderProvider>
      <Header onOpenSideMenu={() => {}} />
      <div>자유게시판 - 상세페이지</div>
    </HeaderProvider>
  );
}
