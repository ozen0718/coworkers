'use client';

import Image from 'next/image';
import { useState } from 'react';

// 임시 데이터
export default function AuthorInfo({
  showDivider = true, // 선 유무
  showLike = true,
  authorName = '우지은',
  date = '2024.07.25',
  profileSpacing = '7px', // 프로필, 이름, 선 간격
}) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="mt-3 flex w-full items-center justify-between text-[10px] sm:text-sm">
      <div className="flex items-center sm:flex-nowrap" style={{ columnGap: profileSpacing }}>
        <Image src="/icons/initialprofile.svg" alt="프로필 사진" width={32} height={32} />
        <span className="block">{authorName}</span>
        {showDivider && <div className="h-[12px] border-l-2 border-slate-700"></div>}
        <span className="text-gray400">{date}</span>
      </div>

      {showLike && (
        <div className="ml-2 flex items-center">
          <Image
            className="mr-1 cursor-pointer"
            src={isLiked ? '/icons/heart-filled.svg' : '/icons/heart.svg'}
            alt="좋아요"
            width={16}
            height={16}
            onClick={toggleLike}
          />
          <span className="text-gray400">9999+</span>
        </div>
      )}
    </div>
    /**
     * @fixme api 연결 후 좋아요 개수, 좋아요 여부 데이터로 변경
     */
  );
}
