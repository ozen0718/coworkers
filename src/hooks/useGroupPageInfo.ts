import { useMemo } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { getGroupPageInfo } from '@/api/user.api';
import { getTasksByTaskList } from '@/api/tasklist.api';
import { GroupPageInfo, TaskInfo } from '@/types/teampagetypes';

export const useGroupPageInfo = (groupId: string) => {
  return useQuery<GroupPageInfo>({
    queryKey: ['groupPageInfo', groupId],
    queryFn: () => getGroupPageInfo(groupId),
    enabled: !!groupId,
  });
};

export const useAllTaskListTasks = (
  groupId: number | undefined,
  taskListIds: number[],
  futureDate: string,
  todayDate: string
): {
  future: { taskListId: number; data: TaskInfo[] | undefined }[];
  today: { taskListId: number; data: TaskInfo[] | undefined }[];
} => {
  const queryDefs = useMemo(() => {
    return taskListIds.flatMap((taskListId) => [
      {
        queryKey: ['tasks', groupId, taskListId, 'future', futureDate],
        queryFn: () => getTasksByTaskList(groupId!, taskListId, futureDate),
        enabled: !!groupId && !!taskListId && !!futureDate,
      },
      {
        queryKey: ['tasks', groupId, taskListId, 'today', todayDate],
        queryFn: () => getTasksByTaskList(groupId!, taskListId, todayDate),
        enabled: !!groupId && !!taskListId && !!todayDate,
      },
    ]);
  }, [groupId, taskListIds, futureDate, todayDate]);

  const queries = useQueries({ queries: queryDefs });

  const future = useMemo(() => {
    const half = queries.length / 2;

    return queries.slice(0, half).map((q, i) => ({
      taskListId: taskListIds[i],
      data: q.data,
    }));
  }, [queries, taskListIds]);

  const today = useMemo(() => {
    const half = queries.length / 2;

    return queries.slice(half).map((q, i) => ({
      taskListId: taskListIds[i],
      data: q.data,
    }));
  }, [queries, taskListIds]);

  return { future, today };
};
