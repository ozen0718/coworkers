'use client';

import React, { useState } from 'react';
import Modal from '@/components/common/Modal';
import ArrowDropdown from '@/components/common/ArrowDropdown';
import { TextInput, TextAreaInput } from '@/components/common/Inputs';
import './style.css';
import DatePickerCalendar from './DatePickerCalender';
import DatePickerTime from './DatePickerTime';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { EditTaskBody } from '@/api/createTask';
import { useTaskReload } from '@/context/TaskReloadContext';
import { completeTask } from '@/api/detailPost';
import { useQuery } from '@tanstack/react-query';
import { fetchTask } from '@/api/detailPost';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export interface TodoEditModalProps {
  groupid: number;
  taskListid?: number;
  taskid: number;
  isOpen: boolean;
  onCloseAction: () => void;
  onSubmit: (newTodo: {
    title: string;
    date: Date | null;
    time: string;
    repeat: string;
    repeatDays: string[];
    memo: string;
  }) => void;
  disabled?: boolean;
}

export default function TodoEditModal({
  isOpen,
  onCloseAction,
  taskid,
  taskListid,
  disabled = false,
  groupid,
}: TodoEditModalProps) {
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');

  const queryClient = useQueryClient();

  const frequencyLabelMap: Record<string, string> = {
    ONCE: '한 번',
    DAILY: '매일',
    WEEKLY: '주 반복',
    MONTHLY: '월 반복',
  };

  const { triggerReload } = useTaskReload();

  /* 상세 조회 */
  const { data: taskData } = useQuery({
    queryKey: ['task', groupid, taskListid, taskid],
    queryFn: () => {
      if (!groupid || !taskListid || !taskid) throw new Error('필수값 없음');
      return fetchTask(groupid, taskListid, taskid);
    },
    enabled: !!groupid && !!taskListid && !!taskid,
  });

  useEffect(() => {
    if (taskData?.data?.name) {
      setTitle(taskData.data.name);
    }
    if (taskData?.data?.description) {
      setMemo(taskData.data.description);
    }
  }, [taskData?.data?.name]);

  /* 할 일 수정 */
  const handleEdit = () => {
    const body: EditTaskBody = {
      name: title,
      description: memo,
      done: !!taskData?.data?.doneAt,
    };
    mutation.mutate(body);
  };

  const mutation = useMutation({
    mutationFn: (body: { name: string; description: string; done: boolean }) =>
      completeTask(groupid!, taskListid!, taskid!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['task', groupid, taskListid, taskid],
      });
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === 'task';
        },
      });

      triggerReload();
    },
    onError: (error: AxiosError) => {
      console.error('할일 생성 실패', error.message);
    },
  });

  return (
    <Modal
      padding="todo"
      header={{
        title: '할 일 수정하기',
        description: `날짜, 시간, 반복설정은 변경 할 수 없습니다.`,
      }}
      submitButton={{ label: '수정하기' }}
      isOpen={isOpen}
      onClose={onCloseAction}
      onSubmit={handleEdit}
      disabled={disabled}
    >
      <div className="scrollbar-hide mt-6 mb-2 flex max-h-[70vh] flex-col gap-6 overflow-y-auto">
        {/* 제목 */}
        <div className="flex flex-col gap-4">
          <label htmlFor="todo-title" className="text-lg-medium">
            할 일 제목
          </label>
          <TextInput
            id="todo-title"
            placeholder="할 일 제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 날짜 + 시간 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg-medium">시작 날짜 및 시간</h2>
          <div className="flex gap-2">
            <div className="pointer-events-none flex-1">
              <DatePickerCalendar
                dateTime={new Date(taskData?.data?.recurring?.startDate ?? '')}
                setDate={() => {}}
              />
            </div>
            <div className="pointer-events-none flex-1">
              <DatePickerTime
                dateTime={new Date(taskData?.data?.recurring?.startDate ?? '')}
                setTime={() => {}}
              />
            </div>
          </div>
        </div>

        {/* 반복 설정 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg-medium">반복 설정</h2>
          <ArrowDropdown
            size="md"
            selected={frequencyLabelMap[taskData?.data?.frequency ?? 'ONCE']}
            options={Object.values(frequencyLabelMap)}
            onSelect={() => {}}
            className="pointer-events-none w-[109px] opacity-70"
          />
        </div>

        {/* 메모 */}
        <div className="flex flex-col gap-4">
          <label htmlFor="todo-memo" className="text-lg-medium">
            메모
          </label>
          <TextAreaInput
            id="todo-memo"
            placeholder="메모를 입력해주세요."
            height="h-[75px]"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}
