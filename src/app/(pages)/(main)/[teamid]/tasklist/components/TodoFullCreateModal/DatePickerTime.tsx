import DatePicker from 'react-datepicker';
import DatePickerInput from './DatePickerInput';

interface DatePickerTimeProps {
  dateTime: Date | null;
  setTime: (date: Date | null) => void;
}

export default function DatePickerTime({ dateTime, setTime }: DatePickerTimeProps) {
  return (
    <DatePicker
      wrapperClassName="time-picker"
      selected={dateTime || undefined}
      onChange={(d) => setTime(d)}
      customInput={<DatePickerInput value={dateTime?.toTimeString().slice(0, 5) ?? ''} />}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="aa h:mm"
      showTimeCaption={false}
    />
  );
}
