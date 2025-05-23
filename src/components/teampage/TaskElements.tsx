'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { toast } from 'react-toastify';
import { deleteTaskList, updateTaskList } from '@/api/tasklist.api';
import ActionMenu from '@/components/common/ActionMenu';
import DeleteConfirmModal from '@/components/common/Modal/DeleteConfirmModal';
import EditTaskListModal from '@/components/common/Modal/EditTaskListModal';
import { trimColors } from '@/styles/trimColors';
import { TaskListTapProps, ProgressBadgeProps, TaskListsItemProp } from '@/types/tasktypes';
import stringToHash from '@/utils/stringToHash';

export function TaskListTab({ title, isSelected = false }: TaskListTapProps) {
  return (
    <button
      className={`text-lg-medium py-1.5 ${isSelected ? 'border-b border-white text-white' : 'text-gray500 border-b-0'}`}
    >
      {title}
    </button>
  );
}

export function ProgressBadge({ completedTaskNumber, totalTaskNumber }: ProgressBadgeProps) {
  return (
    <div className="bg-bg300 flex h-6 w-fit shrink-0 items-center justify-center gap-1 rounded-full px-2 py-1">
      {completedTaskNumber === totalTaskNumber ? (
        <Image src="/icons/done.svg" alt="완료됨" width={20} height={20} />
      ) : (
        <div className="h-3.5 w-3.5">
          <CircularProgressbar
            value={completedTaskNumber}
            maxValue={totalTaskNumber}
            strokeWidth={16}
            styles={buildStyles({
              pathColor: 'var(--color-primary)',
              trailColor: 'var(--color-white)',
            })}
          />
        </div>
      )}
      <p className="text-primary text-md-regular">
        {completedTaskNumber}/{totalTaskNumber}
      </p>
    </div>
  );
}

function getTrimColor(text: string): string {
  const hash = stringToHash(text);
  return trimColors[hash % trimColors.length];
}

export function TaskListsItem({
  tasksTitle,
  completed,
  total,
  onClick,
  groupId,
  taskListId,
}: TaskListsItemProp) {
  const trimColor = getTrimColor(tasksTitle);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editName, setEditName] = useState(tasksTitle);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteTaskList(groupId, taskListId),
    onSuccess: () => {
      toast.success('목록이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['groupDetail', groupId] });
    },
    onError: () => toast.error('삭제에 실패했습니다.'),
  });

  const updateMutation = useMutation({
    mutationFn: () => updateTaskList(groupId, taskListId, editName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupDetail', groupId] });
    },
    onError: () => toast.error('수정에 실패했습니다.'),
  });

  return (
    <div className="bg-bg200 flex h-10 w-full items-center justify-between rounded-xl">
      <button
        className="flex w-full items-center justify-start gap-3 overflow-hidden rounded-xl"
        onClick={onClick}
      >
        <div className="h-10 w-3" style={{ backgroundColor: trimColor }} />
        <p className="text-md-medium w-full text-left">{tasksTitle}</p>
      </button>
      <div className="mr-2 flex w-fit items-center justify-end gap-1">
        <ProgressBadge completedTaskNumber={completed} totalTaskNumber={total} />

        <ActionMenu
          trigger={<Image src="/icons/kebab.svg" width={16} height={16} alt="메뉴" />}
          onEdit={() => setEditModalOpen(true)}
          onDelete={() => setDeleteModalOpen(true)}
        />

        <EditTaskListModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          value={editName}
          onChange={setEditName}
          onSubmit={() => {
            updateMutation.mutate();
            setEditModalOpen(false);
          }}
        />

        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => {
            deleteMutation.mutate();
            setDeleteModalOpen(false);
          }}
          title="목록을 삭제하시겠어요?"
          description="목록과 목록의 모든 할 일들이 삭제됩니다."
        />
      </div>
    </div>
  );
}
