'use client';

import Image from 'next/image';
import clsx from 'clsx';
import AuthorInfo from '../Comment/AuthorInfo';
import PostDropdown from '../Post/PostDropdown';
import { useState } from 'react';

type PostCardProps = {
  type?: 'best' | 'general';
  size?: 'large' | 'medium' | 'small';
  title: string;
  imgUrl?: string;
  date?: string;
  showKebab?: boolean;
  topshowKebab?: boolean;
};

const sizeClass = {
  large: 'min-h-[176px] max-w-[590px]',
  medium: 'min-h-[176px] max-w-[696px]',
  small: 'min-h-[162px] max-w-[343px]',
};

const fontClass = {
  large: 'text-lg leading-[24px]',
  medium: 'text-lg leading-[24px]',
  small: 'text-sm leading-[28px]',
};

export default function PostCard({
  type = 'general',
  size = 'large',
  title,
  imgUrl,
  date,
  showKebab = false,
  topshowKebab = true,
}: PostCardProps) {
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
    <div
      className={clsx(
        'border-bg100 bg-bg200 flex flex-col gap-1.5 rounded-xl border p-5',
        type === 'best' ? 'max-h-[220px] max-w-[387px]' : sizeClass[size]
      )}
    >
      {/* 헤더 */}
      {type === 'best' && (
        <div className="mr-4 flex">
          <Image src="/icons/best.svg" alt="베스트 아이콘" width={16} height={16} />
          <p className="text-md-semibold ml-1">Best</p>
        </div>
      )}

      {/* 내용 */}
      <div className="flex w-full items-start">
        <div className="relative flex w-full items-start justify-between">
          <p
            className={clsx(
              'mr-2 line-clamp-2 pr-6',
              type === 'best' ? 'text-sm leading-[24px] sm:text-lg' : fontClass[size]
            )}
          >
            {title}
          </p>

          <div
            className={clsx(
              'relative',
              type === 'best' ? 'min-w-[72px]' : size === 'small' ? 'min-w-[72px]' : 'min-w-[112px]'
            )}
          >
            {imgUrl ? (
              <Image
                className="aspect-square rounded-lg object-cover"
                src={imgUrl}
                alt="게시글 이미지"
                width={72}
                height={72}
                sizes="(max-width: 600px) 50vw, 72px"
              />
            ) : (
              <div className="aspect-square min-w-[64px] rounded-lg" />
            )}

            {type === 'general' && topshowKebab && (
              <Image
                className="absolute top-0 right-0 cursor-pointer"
                src="/icons/kebab.svg"
                alt="옵션"
                width={24}
                height={24}
                onClick={toggleDropdown}
              />
            )}
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
              toppercent="30%"
            />
          )}
        </div>
      </div>

      {/* 날짜 */}
      {(type === 'best' || (type === 'general' && size === 'small')) && (
        <p className={clsx('text-xs-medium text-gray400 mt-2', type === 'best' && 'mt-4')}>
          {date}
        </p>
      )}

      {/* 작성자 정보 */}
      <div>
        <AuthorInfo
          showKabab={showKebab && size === 'small'}
          showDate={type === 'general' && size !== 'small' ? true : false}
          showDivider={type === 'general' && size !== 'small' ? true : false}
        />
      </div>
    </div>
  );
}
