import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import IconArrowPolygon from '@/assets/icons/IconArrowPolygon';
import DatePickerInput from './DatePickerInput';

interface DatePickerCalendarProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
}

export default function DatePickerCalendar({ startDate, setStartDate }: DatePickerCalendarProps) {
  return (
    <DatePicker
      locale={ko}
      selected={startDate ?? undefined}
      onChange={(date) => setStartDate(date)}
      customInput={<DatePickerInput />}
      dateFormat="yyyy년 M월 d일"
      popperClassName="static-popper calendar-picker"
      // Calender header layout
      renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
        <div className="flex w-full items-center justify-between pb-[5px]">
          <button type="button" onClick={decreaseMonth}>
            <IconArrowPolygon />
          </button>
          <span>{monthDate.toLocaleString('ko', { month: 'long', year: 'numeric' })}</span>
          <button type="button" onClick={increaseMonth}>
            <IconArrowPolygon direction="right" />
          </button>
        </div>
      )}
    />
  );
}
