'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from '@/components/common/Modal';
import SelectableDropdown from '@/components/dropdown/SelectableDropdown';
import DatePickerCalendar from '@/components/TodoFullCreateModal/DatePickerCalender';
import DatePickerInput from '@/components/TodoFullCreateModal/DatePickerInput';
import { TextInput, TextAreaInput } from '@/components/common/Inputs';
import './style.css';

export interface TodoFullCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  disabled = false,
}: TodoFullCreateModalProps) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [repeat, setRepeat] = useState(todoRepeatOptions[0]);
  const [repeatDays, setRepeatDays] = useState<string[]>([]);
  const [memo, setMemo] = useState('');

  const handleCreate = () => {
    onSubmit({ title, date: startDate, time, repeat, repeatDays, memo });
  };

  return (
    <Modal
      padding="todo"
      title="할 일 만들기"
      description="할 일은 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다."
      submitButtonLabel="할일 생성"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleCreate}
      disabled={disabled}
    >
      <div className="scrollbar-hide mt-6 mb-2 flex max-h-[70vh] flex-col gap-6 overflow-y-auto">
        {/* 제목 */}
        <div className="flex flex-col gap-4">
          <label htmlFor="todo-title">할 일 제목</label>
          <TextInput
            id="todo-title"
            placeholder="할 일 제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 날짜 + 시간 */}
        <div className="flex flex-col gap-4">
          <label>시작 날짜 및 시간</label>
          <div className="flex gap-2">
            <div className="flex-1">
              <DatePickerCalendar startDate={startDate} setStartDate={setStartDate} />
            </div>
            <div className="flex-1">
              <DatePicker
                wrapperClassName="time-picker"
                selected={startDate || undefined}
                onChange={(d) => setStartDate(d)}
                customInput={<DatePickerInput value={time} onChange={(v: string) => setTime(v)} />}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="aa h:mm"
                showTimeCaption={false}
              />
            </div>
          </div>
        </div>

        {/* 반복 설정 */}
        <div className="flex flex-col gap-4">
          <label>반복 설정</label>
          <SelectableDropdown
            options={todoRepeatOptions}
            size="sm"
            placement="top-full"
            dropDownOpenBtn={
              <div className="text-md-medium text-gray500 flex h-10 w-[150px] items-center rounded-xl bg-[#18212f] px-4">
                {repeat}
              </div>
            }
            onSelect={(e) => setRepeat(e.currentTarget.innerText!)}
          />
          {repeat === '주 반복' && (
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((day, idx) => {
                const key = String(idx);
                const active = repeatDays.includes(key);
                return (
                  <button
                    key={day}
                    type="button"
                    className={`rounded border p-2 ${active ? 'bg-blue-500 text-white' : ''}`}
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
          )}
        </div>

        {/* 메모 */}
        <div className="flex flex-col gap-4">
          <label htmlFor="todo-memo">메모</label>
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
