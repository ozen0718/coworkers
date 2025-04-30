import { forwardRef } from 'react';
import { TextInput } from '../common/Inputs';

interface DatePickerInputProps {
  value?: string;
  onClick?: () => void;
}

const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(
  ({ value, onClick }, ref) => {
    return (
      <div onClick={onClick} className="w-full">
        {/* TextInput은 readonly 모드로 사용 */}
        <TextInput placeholder={value || '날짜를 선택하세요'} />
        {/* 진짜 입력용 input은 숨겨서 ref 연결 */}
        <input type="text" ref={ref} style={{ display: 'none' }} />
      </div>
    );
  }
);

DatePickerInput.displayName = 'DatePickerInput';
export default DatePickerInput;
