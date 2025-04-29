'use client';

import { BestPost } from '@/components/Card/Post/BestPost';

export default function BoardPage() {
  return (
    <div className="bg-bg300 flex min-h-screen flex-col items-center text-white">
      <div className="w-full max-w-[1200px] px-4">
        <div className="w-full max-w-[1200px]">
          <h1 className="text-2xl-bold text-gray100 mt-10">자유게시판</h1>
        </div>

        <div className="relative mt-10 w-full max-w-[1201px]">
          <img
            src="/icons/search.svg"
            alt="검색 아이콘"
            className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 cursor-pointer"
          />
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="bg-bg200 w-full rounded-xl border border-[#F8FAFC1A] p-4 pl-12"
          />
        </div>
        <div className="mt-10">
          <h2 className="text-xl-bold">베스트 게시글</h2>
          <div className="mt-15">
            <BestPost />
          </div>
        </div>
      </div>
    </div>
  );
}
