'use client';

import Image from 'next/image';
import AuthorInfo from './Comment/AuthorInfo';

const testimgurl =
  'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1855/testimage.jpg';

export interface BoardPostProps {
  type: 'best' | 'general';
}

export function BestPost() {
  return (
    <div className="bg-bg200 h-[300px] max-h-[220px] max-w-[387px] rounded-xl p-3">
      <div className="mr-4 flex">
        <Image src="/icons/best.svg" alt="베스트 아이콘" width={16} height={16} />
        <span className="text-md-semibold">Best</span>
      </div>
      <div>
        <div className="mt-5 flex justify-between">
          <span className="mr-1 text-sm sm:text-lg">
            자유게시판에 질문을 올릴 수 있어요 질문을 올려볼까요?
          </span>
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
        <div className="text-md-medium text-gray400 mt-6">2024.07.25</div>
      </div>
      <AuthorInfo showDate={false} showDivider={false} />
    </div>
  );
}

export function GeneralPost() {
  return <div>나는 일반글</div>;
}

export function BoardPost({ type }: BoardPostProps) {
  return <div>{type === 'best' ? <BestPost /> : <GeneralPost />}</div>;
}
