'use client';

import { BestPost } from '@/components/Card/Post/BestPost';
import { useState } from 'react';
import { fetchBest } from '@/api/articles';
import { BestPostProps } from '@/components/Card/CardType';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';

export default function BoardPage() {
  const [keyword, setKeyword] = useState('');

  /* 베스트 글 */
  const { data: bestPosts } = useQuery({
    queryKey: QUERY_KEYS.bestPosts(keyword),
    queryFn: () => fetchBest(keyword),
    select: (response) => {
      console.log('서버 응답 전체:', response.data.list);
      const filtered = response.data.list.filter(
        (post: BestPostProps) => post.likeCount && post.likeCount > 0
      );
      console.log('필터링된 결과:', filtered);
      return filtered;
    },
    refetchOnMount: 'always',
  });

  return (
    <div className="my-10">
      <p className="font-bold sm:text-2xl">베스트 게시글</p>

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
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {bestPosts && bestPosts.length === 0 ? (
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
              {bestPosts?.map((post: BestPostProps) => <BestPost key={post.id} {...post} />)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
