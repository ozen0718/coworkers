import { useState } from 'react';

export function useDateTimePicker(defaultDate: Date | null = new Date()) {
  const [dateTime, setDateTime] = useState<Date | null>(defaultDate);

  const setDate = (newDate: Date | null) => {
    if (!newDate) return;

    if (!dateTime) return setDateTime(newDate);

    const updated = new Date(dateTime);
    updated.setFullYear(newDate.getFullYear());
    updated.setMonth(newDate.getMonth());
    updated.setDate(newDate.getDate());
    setDateTime(updated);
  };

  const setTime = (newTime: Date | null) => {
    if (!newTime) return;

    if (!dateTime) return setDateTime(newTime);

    const updated = new Date(dateTime);
    updated.setHours(newTime.getHours());
    updated.setMinutes(newTime.getMinutes());
    setDateTime(updated);
  };

  const getTimeString = (date: Date | null) =>
    date
      ? `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
      : '';

  const timeString = getTimeString(dateTime);

  return {
    dateTime,
    setDate,
    setTime,
    getTimeString,
    timeString,
  };
}
