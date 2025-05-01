import MyHistoryItem from '@/components/common/MyHistoryItem';
import { MyHistoryByDateProps } from '@/types/myhistorytypes';
import getKoreanDateString from '@/utils/date';

export default function TaskHistoryByDate({ date, history }: MyHistoryByDateProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg-medium text-gray100">{getKoreanDateString(`${date}`)}</h2>

      {history.map(({ title, completed }) => (
        <MyHistoryItem key={title} title={title} completed={completed} />
      ))}
    </div>
  );
}
