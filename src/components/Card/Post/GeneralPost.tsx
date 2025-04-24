'use client';

import PostCard from './PostCard';
import { useWindowSize } from '@/hooks/useWindowSize';

export function GeneralPost() {
  const windowWidth = useWindowSize();

  let size: 'large' | 'medium' | 'small' = 'large';
  if (windowWidth <= 375) size = 'small';
  else if (windowWidth <= 744) size = 'medium';

  return (
    <PostCard
      type="general"
      size={size}
      title="자유게시판에자유게시판에자유게시판에자유게시판에자유게시판에자유게시판에dddddddddddddddddddd안녕자고싶다 이것들아ㅇㅇ"
      imgUrl="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1855/testimage.jpg"
      date="2024.07.25"
      showKebab={size == 'small'}
      topshowKebab={size !== 'small'}
    />
  );
}
