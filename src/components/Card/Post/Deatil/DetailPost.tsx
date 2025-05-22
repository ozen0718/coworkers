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
import { createComment, deleteTask } from '@/api/detailPost';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { fetchComment } from '@/api/detailPost';
import { useQueryClient } from '@tanstack/react-query';
import { CommentDetail } from '../../CardType';
import PostDropdown from '../PostDropdown';
import clsx from 'clsx';
import { fetchTask } from '@/api/detailPost';
import { useTaskReload } from '@/context/TaskReloadContext';
import { useRouter } from 'next/navigation';

type DetailPostProps = {
  groupId?: number;
  tasklistid?: number;
  taskid?: number;
  title?: string;
  onClose: () => void;
  showComplete: boolean;
  time?: string;
};

export default function DetailPost({
  groupId,
  tasklistid,
  taskid,
  title,
  time,
  onClose,
  showComplete,
}: DetailPostProps) {
  const [isComplete, setIsComplete] = useState(showComplete);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { triggerReload } = useTaskReload();

  const queryClient = useQueryClient();

  if (!taskid || !groupId || !tasklistid) {
    console.log('필수값 없음');
    return;
  }

  const router = useRouter();

  /* 할일 내용 */
  const { data: taskData } = useQuery({
    queryKey: ['task', groupId, tasklistid, taskid],
    queryFn: () => {
      if (!groupId || !tasklistid || !taskid) {
        throw new Error('필수 값이 없습니다');
      }
      return fetchTask(groupId, tasklistid, taskid);
    },
  });

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

  /* 할 일 수정 */
  const handleEdit = async () => {
    console.log('할 일 수정');
  };

  /* 할 일 삭제 */
  const handleDelete = async () => {
    deleteMutation.mutate();
  };

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(groupId, tasklistid, taskid),
    onSuccess: () => {
      console.log('할 일 삭제 성공');
      triggerReload(); // context 사용해서 task 리스트 불러오기
      onClose();
    },
    onError: (err: AxiosError) => {
      console.error('할 일 삭제 실패:', err.response?.data);
    },
  });

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
              type="kebab"
              textJustify="center"
              options={[
                { label: '수정', value: '수정', action: handleEdit },
                { label: '삭제', value: '삭제', action: handleDelete },
              ]}
              isOpen={isDropDownOpen}
              toggleDropdown={toggleDropdown}
              toppercent="11%"
            />
          )}
        </div>
      </div>

      <div className="w-full max-w-[739px]">
        <AuthorInfo
          type="detail"
          date={taskData?.data.updatedAt.split('T')[0]}
          authorName={taskData?.data.writer.nickname}
          showLike={false}
          showDivider={false}
        />
      </div>

      {!isComplete && (
        <div className="mt-2">
          <DateInfo
            date={taskData?.data.date.split('T')[0]}
            time={time}
            repeatinfo={taskData?.data.frequency}
          />
        </div>
      )}

      <div>
        <span className="scroll-area text-md-regular mt-2 block min-h-[300px] min-w-[435px] overflow-x-hidden overflow-y-auto leading-[17px] md:w-full">
          {taskData?.data.description}
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
