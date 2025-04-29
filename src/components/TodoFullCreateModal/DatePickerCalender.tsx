import DatePicker from 'react-datepicker';
import IconArrowPolygon from '@/assets/icons/IconArrowPolygon';
import DatePickerInput from './DatePickerInput';

interface DatePickerCalendarProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
}

export default function DatePickerCalendar({ startDate, setStartDate }: DatePickerCalendarProps) {
  return (
    <DatePicker
      selected={startDate ?? undefined}
      onChange={(date) => setStartDate(date)}
      customInput={<DatePickerInput />}
      popperClassName="static-popper calendar-picker"
      // Calender header layout
      renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
        <div className="flex w-full items-center justify-between pb-[5px]">
          <button type="button" onClick={decreaseMonth}>
            <IconArrowPolygon />
          </button>
          <span>{monthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
          <button type="button" onClick={increaseMonth}>
            <IconArrowPolygon direction="right" />
          </button>
        </div>
      )}
    />
  );
}
