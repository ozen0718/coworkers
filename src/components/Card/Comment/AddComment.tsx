'use client';

import { TextAreaInput } from '@/components/common/Inputs';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { createComment } from '@/app/api/articles';
import { useAuthStore } from '@/stores/useAuthStore';

interface AddCommentProps {
  articleId: number;
  onSuccess?: () => void;
}

export default function AddComment({ articleId, onSuccess }: AddCommentProps) {
  const [content, setContent] = useState('');

  const token = useAuthStore((state) => state.accessToken);

  /* 댓글 작성 */
  const handleSubmit = async () => {
    if (!articleId || !token) {
      console.log('토큰이나 아이디 없음');
      return;
    }

    try {
      const response = await createComment(articleId, token, { content });
      console.log('댓글 작성 성공:', response.data);
      setContent('');
      onSuccess?.();
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('댓글 작성 실패', axiosError.message);
    }
  };

  return (
    <div className="flex min-h-[113px] w-full max-w-[1200px] flex-col bg-transparent lg:h-[216px]">
      <div className="mr-0.5 flex w-full items-start justify-between text-base font-bold sm:text-xl sm:font-medium">
        댓글달기
      </div>
      <div className="mt-3 p-0.5">
        <TextAreaInput
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="내용을 입력해주세요"
          height="h-[104px]"
        />
      </div>{' '}
      <div className="mt-2 flex justify-end">
        <button
          onClick={handleSubmit}
          className="text-lg-semibold bg-primary hover:bg-primary-hover active:bg-primary-pressed max-[620px]:text-md-semibold flex h-12 w-[184px] items-center justify-center rounded-xl text-white max-[620px]:h-8 max-[620px]:w-[100px]"
        >
          등록
        </button>
      </div>
    </div>
  );
}
