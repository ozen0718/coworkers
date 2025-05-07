'use client';

import PostCard from './PostCard';
import { useWindowSize } from '@/hooks/useWindowSize';

/**
 * title="자유게시판에 질문을 올릴 수 있어요. 질문을 올려볼까요? 말줄임표 테스트 되는지 볼까요?"
 *  imgUrl="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1855/testimage.jpg"
 * date="2024.07.25"
 *  showKebab={size == 'small'}
 * topshowKebab={size !== 'small'}
 */

type GeneralPostProps = {
  title: string;
  imgUrl: string;
  date: string;
};

export function GeneralPost({ title, imgUrl, date }: GeneralPostProps) {
  const windowWidth = useWindowSize();

  let size: 'large' | 'medium' | 'small' = 'large';
  if (windowWidth <= 375) size = 'small';
  else if (windowWidth <= 744) size = 'medium';

  return (
    <PostCard
      type="general"
      size={size}
      title={title}
      imgUrl={imgUrl}
      date={date}
      showKebab={size === 'small'}
      topshowKebab={size !== 'small'}
    />
  );
}
