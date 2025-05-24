'use client';
import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useState } from 'react';
import PostDropdown from '../Card/Post/PostDropdown';
import TodoEditModal from '@/app/(pages)/(main)/[teamid]/tasklist/components/TodoFullCreateModal/TodoEditModal';

import { useTaskReload } from '@/context/TaskReloadContext';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { fetchTask, deleteTask, deleteRecurringTask } from '@/api/detailPost';

interface TodoItemProps {
  tasklistid?: number;
  taskid?: number;
  id: number;
  title: string;
  date: string;
  time: string;
  recurring: boolean;
  comments: number;
  completed: boolean;
}

export default function TodoItem({
  tasklistid,
  taskid,
  title,
  date,
  time,
  recurring,
  comments,
  completed,
}: TodoItemProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const { triggerReload } = useTaskReload();

  /* 할 일 수정 */
  const handleEdit = async () => {
    setEditModalOpen(true);
  };

  /* 할 일 삭제 */
  /*
  const handleDelete = () => {
    console.log('삭제');
    console.log('tasklistid', tasklistid);
    console.log('taskid', taskid);
    setIsDropDownOpen(false);
  };
  */

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  /* 그룹 아이디 */
  const pathname = window.location.pathname;
  const groupId = Number(pathname.split('/')[1]);

  /* 할일 내용 */
  const { data: taskData } = useQuery({
    queryKey: ['task', groupId, tasklistid, taskid],
    queryFn: () => {
      if (!groupId || !tasklistid || !taskid) throw new Error('필수값 없음');
      return fetchTask(groupId, tasklistid, taskid);
    },
    enabled: !!groupId && !!tasklistid && !!taskid,
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!groupId || !tasklistid || !taskid) throw new Error('필수 값 없음');

      if (taskData?.data.frequency === 'ONCE') {
        // 단일 할일 삭제
        return deleteTask(groupId, tasklistid, taskid);
      }

      const recurringId = taskData?.data.recurringId;
      if (!recurringId) throw new Error('recurringId가 없습니다.');

      // 반복 할일 전체 삭제
      return deleteRecurringTask(groupId, tasklistid, taskid, recurringId);
    },
    onSuccess: () => {
      triggerReload();
    },
    onError: () => {
      toast.error('할일 삭제 실패');
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div className="flex cursor-pointer flex-col space-y-2 rounded-lg bg-slate-800 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              //toggleChecked();
            }}
            aria-pressed={completed}
            className="cursor-pointer p-1"
          >
            <Image
              src={completed ? '/icons/checkbox_done.svg' : '/icons/checkbox_default.svg'}
              alt={completed ? '완료' : '미완료'}
              width={24}
              height={24}
            />
          </button>

          <span
            className={clsx('truncate text-sm font-medium', {
              'text-gray-400 line-through': completed,
              'text-white': !completed,
            })}
          >
            {title}
          </span>

          <button className="flex items-center space-x-1">
            <Image
              src="/icons/icon_comment.svg"
              alt="댓글"
              width={16}
              height={16}
              className="text-gray-300"
            />
            <span className="text-xs text-gray-300">{comments}</span>
          </button>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
          className="relative"
        >
          <Image
            src="/icons/kebab.svg"
            alt="더보기"
            width={16}
            height={16}
            className="text-gray-300"
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
              toppercent="135%"
            />
          )}
        </button>
      </div>

      {/* 날짜 시간 반복 */}
      <div className="flex items-center space-x-4 text-xs text-gray-400">
        <div className="flex items-center space-x-1">
          <Image
            src="/icons/icon_calendar.svg"
            alt="날짜"
            width={12}
            height={12}
            className="h-3 w-3"
          />
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Image src="/icons/icon_time.svg" alt="시간" width={12} height={12} className="h-3 w-3" />
          <span>{time}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Image
            src="/icons/icon_repeat.svg"
            alt="반복"
            width={12}
            height={12}
            className={clsx('h-3 w-3', {
              'opacity-30': !recurring,
            })}
          />
          {recurring && <span>반복</span>}
        </div>
      </div>

      {isEditModalOpen && (
        <TodoEditModal
          isOpen={isEditModalOpen}
          onCloseAction={() => setEditModalOpen(false)}
          groupid={groupId!}
          taskListid={4047}
          taskid={23511}
          onSubmit={() => {
            setEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
