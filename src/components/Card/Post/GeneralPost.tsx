'use client';

import PostCard from './PostCard';
import { useWindowSize } from '@/hooks/useWindowSize';
import { GeneralPostProps } from '../CardType';
import { useEffect, useState } from 'react';
import axiosInstance from '@/app/api/axiosInstance';
import { AxiosError } from 'axios';

/**
 * title="자유게시판에 질문을 올릴 수 있어요. 질문을 올려볼까요? 말줄임표 테스트 되는지 볼까요?"
 *  imgUrl="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1855/testimage.jpg"
 * date="2024.07.25"
 *  showKebab={size == 'small'}
 * topshowKebab={size !== 'small'}
 */

export function GeneralPost({ id, title, imgUrl, date }: GeneralPostProps) {
  const windowWidth = useWindowSize();
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  const [generalPost, setGeneralPost] = useState();

  let size: 'large' | 'medium' | 'small' = 'large';
  if (windowWidth <= 375) size = 'small';
  else if (windowWidth <= 744) size = 'medium';

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axiosInstance.get('/13-4/articles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGeneralPost(response.data);
        console.log('글', generalPost);
        console.log('글2', response.data);
      } catch (err) {
        const error = err as AxiosError;
        console.error('글 불러오기 에러:', error.response?.data);
      }
    };
    fetchPostData();
  }, []);

  return (
    <div className="w-full">
      <PostCard
        type="general"
        size={size}
        id={id}
        title={title}
        imgUrl={imgUrl}
        date={date}
        showKebab={size === 'small'}
        topshowKebab={size !== 'small'}
      />
    </div>
  );
}
