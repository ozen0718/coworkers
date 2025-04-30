'use client';
import Image from 'next/image';
import { useState } from 'react';
import PostDropdown from '@/components/Card/Post/PostDropdown';
import AuthorInfo from '@/components/Card/Comment/AuthorInfo';

export default function ArticleDetail() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  /* Dropdown 수정 */
  const handleEdit = () => {
    setIsEditing(true);
  };

  /* Dropdown 삭제 */
  const handleDelete = () => {
    console.log('삭제 눌렀다.');
  };

  return (
    <div className="bg-bg300 flex min-h-screen flex-col items-center text-white">
      <div className="w-full max-w-[1200px] px-4">
        {/* 타이틀 + 작성 정보 */}
        <div className="max-h-[128px] w-full flex-col">
          {/* 타이틀 영역 */}
          <div className="mt-10 flex w-full max-w-[1200px] items-center justify-between">
            <p className="text-gray100 text-2lg-medium flex font-bold">게시물 제목 영역입니다.</p>
            <Image
              className="cursor-pointer"
              src="/icons/kebab.svg"
              alt="Kebab Icon"
              width={16}
              height={16}
              onClick={toggleDropdown}
            />
          </div>
          {isDropDownOpen && (
            <PostDropdown
              type="kebab"
              textJustify="center"
              options={[
                { label: '수정', action: handleEdit },
                { label: '삭제', action: handleDelete },
              ]}
              isOpen={isDropDownOpen}
              toggleDropdown={toggleDropdown}
              toppercent="15%"
            />
          )}
          <div className="my-4 h-px w-full bg-[#F8FAFC1A]" />

          <AuthorInfo
            showDivider={true}
            showLike={true}
            showDate={true}
            showKebab={false}
            showComment={true}
          />
        </div>
      </div>
    </div>
  );
}
