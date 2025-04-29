'use client';

import { HeaderProvider } from '@/components/layout/Gnb/HeaderContext';
import Header from '@/components/layout/Gnb/Header';

export default function BoardPage() {
  return (
    <div className="bg-bg300 flex min-h-screen flex-col items-center text-white">
      <HeaderProvider>
        <Header onOpenSideMenu={() => {}} />
        <div className="w-full max-w-[1201px] px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl-bold text-gray100 mt-10">자유게시판</h1>
        </div>
      </HeaderProvider>
    </div>
  );
}
