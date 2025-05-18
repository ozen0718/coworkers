'use client';
import Image from 'next/image';
import { useState } from 'react';
import AuthorInfo from '../../Comment/AuthorInfo';
import Button from '@/components/common/Button/Button';
import IconDelete from '@/assets/icons/IconDelete';
import IconCheck from '@/assets/icons/IconCheck';
import { DateInfo } from './DateInfo';
import { TodoCardReplyInput } from '@/components/common/Inputs';
import BoardComment from '@/components/Card/Comment/BoardComment';

type DetailPostProps = {
  title?: string;
  onClose: () => void;
  showComplete: boolean;
};

export default function DetailPost({ title, onClose, showComplete }: DetailPostProps) {
  const [isComplete, setIsComplete] = useState(showComplete);

  const handleToggleComplete = () => {
    setIsComplete((prev) => !prev);
  };

  return (
    <div
      style={{ borderLeft: '1px solid var(--Border-Primary, #F8FAFC1A)' }}
      className="bg-bg200 relative flex h-full min-h-[698px] w-full flex-col gap-[10px] overflow-x-hidden p-5"
    >
      <div className="text-lg-regular mt-5 flex w-full items-start justify-between">
        <IconDelete className="cursor-pointer" onClick={onClose} />
      </div>

      <div className="flex flex-col">
        {isComplete && (
          <div className="flex items-center gap-1">
            <IconCheck color="#a3e635" />
            <p className="text-tertiary text-xs font-medium">완료</p>
          </div>
        )}
        <div className="text-xl-bold mt-2 flex items-center md:w-[747px]">
          <span className={isComplete ? 'line-through' : ''}>{title}</span>
          <Image
            className="ml-auto flex h-[24px] min-h-[21px] max-w-[699px] cursor-pointer"
            src="/icons/kebab.svg"
            alt="Kebab Icon"
            width={24}
            height={24}
          />
        </div>
      </div>

      <div className="w-full max-w-[739px]">
        <AuthorInfo type="detail" showLike={false} showDivider={false} />
      </div>

      {!isComplete && (
        <div className="mt-2">
          <DateInfo date="2025-04-25T00:00:00Z" time="15:30" repeatinfo="DAILY" />
        </div>
      )}

      <div>
        <span className="scroll-area text-md-regular mt-2 block min-h-[300px] w-full overflow-x-hidden overflow-y-auto leading-[17px]">
          필수 정보 10분 입력하면 3일 안에 법인 설립이 완료되는 법인 설립 서비스의 장점에 대해
          상세하게 설명드리기 (api 연결 후 데이터로 변경)
        </span>
      </div>

      <div className="mt-2">
        <TodoCardReplyInput />
      </div>

      <div className="scroll-area max-h-[400px] w-full overflow-y-auto">
        {/*<BoardComment commentId={234} writer={1234} type="list" content="테스트" />
        <BoardComment type="list" content="테스트2" />
        <BoardComment type="list" content="테스트3" />
        <BoardComment type="list" content="테스트4" />*/}
      </div>

      <Button
        variant={isComplete ? 'cancel' : 'complete'}
        size={isComplete ? 'cancel' : 'complete'}
        icon="check"
        className="absolute right-5 bottom-5"
        onClick={handleToggleComplete}
      >
        {isComplete ? '완료 취소하기' : '완료하기'}
      </Button>
    </div>
  );
}
