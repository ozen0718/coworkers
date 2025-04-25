'use client';
import Image from 'next/image';
import AuthorInfo from './AuthorInfo';
import { useState } from 'react';
import PostDropdown from '../Post/PostDropdown';

type BoardCommentProps = {
  type?: 'free' | 'list';
};

export default function BoardComment({ type }: BoardCommentProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  /* 수정 함수 */
  const handleEdit = () => {
    console.log('수정 눌렀다.');
  };

  /* 삭제 함수 */
  const handleDelete = () => {
    console.log('삭제 눌렀다.');
  };

  return (
    <div className="bg-bg200 relative flex min-h-[113px] w-full max-w-[1200px] flex-col rounded-lg p-5 lg:h-[123px]">
      <div className="text-lg-regular flex w-full items-start justify-between">
        <div className="relative flex w-full items-start">
          <span className="scroll-area mr-2 block max-h-[50px] min-h-[40px] overflow-x-hidden overflow-y-auto pr-6">
            댓글 영역입니다.dd
          </span>
          <Image
            className="absolute top-0 right-0 cursor-pointer"
            src="/icons/kebab.svg"
            alt="Kebab Icon"
            width={16}
            height={16}
            onClick={toggleDropdown}
          />
        </div>
      </div>

      {/* 드롭다운이 kebab 아이콘 밑에 나타나도록 absolute로 위치 설정 */}
      {isDropDownOpen && (
        <PostDropdown
          type="kebab"
          textJustify="center"
          options={[
            { label: '수정', action: handleEdit }, // 수정 옵션
            { label: '삭제', action: handleDelete }, // 삭제 옵션
          ]}
          isOpen={isDropDownOpen}
          toggleDropdown={toggleDropdown}
          toppercent="30%"
        />
      )}

      <div className="flex-grow">
        <AuthorInfo showDivider={type !== 'free'} showLike={type !== 'free'} />
      </div>
    </div>
  );
}
