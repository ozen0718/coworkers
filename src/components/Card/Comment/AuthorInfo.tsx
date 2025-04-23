"use client";

import Image from "next/image";
import { useState } from "react";

// 임시 데이터
export default function AuthorInfo({
  showDivider = true, // 선 유무
  showLike = true,
  authorName = "우지은",
  date = "2024.07.25",
  profileSpacing = "6px", // 프로필, 이름, 선 간격
}) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex items-center w-full text-xs mt-3 justify-between">
      <div className="flex items-center" style={{ columnGap: profileSpacing }}>
        <Image
          src="/icons/initialprofile.svg"
          alt="프로필 사진"
          width={32}
          height={32}
        />
        <span className="block">{authorName}</span>
        {showDivider && (
          <div className="border-l-2 border-slate-700 h-[12px]"></div>
        )}
        <span className="text-gray400">{date}</span>
      </div>

      {showLike && (
        <div className="flex items-center">
          <Image
            className="cursor-pointer mr-1"
            src={isLiked ? "/icons/heart-filled.svg" : "/icons/heart.svg"}
            alt="좋아요"
            width={16}
            height={16}
            onClick={toggleLike}
          />
          <span className="text-gray400">9999+</span>
        </div>
      )}
    </div>
  );
}
