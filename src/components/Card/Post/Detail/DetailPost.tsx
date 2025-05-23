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
import { useQuery } from '@tanstack/react-query';
import { fetchComment } from '@/api/detailPost';
import { useQueryClient } from '@tanstack/react-query';
import { CommentDetail } from '../../CardType';
import PostDropdown from '../PostDropdown';
import clsx from 'clsx';
import { fetchTask } from '@/api/detailPost';
import { useTaskReload } from '@/context/TaskReloadContext';
import { deleteRecurringTask } from '@/api/detailPost';
import { completeTask } from '@/api/detailPost';
import { useEffect } from 'react';
import TodoEditModal from '@/app/(pages)/(main)/[teamid]/tasklist/components/TodoFullCreateModal/TodoEditModal';

type DetailPostProps = {
  groupId?: number;
  tasklistid?: number;
  taskid?: number;
  title?: string;
  onCloseAction: () => void;
  showComplete: boolean;
  time?: string;
};

export default function DetailPost({
  groupId,
  tasklistid,
  taskid,
  onCloseAction,
}: DetailPostProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { triggerReload } = useTaskReload();

  const queryClient = useQueryClient();

  /* 댓글 내용 */
  const { data: commentData } = useQuery({
    queryKey: ['comments', taskid],
    queryFn: () => {
      if (!taskid) throw new Error('필수값 없음');
      return fetchComment(taskid);
    },
    enabled: !!taskid,
  });

  /* 댓글 작성 */
  const mutation = useMutation({
    mutationFn: (content: string) => {
      if (!taskid) throw new Error('taskid 없음');
      return createComment(taskid, { content });
    },
    onSuccess: () => {
      toast.success('댓글이 작성되었습니다');
      if (taskid) queryClient.invalidateQueries({ queryKey: ['comments', taskid] });
    },
    onError: () => {
      toast.error('댓글 작성 실패');
    },
  });

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

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  /* 할 일 수정 */
  const handleEdit = async () => {
    setEditModalOpen(true);
  };

  /* 할일 내용 */
  const { data: taskData } = useQuery({
    queryKey: ['task', groupId, tasklistid, taskid],
    queryFn: () => {
      if (!groupId || !tasklistid || !taskid) throw new Error('필수값 없음');
      return fetchTask(groupId, tasklistid, taskid);
    },
    enabled: !!groupId && !!tasklistid && !!taskid,
  });

  /* 할일 삭제 */
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!groupId || !tasklistid || !taskid) throw new Error('필수 값 없음');

      if (taskData?.data.frequency === 'ONCE') {
        // 단일 할일 삭제
        return deleteTask(groupId, tasklistid, taskid);
      }

      const recurringId = taskData?.data.recurringId;
      if (!recurringId) throw new Error('recurringId이 없습니다.');

      // 반복 할일 전체 삭제
      return deleteRecurringTask(groupId, tasklistid, taskid, recurringId);
    },
    onSuccess: () => {
      triggerReload();
      onCloseAction();
    },
    onError: () => {
      toast.error('할일 삭제 실패');
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const [isComplete, setIsComplete] = useState<boolean>(!!taskData?.data?.doneAt);

  /* 케밥 드롭다운 */
  const handleToggleComplete = () => {
    CompleteTaskmutation.mutate();
  };

  useEffect(() => {
    setIsComplete(!!taskData?.data?.doneAt);
  }, [taskData?.data?.doneAt]);

  /* 할일 완료 */
  const CompleteTaskmutation = useMutation({
    mutationFn: () => {
      if (!groupId || !tasklistid || !taskid || !taskData?.data) {
        throw new Error('필수 데이터 없음');
      }

      const toggledDone = !isComplete;

      const payload = {
        name: taskData.data.name,
        description: taskData.data.description,
        done: toggledDone,
      };

      return completeTask(groupId, tasklistid, taskid, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', groupId, tasklistid, taskid] });
      setIsComplete((prev) => !prev);
      triggerReload();
      //window.location.reload();
    },
    onError: () => {
      toast.error('완료 처리 실패');
    },
  });

  return (
    <div
      style={{ borderLeft: '1px solid var(--Border-Primary, #F8FAFC1A)' }}
      className="bg-bg200 relative flex h-full min-h-[698px] w-full flex-col gap-[10px] overflow-x-hidden p-5"
    >
      <div className="text-lg-regular mt-5 flex w-full items-start justify-between">
        <IconDelete className="cursor-pointer" onClick={onCloseAction} />
      </div>

      <div className="flex flex-col">
        {isComplete && (
          <div className="flex items-center gap-1">
            <IconCheck color="#a3e635" />
            <p className="text-tertiary text-xs font-medium">완료</p>
          </div>
        )}
        <div className="mt-2 flex items-center md:w-[747px]">
          <span className={clsx('text-xl-bold', isComplete && 'line-through')}>
            {taskData?.data.name}
          </span>
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
            date={taskData?.data.recurring.startDate.split('T')[0]}
            time={taskData?.data.recurring.startDate.slice(11, 16)}
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

      {isEditModalOpen && (
        <TodoEditModal
          isOpen={isEditModalOpen}
          onCloseAction={() => setEditModalOpen(false)}
          groupid={groupId!}
          taskListid={tasklistid}
          taskid={taskid!}
          onSubmit={(newTodo) => {
            console.log('수정 완료', newTodo);
            setEditModalOpen(false);
          }}
        />
      )}

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
