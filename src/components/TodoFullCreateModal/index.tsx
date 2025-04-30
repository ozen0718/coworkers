import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { TextAreaInput, TextInput } from '@/components/common/Inputs';
import Modal from '@/components/common/Modal';
import { ModalProps } from '@/components/common/Modal/types';
import SelectableDropdown from '@/components/dropdown/SelectableDropdown';
import DatePickerInput from './DatePickerInput';
import DatePickerCalendar from './DatePickerCalender';
import './style.css';

export type TodoFullCreateModalProps = Pick<
  ModalProps,
  'isOpen' | 'onClose' | 'onSubmit' | 'disabled'
>;

const todoRepeatOptions = ['반복 안함', '한 번', '매일', '주 반복', '월 반복'];

export default function TodoFullCreateModal({ isOpen, onClose }: TodoFullCreateModalProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [selectedRepeat, setSelectedRepeat] = useState(todoRepeatOptions[0]);

  return (
    <Modal
      padding="todo"
      title="할 일 만들기"
      description={`할 일은 실제로 행동 가능한 작업 중심으로
        작성해주시면 좋습니다.`}
      submitButtonLabel="만들기"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="scrollbar-hide mt-6 mb-2 flex max-h-[70vh] flex-col gap-6 overflow-y-auto">
        {/* 할 일 제목 */}
        <div className="flex flex-col gap-4">
          <label htmlFor="todo-title">할 일 제목</label>
          <TextInput placeholder="할 일 제목을 입력해주세요." />
        </div>

        {/* 시작 날짜 및 시간 - Date Picker */}
        <div className="flex flex-col gap-4">
          <label>시작 날짜 및 시간</label>
          <div className="flex gap-2">
            {/* 날짜 선택 */}
            <div className="flex min-w-0 flex-[1.5] flex-col">
              <DatePickerCalendar startDate={startDate} setStartDate={setStartDate} />
            </div>

            {/* 시간 선택 */}
            {/* TODO: Custom style */}
            <div className="flex min-w-0 flex-[1]">
              <DatePicker
                wrapperClassName="time-picker"
                selected={startDate ?? undefined}
                onChange={(date) => setStartDate(date)}
                customInput={<DatePickerInput />}
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
        {/* TODO 1: 설정 선택 시, 반복되는 요일 선택 렌더링 */}
        {/* TODO 2: Dropdown 버튼 색, 아이콘 조정 */}
        <div className="flex flex-col gap-4">
          <label>반복 설정</label>
          <SelectableDropdown
            options={todoRepeatOptions}
            size="sm"
            placement="top-full"
            dropDownOpenBtn={
              <div className="text-md-medium text-gray500 flex h-10 w-[150px] items-center rounded-xl bg-[#18212f] px-4">
                {selectedRepeat}
              </div>
            }
            onSelect={(e) => setSelectedRepeat(e.currentTarget.innerText)}
          />
        </div>

        {/* 메모 */}
        <div className="flex flex-col gap-4">
          <label htmlFor="todo-description">메모</label>
          <TextAreaInput placeholder="메모를 입력해주세요." height="h-[75px]" />
        </div>
      </div>
    </Modal>
  );
}
