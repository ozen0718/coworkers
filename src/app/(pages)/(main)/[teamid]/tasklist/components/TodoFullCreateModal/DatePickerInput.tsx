import { DateInput } from '@/components/common/Inputs';
import { forwardRef } from 'react';

interface DatePickerInputProps {
  value?: string;
  onClick?: () => void;
}

const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(
  ({ value, onClick }, ref) => {
    return (
      <div onClick={onClick} className="w-full">
        <DateInput placeholder={value || '날짜를 선택하세요'} />

        {/* 진짜 입력용 input은 숨겨서 ref 연결 */}
        <input type="text" ref={ref} style={{ display: 'none' }} />
      </div>
    );
  }
);

DatePickerInput.displayName = 'DatePickerInput';
export default DatePickerInput;
