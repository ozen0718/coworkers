'use client';

import Image from 'next/image';
import clsx from 'clsx';
import AuthorInfo from '../Comment/AuthorInfo';
import PostDropdown from '../Post/PostDropdown';
import { useState } from 'react';
import { PostCardProps } from '../CardType';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteArticle } from '@/api/articles';
import { useQueryClient } from '@tanstack/react-query';

const sizeClass = {
  large: 'min-h-[176px] w-full',
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
  image,
  date,
  id,
  showKebab = false,
  topshowKebab = true,
  likeCount,
  writer,
}: PostCardProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const handleTitleClick = () => {
    if (id) router.push(`/boards/${id}`);
  };

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  /* Dropdown 게시글 수정 */
  const handleEdit = () => {
    router.push(`/boards/${id}/edit`);
  };

  /* Dropdown 게시글 삭제 */
  const handleDelete = async () => {
    deleteMutate();
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () => deleteArticle(Number(id)),
    onSuccess: () => {
      console.log('게시글 삭제 성공');
      queryClient.invalidateQueries({ queryKey: ['generalPosts'] });
    },
    onError: (err: AxiosError) => {
      console.error('게시글 삭제 에러:', err.response?.data);
    },
  });

  return (
    <div
      className={clsx(
        'border-bg100 bg-bg200 flex w-full flex-col gap-1.5 rounded-xl border p-5',
        type === 'best' ? 'max-h-[220px] w-full' : sizeClass[size]
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
      <div className="flex w-full cursor-pointer items-start">
        <div
          className="relative flex w-full items-start justify-between"
          onClick={handleTitleClick}
        >
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
            onClick={(e) => e.stopPropagation()} // 부모 이벤트 막기
          >
            {image ? (
              <Image
                className="aspect-square min-w-[72px] rounded-lg object-cover"
                src={image}
                alt="게시글 이미지"
                width={72}
                height={72}
                sizes="(max-width: 600px) 50vw, 72px"
              />
            ) : (
              <div className="aspect-square h-[72px] w-[72px] min-w-[72px] rounded-lg bg-transparent" />
            )}

            {type === 'general' && topshowKebab && (
              <Image
                className="absolute top-0 right-0 cursor-pointer"
                src="/icons/kebab.svg"
                alt="옵션"
                width={24}
                height={24}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown();
                }}
              />
            )}
          </div>
          {isDropDownOpen && (
            <PostDropdown
              type="kebab"
              textJustify="center"
              onClick={(e) => e.stopPropagation()}
              options={[
                { label: '수정하기', value: '수정', action: handleEdit },
                { label: '삭제하기', value: '삭제', action: handleDelete },
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
          showKebab={showKebab && size === 'small'}
          showDate={type === 'general' && size !== 'small' ? true : false}
          showDivider={type === 'general' && size !== 'small' ? true : false}
          likeCount={likeCount}
          authorName={writer?.nickname}
        />
      </div>
    </div>
  );
}
