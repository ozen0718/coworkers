import DatePicker from 'react-datepicker';
import { enUS } from 'date-fns/locale';
import IconArrowPolygon from '@/assets/icons/IconArrowPolygon';
import DatePickerInput from './DatePickerInput';

interface DatePickerCalendarProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
}

export default function DatePickerCalendar({ startDate, setStartDate }: DatePickerCalendarProps) {
  const customLocale = {
    ...enUS,
    localize: {
      ...enUS.localize,
      day: (n: number) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][n],
    },
  };

  return (
    <DatePicker
      locale={customLocale}
      selected={startDate ?? undefined}
      onChange={(date) => setStartDate(date)}
      customInput={<DatePickerInput />}
      dateFormat="yyyy년 M월 d일"
      popperClassName="static-popper calendar-picker"
      
      // Calender header layout
      renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
        <div className="w-40px flex items-center justify-between pb-[5px]">
          <button type="button" onClick={decreaseMonth}>
            <IconArrowPolygon />
          </button>
          <span>{monthDate.toLocaleString('en', { month: 'long', year: 'numeric' })}</span>
          <button type="button" onClick={increaseMonth}>
            <IconArrowPolygon direction="right" />
          </button>
        </div>
      )}
    />
  );
}
