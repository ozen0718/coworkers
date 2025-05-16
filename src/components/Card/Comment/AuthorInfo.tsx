'use client';

import Image from 'next/image';
import IconHeart from '@/assets/icons/IconHeart';
import { AuthorInfoProps } from '../CardType';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/useAuthStore';
import { addLike, deleteLike } from '@/api/articles';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

export default function AuthorInfo({
  type,
  showDivider = true,
  showLike = true,
  showDate = true,
  authorName = '안혜나',
  date = '2025-05-10',
  showKebab = false,
  showComment = false,
  likeCount,
  commentCount,
  articleId,
  isLiked,
  onLikeChanged,
}: AuthorInfoProps) {
  const dateOnly = date.split('T')[0];

  const token = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  /* 좋아요 */
  const handleLike = async () => {
    if (!token) {
      console.warn('토큰이 없습니다.');
      return;
    }

    try {
      if (isLiked) {
        await deleteLike(Number(articleId));
      } else {
        await addLike(Number(articleId));
      }
      onLikeChanged?.();
      queryClient.invalidateQueries({ queryKey: ['bestPosts'] });
      queryClient.invalidateQueries({ queryKey: ['generalPosts'] });
    } catch (err) {
      const error = err as AxiosError;
      console.error('좋아요 요청 실패:', error);
    }
  };

  // 상세 카드 일때만
  if (type === 'detail') {
    return (
      <div className="mt-3 flex w-full items-center justify-between text-[10px] sm:text-sm">
        {/* 프로필 + 이름 */}
        <div className="flex items-center gap-[7px]">
          <Image src="/icons/initialprofile.svg" alt="프로필 사진" width={32} height={32} />
          {authorName && <span className="block">{authorName}</span>}
        </div>

        {/* 오른쪽: 날짜 */}
        {showDate && <span className="text-gray400 whitespace-nowrap">{date}</span>}
      </div>
    );
  }

  // 기본
  return (
    <div className="mt-3 flex w-full items-center text-[10px] sm:text-sm">
      {/* 프로필 + 이름 + 구분선 */}
      <div className="flex items-center gap-[7px]">
        <Image src="/icons/initialprofile.svg" alt="프로필 사진" width={32} height={32} />
        {authorName && <span className="block">{authorName}</span>}
        {showDivider && <div className="h-[12px] border-l-2 border-slate-700"></div>}
      </div>

      {/* 날짜 */}
      {showDate && (
        <span className={`text-gray400 whitespace-nowrap ${showDivider ? 'ml-[10px]' : 'ml-auto'}`}>
          {dateOnly}
        </span>
      )}

      {/* 좋아요, 댓글, 케밥 아이콘 */}
      <div className="ml-auto flex items-center">
        {showComment && (
          <div className="mr-4 flex">
            <Image
              className="mr-1.5 cursor-pointer"
              src="/icons/comment.svg"
              alt="comment Icon"
              width={16}
              height={16}
            />
            <p className="text-gray400">{commentCount}</p>
          </div>
        )}

        {showLike && (
          <div className="flex items-center">
            <IconHeart
              onClick={handleLike}
              className="mr-1.5 cursor-pointer"
              fillColor={isLiked ? 'var(--color-danger)' : 'none'}
              strokeColor={isLiked ? 'var(--color-danger)' : 'var(--color-gray500)'}
            />
            <span className="text-gray400">{likeCount}</span>
          </div>
        )}

        {showKebab && (
          <Image
            className="ml-1 cursor-pointer"
            src="/icons/kebab.svg"
            alt="Kebab Icon"
            width={16}
            height={16}
          />
        )}
      </div>
    </div>
  );
}
