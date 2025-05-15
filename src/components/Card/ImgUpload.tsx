'use client';

import IconPlus from '@/assets/icons/IconPlus';
import IconDelete from '@/assets/icons/IconDelete';
import { useState, useRef } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useAuthStore } from '@/stores/useAuthStore';

interface ImgUploadProps {
  onImageUpload: (url: string) => void;
  previewUrl?: string;
}

export default function ImgUpload({ onImageUpload, previewUrl }: ImgUploadProps) {
  const [image, setImage] = useState<string | null>();
  const fileInput = useRef<HTMLInputElement>(null);

  const token = useAuthStore((state) => state.accessToken);

  /* 이미지 삭제 */
  const handleDeleteImage = () => {
    setImage(null);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
    onImageUpload('');
  };

  const displayedImage = image || previewUrl || undefined;

  return (
    <div
      className="bg-bg200 relative flex aspect-square max-h-[282px] w-full max-w-[282px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-[#F8FAFC1A]"
      onClick={() => fileInput.current?.click()}
    >
      {displayedImage ? (
        <div className="aspect-square w-full">
          <img
            src={displayedImage}
            alt="업로드 이미지"
            className="h-full w-full object-cover opacity-50"
          />
          <IconDelete
            width={40}
            height={40}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // 상위 이벤트 전파 막기
              handleDeleteImage();
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <IconPlus width={48} height={48} color="#9CA3AF" />
          <div className="text-lg-regular text-[#9CA3AF]">이미지 등록</div>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          console.log('file', file);

          // 10MB 초과 검사
          if (file.size > 10 * 1024 * 1024) {
            alert('10MB 이하의 이미지만 업로드 가능합니다.');
            e.target.value = ''; // 파일 선택 초기화
            return;
          }

          // 1. 업로드 전, 임시 미리보기 보여주기
          const tempUrl = URL.createObjectURL(file);
          setImage(tempUrl);

          // 2. 서버로 업로드
          const formData = new FormData();
          formData.append('image', file);

          try {
            const response = await axiosInstance.post('/images/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            });

            const uploadedUrl = response.data.url;
            setImage(uploadedUrl);
            onImageUpload(uploadedUrl); // 부모 전달
          } catch (error) {
            console.error('이미지 업로드 실패:', error);
          }
        }}
      />
    </div>
  );
}
