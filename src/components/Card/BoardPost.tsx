'use client';

import Image from 'next/image';
import AuthorInfo from './Comment/AuthorInfo';
import clsx from 'clsx';
import { useWindowSize } from '@/hooks/useWindowSize';

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
          <p className="mr-2 line-clamp-4 max-w-[251px] overflow-hidden text-sm font-medium sm:mr-0 sm:line-clamp-3 sm:text-lg">
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
export function GeneralPost() {
  const windowWidth = useWindowSize();

  let size: 'large' | 'medium' | 'small' = 'large';
  if (windowWidth <= 375) size = 'small';
  else if (windowWidth <= 744) size = 'medium';

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

  return (
    <div className={clsx('bg-bg200 flex w-full flex-col rounded-xl p-5', sizeClass[size])}>
      <div className="flex w-full items-start justify-between">
        <div className="relative flex w-full items-start">
          <p
            className={clsx(
              'mr-2 block max-h-[56px] min-h-[40px] w-[251px] pr-6 font-medium',
              fontClass[size]
            )}
          >
            자유게시판에 질문을 올릴 수 있어요 질
          </p>

          <div className="relative min-h-[72px] min-w-[112px]">
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

            <Image
              className="absolute top-0 right-0 cursor-pointer"
              src="/icons/kebab.svg"
              alt="Kebab Icon"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>

      <AuthorInfo />
    </div>
  );
}
