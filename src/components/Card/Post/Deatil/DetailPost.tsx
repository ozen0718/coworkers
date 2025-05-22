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
import { createComment } from '@/api/detailPost';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { fetchComment } from '@/api/detailPost';
import { useQueryClient } from '@tanstack/react-query';
import { CommentDetail } from '../../CardType';
import PostDropdown from '../PostDropdown';
import clsx from 'clsx';

type DetailPostProps = {
  taskid?: number;
  title?: string;
  onClose: () => void;
  showComplete: boolean;
  date?: string;
  time?: string;
};

//const taskId = 3704; // 예시 id 추후 수정

export default function DetailPost({
  taskid,
  title,
  date,
  time,
  onClose,
  showComplete,
}: DetailPostProps) {
  const [isComplete, setIsComplete] = useState(showComplete);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const queryClient = useQueryClient();

  if (!taskid) {
    console.log('아이디 없음');
    return;
  }

  /* 댓글 내용 */
  const { data: commentData } = useQuery({
    queryKey: ['comments', taskid],
    queryFn: () => fetchComment(taskid),
  });

  /* 댓글 작성 */
  const handleSubmit = (content: string) => {
    if (!taskid) {
      console.log('아이디 없음');
      return;
    }
    if (!content.trim()) {
      console.log('내용 없음');
      toast.error('댓글 내용이 없습니다');
      return;
    }
    mutation.mutate(content);
  };

  const mutation = useMutation({
    mutationFn: (content: string) => createComment(taskid, { content }),
    onSuccess: () => {
      console.log('댓글 작성 성공');
      toast.success('댓글이 작성되었습니다');
      queryClient.invalidateQueries({ queryKey: ['comments', taskid] });
    },
    onError: (error: AxiosError) => {
      console.error('댓글 작성 실패', error.message);
      toast.error('댓글 작성에 실패했습니다');
    },
  });

  /* 케밥 드롭다운 */
  const handleToggleComplete = () => {
    setIsComplete((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  /* 할 일 삭제 */
  const handleDelete = async () => {
    console.log('할 일 삭제');
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
        <div className="mt-2 flex items-center md:w-[747px]">
          <span className={clsx('text-xl-bold', isComplete && 'line-through')}>{title}</span>
          <Image
            className="ml-auto flex h-[24px] min-h-[21px] max-w-[699px] cursor-pointer"
            src="/icons/kebab.svg"
            alt="Kebab Icon"
            width={24}
            height={24}
            onClick={toggleDropdown}
          />
          {isDropDownOpen && (
            <PostDropdown
              type="detail"
              textJustify="center"
              options={[{ label: '삭제', value: '삭제', action: handleDelete }]}
              isOpen={isDropDownOpen}
              toggleDropdown={toggleDropdown}
              toppercent="12%"
            />
          )}
        </div>
      </div>

      <div className="w-full max-w-[739px]">
        <AuthorInfo
          type="detail"
          date={commentData?.data.createdAt}
          showLike={false}
          showDivider={false}
        />
      </div>

      {!isComplete && (
        <div className="mt-2">
          <DateInfo date={date ?? ''} time={time} repeatinfo="DAILY" />
        </div>
      )}

      <div>
        <span className="scroll-area text-md-regular mt-2 block min-h-[300px] w-full overflow-x-hidden overflow-y-auto leading-[17px]">
          필수 정보 10분 입력하면 3일 안에 법인 설립이 완료되는 법인 설립 서비스의 장점에 대해
          상세하게 설명드리기 (api 연결 후 데이터로 변경)
        </span>
      </div>

      <div className="mt-2">
        <TodoCardReplyInput onSubmit={handleSubmit} />
      </div>

      <div className="scroll-area max-h-[400px] w-full overflow-y-auto">
        {commentData?.data?.map((comment: CommentDetail) => (
          <BoardComment
            type="list"
            taskId={taskid}
            key={comment.id}
            commentId={comment.id}
            writer={{ id: comment.user?.id ?? 0 }}
            content={comment.content}
            author={comment.user?.nickname}
            date={comment.createdAt}
          />
        ))}
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
