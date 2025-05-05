import TaskHistoryByDate from '@/components/myhistory/MyHistoryByDate';
import { MyHistoryItemProps } from '@/types/myhistorytypes';

const temporaryData: Record<string, MyHistoryItemProps[]> = {
  '2024-01-11': [
    { title: '법인 설립 안내 드리기', completed: true },
    { title: '등기 비용 안내 드리기', completed: true },
    { title: '입력해주신 정보를 바탕으로 등기신청서 제출하기', completed: true },
  ],
  '2024-01-10': [
    { title: '고객 정보에 따라 커스텀 정관 제공하기', completed: true },
    { title: '법인 인감도장, 등기서류, 인감증명서 발급하기', completed: true },
    { title: '업데이트 된 등기부등본 발급하고 영수증 발송하기', completed: true },
  ],
  '2024-01-09': [
    { title: '가나다라마바사', completed: true },
    { title: '아자차카타파하', completed: true },
    { title: 'ABCDEFG HIJKLMN', completed: true },
  ],
};

export default function MyHistoryPage() {
  return (
    <div className="flex max-w-300 min-w-[375px] flex-col gap-10 py-10">
      <h1 className="text-xl-bold">마이 히스토리</h1>
      {Object.entries(temporaryData).map(([date, history]) => (
        <TaskHistoryByDate key={date} date={date} history={history} />
      ))}
    </div>
  );
}
