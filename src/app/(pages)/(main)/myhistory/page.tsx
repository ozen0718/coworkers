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
  const hasTasks = historyData.tasksDone?.length > 0;

  return (
    <div className="flex flex-col gap-10 pt-10">
      <h1 className="text-xl-bold">마이 히스토리</h1>

      {hasTasks ? (
        Object.entries(grouped).map(([date, tasks]) => (
          <TaskHistoryByDate key={date} date={date} history={tasks} />
        ))
      ) : (
        <div className="flex min-h-[calc(100dvh-164px)] items-center justify-center px-4">
          <p className="text-gray500 text-md-medium text-center">아직 히스토리가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
