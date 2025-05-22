'use client';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { fetchUserHistory } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import { groupTasksByDate } from './components/groupTasksByDate';
import TaskHistoryByDate from './components/TaskHistoryByDate';

export default function MyHistoryPage() {
  const {
    data: historyData,
    isLoading,
    error,
  } = useQuery({
    queryKey: QUERY_KEYS.user.history,
    queryFn: fetchUserHistory,
    retry: false,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생</div>;

  const grouped = groupTasksByDate(historyData.tasksDone);

  return (
    <div className="flex flex-col gap-10 py-10">
      <h1 className="text-xl-bold">마이 히스토리</h1>

      {Object.entries(grouped).map(([date, tasks]) => (
        <TaskHistoryByDate key={date} date={date} history={tasks} />
      ))}
    </div>
  );
}
