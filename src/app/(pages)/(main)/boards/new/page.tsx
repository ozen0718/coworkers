'use client';
import { TextAreaInput } from '@/components/common/Inputs';
import ImgUpload from '@/components/Card/ImgUpload';
import Button from '@/components/common/Button/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { createArticle } from '@/api/articles';

export default function CreateBoard() {
  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const handleSubmit = async () => {
    try {
      const payload = {
        title,
        content,
        ...(image && { image }),
      };

      if (title.trim() === '' || content.trim() === '') {
        toast.error('제목과 내용을 모두 입력해주세요.');
        return;
      }

      const response = await createArticle(payload);

      console.log('글 작성 성공:', response.data);
      router.push('/boards');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('게시 실패:', axiosError.message);
    }
  };

  return (
    <div className="my-14 max-h-[841px]">
      <ToastContainer position="top-center" />
      {/* 타이틀 + 버튼 */}
      <div className="flex items-center justify-between">
        <p className="text-xl-bold flex">게시글 쓰기</p>
        <div className="relative max-[620px]:hidden">
          <button
            onClick={handleSubmit}
            disabled={!title || !content}
            className={`text-lg-semibold max-[620px]:text-md-semibold flex h-12 w-[184px] items-center justify-center rounded-xl text-white max-[620px]:h-8 max-[620px]:w-[100px] ${
              !title || !content
                ? 'cursor-not-allowed bg-gray-400 opacity-50'
                : 'bg-primary hover:bg-primary-hover active:bg-primary-pressed'
            }`}
          >
            등록
          </button>
        </div>
      </div>

      <div className="my-4 mt-10 h-px w-full bg-[#F8FAFC1A]" />

      {/* 제목 + 내용 + 이미지 */}
      <div className="text-lg-medium mt-15 max-h-[713px] flex-col gap-4">
        <div className="flex flex-col gap-4">
          <p>
            <span className="text-tertiary mr-2">*</span>제목{' '}
          </p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="제목을 입력해주세요."
            className="text-md-regular bg-bg200 border-gray100/10 focus:border-primary hover:border-primary-hover text-4 text-lg-regular placeholder:text-gray500 h-[48px] w-full resize-none rounded-xl border px-4 py-3 focus:outline-none"
          />
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <p>
            <span className="text-tertiary mr-2">*</span>내용{' '}
          </p>
          <TextAreaInput
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요"
            height="h-[204px]"
          />
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <p>이미지</p>
          <ImgUpload onImageUpload={(url) => setImage(url)} />
        </div>

        {/* 모바일용 버튼 */}
        <div onClick={handleSubmit} className="mt-10 flex justify-center min-[620px]:hidden">
          <Button
            size="large"
            disabled={!title || !content}
            className={!title || !content ? 'cursor-not-allowed bg-gray-400 opacity-50' : ''}
          >
            등록
          </Button>
        </div>
      </div>
    </div>
  );
}
