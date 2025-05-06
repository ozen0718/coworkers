'use client';

import { BestPost } from '@/components/Card/Post/BestPost';
import { GeneralPost } from '@/components/Card/Post/GeneralPost';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useState, useEffect } from 'react';
import ArrowDropdown from '@/components/common/ArrowDropdown';
import Link from 'next/link';

/* 테스트 데이터 */
import { testPosts } from '@/components/Card/testPosts';

export default function BoardPage() {
  const [selectedOption, setSelectedOption] = useState('최신순');

  const windowWidth = useWindowSize();
  let bestVisiblePosts = 1;
  if (windowWidth >= 1024) {
    bestVisiblePosts = 3;
  } else if (windowWidth >= 640) {
    bestVisiblePosts = 2;
  }

  /* 검색 데이터 */
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = testPosts.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* 로딩 */
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="flex h-[calc(100dvh-60px)] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-b-2 border-gray-400"></div>
        <span className="text-gray400 ml-2">로딩 중입니다...</span>
      </div>
    );
  }

  return (
    <div className="my-10">
      <h1 className="text-lg font-bold sm:text-2xl">자유게시판</h1>

      <div className="relative mt-10 w-full">
        <img
          src="/icons/search.svg"
          alt="검색 아이콘"
          className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 cursor-pointer"
        />
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="bg-bg200 w-full rounded-xl border border-[#F8FAFC1A] p-4 pl-12"
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
          <div className="mt-10 max-h-[300px]">
            <div className="flex w-full items-center justify-between">
              <h2 className="w-full font-bold sm:text-xl">베스트 게시글</h2>
              <Link href="/boards/best">
                <p className="text-md-regular text-gray400 flex cursor-pointer items-center whitespace-nowrap">
                  더보기&nbsp;{'>'}
                </p>
              </Link>
            </div>
            <div className="mt-15 flex w-full justify-center gap-4">
              {filteredData.slice(0, bestVisiblePosts).map((post) => (
                <BestPost key={post.id} {...post} />
              ))}
            </div>
          </div>

          {/* 일반 게시글 */}
          <div className="mt-10">
            <div className="flex w-full items-center justify-between">
              <h2 className="w-full font-bold sm:text-xl">게시글</h2>

              <ArrowDropdown
                size="lg"
                options={['최신순', '좋아요 많은 순']}
                selected={selectedOption}
                onSelect={(value) => setSelectedOption(value)}
              />
            </div>

            <div className="scroll-area mt-10 grid max-h-[600px] grid-cols-1 justify-items-center gap-4 overflow-y-auto lg:grid-cols-2">
              {filteredData.map((post) => (
                <GeneralPost
                  key={post.id}
                  title={post.title}
                  imgUrl={post.imgUrl}
                  date={post.date}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
