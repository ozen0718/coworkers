'use client';

import { BestPost } from '@/components/Card/Post/BestPost';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { AxiosError } from 'axios';
import { fetchBest } from '@/app/api/articles';
import { BestPostProps } from '@/components/Card/CardType';

export default function BoardPage() {
  const [keyword, setKeyword] = useState('');
  const token = useAuthStore((state) => state.accessToken);
  const [bestposts, setBestPosts] = useState<BestPostProps[]>([]);

  /* 베스트 글 */
  useEffect(() => {
    if (!token) return console.log('토큰 없음');

    const fetchPostData = async () => {
      try {
        const response = await fetchBest(token, keyword);
        const filteredPosts = response.data.list.filter(
          (post: BestPostProps) => post.likeCount && post.likeCount > 0
        );
        setBestPosts(filteredPosts);
      } catch (err) {
        const error = err as AxiosError;
        console.error('글 불러오기 에러:', error.response?.data);
      }
    };

    fetchPostData();
  }, [token, keyword]);
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

      {bestposts.length === 0 ? (
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
              {bestposts.map((post) => (
                <BestPost key={post.id} {...post} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
