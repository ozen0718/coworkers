'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import PostCard from './PostCard';
import { BestPostProps } from '../CardType';
import { useEffect } from 'react';

/**
 * title="자유게시판에 질문을 올릴 수 있어요 질문을 올려볼까요?"
 * imgUrl="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1855/testimage.jpg"
 * date="2024.07.25"
 */

export function BestPost({ id, title, imgUrl, date }: BestPostProps) {
  return (
    <div className="w-full">
      <PostCard type="best" title={title} imgUrl={imgUrl} date={date} id={id} />
    </div>
  );
}
