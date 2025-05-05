'use client';

import { BestPost } from '@/components/Card/Post/BestPost';
import { GeneralPost } from '@/components/Card/Post/GeneralPost';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useState } from 'react';

/* 테스트 데이터 */
import { testPosts } from '@/components/Card/testPosts';

export default function BoardPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = testPosts.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-10">
      <p className="text-gray100 font-bold sm:text-2xl">베스트 게시글</p>

      <div className="relative mt-10">
        <img
          src="/icons/search.svg"
          alt="검색 아이콘"
          className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 cursor-pointer"
        />
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="bg-bg200 rounded-xl border border-[#F8FAFC1A] p-4 pl-12"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm && filteredData.length === 0 ? (
        <div className="text-gray400 flex h-[300px] w-full items-center justify-center text-lg">
          검색하신 게시글이 없습니다.
        </div>
      ) : (
        <>
          {/* 베스트 게시글 */}
          <div className="mt-10">
            <div className="flex w-full items-center justify-between">
              <h2 className="w-full font-bold sm:text-xl">베스트 게시글</h2>
            </div>

            <div className="mt-6 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredData.map((post) => (
                <BestPost key={post.id} {...post} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
