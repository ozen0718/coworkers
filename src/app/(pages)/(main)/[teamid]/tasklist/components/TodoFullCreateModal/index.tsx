'use client';

import React, { useState } from 'react';
import Modal from '@/components/common/Modal';
import ArrowDropdown from '@/components/common/ArrowDropdown';
import { TextInput, TextAreaInput } from '@/components/common/Inputs';
import './style.css';
import { useDateTimePicker } from './useDateTimePicker';
import DatePickerCalendar from './DatePickerCalender';
import DatePickerTime from './DatePickerTime';

export interface TodoFullCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  onClose,
  onSubmit,
  taskListId,
  disabled = false,
}: TodoFullCreateModalProps) {
  const [title, setTitle] = useState('');
  const [repeat, setRepeat] = useState(todoRepeatOptions[0]);
  const [repeatDays, setRepeatDays] = useState<string[]>([]);
  const [memo, setMemo] = useState('');

  const { dateTime, setDate, setTime, timeString } = useDateTimePicker();

  const handleCreate = () => {
    onSubmit({ title, date: dateTime, time: timeString, repeat, repeatDays, memo });
  };

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
      onClose={onClose}
      onSubmit={handleCreate}
      disabled={disabled}
    >
      <div className="scrollbar-hide mt-6 mb-2 flex max-h-[70vh] flex-col gap-6 overflow-y-auto">
        {/* 제목 */}
        <div className="flex flex-col gap-4">
          <label htmlFor="todo-title" className="text-lg-medium">
            할 일 제목 {taskListId}
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
          <h2 className="text-lg-medium">반복 설정</h2>
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
