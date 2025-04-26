import Image from 'next/image';

interface DateInfoProps {
  date: string;
  time: string;
  repeatinfo: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
}

const repeatMap = {
  ONCE: '한 번 반복',
  DAILY: '매일 반복',
  WEEKLY: '주 반복',
  MONTHLY: '월 반복',
};

/* 날짜, 시간 변경 */
function formatDate(dateString: string) {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();

  return `${year}년 ${month}월 ${date}일`;
}

function formatTime(timeString: string) {
  const [hourStr, minute] = timeString.split(':');
  const hour = parseInt(hourStr, 10);
  const isAm = hour < 12;
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const period = isAm ? '오전' : '오후';

  return `${period} ${displayHour}:${minute}`;
}

export function DateInfo({ date, time, repeatinfo }: DateInfoProps) {
  return (
    <div className="flex items-center space-x-4 text-xs text-gray-400">
      <div className="flex items-center space-x-1">
        <Image src="/icons/icon_calendar.svg" alt="날짜 아이콘" width={12} height={12} />
        <span>{formatDate(date)}</span>
      </div>
      <div className="h-[12px] border-l-1 border-slate-700"></div>
      <div className="flex items-center space-x-1">
        <Image src="/icons/icon_time.svg" alt="시간 아이콘" width={12} height={12} />
        <span>{formatTime(time)}</span>
      </div>
      <div className="h-[12px] border-l-1 border-slate-700"></div>
      <div className="flex items-center space-x-1">
        <Image
          src="/icons/icon_repeat.svg"
          alt="반복 아이콘"
          width={12}
          height={12}
          //className={'opacity-30'}
        />
        <p>{repeatMap[repeatinfo]}</p>
      </div>
    </div>
  );
}
