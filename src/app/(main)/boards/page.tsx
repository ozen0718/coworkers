'use client';

import { HeaderProvider } from '@/components/layout/Gnb/HeaderContext';
import Header from '@/components/layout/Gnb/Header';

export default function BoardPage() {
  return (
    <div className="bg-bg300 flex min-h-screen flex-col items-center text-white">
      <HeaderProvider>
        <Header onOpenSideMenu={() => {}} />
        {/* 여기만 위에 여백 줄 것 */}
        <div className="text-2xl-bold text-gray100 mt-10 flex h-full max-h-[1196px] w-full max-w-[1201px]">
          자유게시판
        </div>
      </HeaderProvider>
    </div>
  );
}
