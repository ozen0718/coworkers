'use client';

import React, { useState } from 'react';
import Modal from '@/components/common/Modal';
import ArrowDropdown from '@/components/common/ArrowDropdown';
import { TextInput, TextAreaInput } from '@/components/common/Inputs';
import './style.css';
import { useDateTimePicker } from './useDateTimePicker';
import DatePickerCalendar from './DatePickerCalender';
import DatePickerTime from './DatePickerTime';

import { AxiosError } from 'axios';
import { createRecurringTask } from '@/api/createTask';
import { useMutation } from '@tanstack/react-query';
import { CreateRecurringTaskBody } from '@/api/createTask';
import { useTaskReload } from '@/context/TaskReloadContext';
import { DateTime } from 'luxon';

export interface TodoFullCreateModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  taskListId?: number;
  groupId?: number;
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

const todoRepeatOptions = ['반복 안함', '한 번', '매일', '주 반복', '월 반복'];
const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

export default function TodoFullCreateModal({
  isOpen,
  onCloseAction,
  taskListId,
  disabled = false,
  groupId,
}: TodoFullCreateModalProps) {
  const [title, setTitle] = useState('');
  const [repeat, setRepeat] = useState(todoRepeatOptions[0]);
  const [repeatDays, setRepeatDays] = useState<string[]>([]);
  const [memo, setMemo] = useState('');

  const { dateTime, setDate, setTime } = useDateTimePicker();

  const { triggerReload } = useTaskReload();

  /* 반복 */
  const repeatToFrequency: Record<
    (typeof todoRepeatOptions)[number],
    'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY'
  > = {
    '반복 안함': 'ONCE',
    '한 번': 'ONCE',
    매일: 'DAILY',
    '주 반복': 'WEEKLY',
    '월 반복': 'MONTHLY',
  };

  /* 할 일 생성 */
  const handleCreate = () => {
    const frequencyType = repeatToFrequency[repeat];

    const startDate =
      DateTime.fromJSDate(dateTime ?? new Date())
        .setZone('Asia/Seoul')
        .toISO() ?? new Date().toISOString();

    const body: CreateRecurringTaskBody = {
      name: title,
      description: memo,
      startDate: startDate,
      frequencyType,
    };

    mutation.mutate(body);
  };

  const mutation = useMutation({
    mutationFn: (body: CreateRecurringTaskBody) => createRecurringTask(groupId!, taskListId!, body),
    onSuccess: () => {
      console.log('할일 생성 성공');
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
        title: '할 일 만들기',
        description: `할 일은 실제로 행동 가능한 작업 중심으로
        작성해주시면 좋습니다.`,
      }}
      submitButton={{ label: '할 일 만들기' }}
      isOpen={isOpen}
      onClose={onCloseAction}
      onSubmit={handleCreate}
      disabled={disabled || title.trim() === ''}
    >
      <div className="scrollbar-hide mt-6 mb-2 flex max-h-[70vh] flex-col gap-6 overflow-y-auto">
        {/* 제목 */}
        <div className="flex flex-col gap-4">
          <label htmlFor="todo-title" className="text-lg-medium">
            <span className="text-primary">*</span> 할 일 제목 {taskListId}
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
          <h2 className="text-lg-medium">
            <span className="text-primary">*</span> 시작 날짜 및 시간
          </h2>
          <div className="flex gap-2">
            <div className="flex-1">
              <DatePickerCalendar dateTime={dateTime} setDate={setDate} />
            </div>
            <div className="flex-1">
              <DatePickerTime dateTime={dateTime} setTime={setTime} />
            </div>
          </div>
        </div>

        {/* 반복 설정 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg-medium">
            <span className="text-primary">*</span> 반복 설정
          </h2>
          <ArrowDropdown
            size="md"
            options={todoRepeatOptions}
            selected={repeat}
            onSelect={(value) => setRepeat(value)}
            className="w-[109px]"
          />
          {repeat === '주 반복' && (
            <div className="flex flex-col gap-3">
              <h2 className="text-lg-medium">반복 요일</h2>
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((day, idx) => {
                  const key = String(idx);
                  const active = repeatDays.includes(key);
                  return (
                    <button
                      key={day}
                      type="button"
                      className={`bg-bg500 text-md-medium h-12 rounded-xl p-2 ${active ? 'bg-primary' : ''}`}
                      onClick={() =>
                        setRepeatDays((prev) =>
                          prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
                        )
                      }
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
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
