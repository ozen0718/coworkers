'use client';

import { BestPost } from '@/components/Card/Post/BestPost';
import { GeneralPost } from '@/components/Card/Post/GeneralPost';

export default function BoardPage() {
  return (
    <div className="bg-bg300 flex min-h-screen flex-col items-center text-white">
      <div className="w-full max-w-[1200px] px-4">
        <div className="w-full max-w-[1200px]">
          <h1 className="text-gray100 mt-10 font-bold sm:text-2xl">자유게시판</h1>
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

        <div className="mt-10 max-h-[300px]">
          <div className="flex w-full items-center justify-between">
            <h2 className="w-full font-bold sm:text-xl">베스트 게시글</h2>
            <p className="text-md-regular text-gray400 flex items-center whitespace-nowrap">
              더보기&nbsp;{'>'}
            </p>
          </div>
          <div className="mt-15 flex gap-4">
            <BestPost />
            <BestPost />
            <BestPost />
          </div>
        </div>

        <div className="mt-10">
          <div className="flex w-full items-center justify-between">
            <h2 className="w-full font-bold sm:text-xl">게시글</h2>
            <p className="text-md-regular text-gray400 flex items-center whitespace-nowrap">
              dropdown
            </p>
          </div>
          <div className="scroll-area mt-10 grid max-h-[600px] grid-cols-2 gap-4 overflow-y-auto">
            <GeneralPost />
            <GeneralPost />
            <GeneralPost />
            <GeneralPost />
            <GeneralPost />
          </div>
        </div>
      </div>
    </div>
  );
}
