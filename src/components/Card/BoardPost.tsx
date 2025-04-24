'use client';

import Image from 'next/image';
import AuthorInfo from './Comment/AuthorInfo';
import clsx from 'clsx';

const testimgurl =
  'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1855/testimage.jpg';

/* 베스트 글 */
export function BestPost() {
  return (
    <div className="bg-bg200 h-[300px] max-h-[220px] max-w-[387px] cursor-pointer rounded-xl p-5">
      <div className="mr-4 flex">
        <Image src="/icons/best.svg" alt="베스트 아이콘" width={16} height={16} />
        <p className="text-md-semibold">Best</p>
      </div>
      <div>
        <div className="mt-3 flex justify-between">
          <p className="mr-2 line-clamp-4 max-w-[251px] overflow-hidden text-sm sm:mr-0 sm:line-clamp-3 sm:text-lg">
            자유게시판에 질문을 올릴 수 있어요 질문을 올려볼까요?
          </p>

          <div className="min-h-[72px] min-w-[72px]">
            {testimgurl ? (
              <Image
                className="aspect-square rounded-lg"
                src={testimgurl}
                alt="자유게시판 이미지"
                width={72}
                height={72}
                sizes="(max-width: 600px) 50vw, 72px"
              />
            ) : (
              <div className="aspect-square min-h-[64px] min-w-[64px] rounded-lg" />
            )}
          </div>
        </div>
        <div className="text-md-medium text-gray400 mt-4">2024.07.25</div>
      </div>

      <AuthorInfo showDate={false} showDivider={false} />
    </div>
  );
}

/* 일반 글 */
interface GeneralPostProps {
  size?: 'large' | 'medium' | 'small';
}

export function GeneralPost({ size = 'large' }: GeneralPostProps) {
  const sizeClass = {
    large: 'min-h-[176px] max-w-[598px]',
    medium: 'min-h-[176px] max-w-[696px]',
    small: 'min-h-[162px] max-w-[343px]',
  };

  const textClass = {
    largemedium: 'text-lg leading-[28px]',
    small: 'text-sm leading-[24px] ',
  };

  return (
    <div className={clsx('bg-bg200 flex w-full flex-col rounded-xl p-5', sizeClass[size])}>
      <div className="text-lg-regular flex w-full items-start justify-between">
        <div className="relative flex w-full items-start">
          <span className="mr-2 block max-h-[50px] min-h-[40px] pr-6 font-medium">
            자유게시판에 질문을 올릴 수 있어요 질문을 올려볼까요? ...
          </span>
          <Image
            className="absolute top-0 right-0 cursor-pointer"
            src="/icons/kebab.svg"
            alt="Kebab Icon"
            width={16}
            height={16}
          />
        </div>
      </div>

      <AuthorInfo />
    </div>
  );
}
