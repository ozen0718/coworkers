import { ReactNode, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { isSameDay } from 'date-fns';
import clsx from 'clsx';
import { TextAreaInput, TextInput } from '@/components/common/Inputs';
import Modal from '@/components/common/Modal';
import { ModalProps } from '@/components/common/Modal/types';
import SelectableDropdown from '@/components/dropdown/SelectableDropdown';
import DatePickerInput from './DatePickerInput';
import './style.css';

export type TodoFullCreateModalProps = Pick<
  ModalProps,
  'isOpen' | 'onClose' | 'onSubmit' | 'disabled'
>;

const todoRepeatOptions = ['반복 안함', '한 번', '매일', '주 반복', '월 반복'];

export default function TodoFullCreateModal({ isOpen, onClose }: TodoFullCreateModalProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [selectedRepeat, setSelectedRepeat] = useState(todoRepeatOptions[0]);

  const MyContainer = ({ className, children }: { className?: string; children: ReactNode }) => {
    return (
      <CalendarContainer className={className}>
        <div className="border-primary-hover bg-red rounded-lg border p-4 shadow-lg">
          {children}
        </div>
      </CalendarContainer>
    );
  };

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
      <div className="mt-6 mb-2 flex max-h-[555px] flex-col gap-6 overflow-y-auto scrollbar-hide">
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
            <div className="flex flex-col w-1/2 min-w-0 ">
              <DatePicker
                className="outline"
                selected={startDate ?? undefined}
                onChange={(date) => setStartDate(date)}
                customInput={<DatePickerInput />}
                calendarContainer={MyContainer}
                dayClassName={(date) =>
                  clsx(
                    'w-10 h-10 flex items-center justify-center rounded-full transition',
                    isSameDay(date, startDate ?? undefined) &&
                      'bg-blue-600 text-bg200 font-semibold'
                  )
                }
                popperClassName="static-popper"
                popperModifiers={[]}
                wrapperClassName="w-full"
              />
            </div>

            {/* 시간 선택 */}
            <div className='w-1/2 min-w-0 '>

            <DatePicker
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
