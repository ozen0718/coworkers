'use client';

import IconPlus from '@/assets/icons/IconPlus';
import IconDelete from '@/assets/icons/IconDelete';
import { useState, useRef } from 'react';

export default function ImgUpload() {
  const [image, setImage] = useState<string | null>();
  const fileInput = useRef<HTMLInputElement>(null);

  /* 이미지 삭제 */
  const handleDeleteImage = () => {
    setImage(null);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };

  return (
    <div
      className="bg-bg200 relative flex aspect-square max-h-[282px] w-full max-w-[282px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-[#F8FAFC1A]"
      onClick={() => fileInput.current?.click()}
    >
      {image ? (
        <div className="aspect-square w-full">
          <img src={image} alt="업로드 이미지" className="h-full w-full object-cover opacity-50" />
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
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          console.log('file', file);

          // 10MB 초과 검사
          if (file.size > 10 * 1024 * 1024) {
            alert('10MB 이하의 이미지만 업로드 가능합니다.');
            e.target.value = ''; // 파일 선택 초기화
            return;
          }

          const imageUrl = URL.createObjectURL(file);
          setImage(imageUrl);
        }}
      />
    </div>
  );
}
