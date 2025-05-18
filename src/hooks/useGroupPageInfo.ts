import { useQuery, useQueries } from '@tanstack/react-query';
import { getGroupPageInfo } from '@/api/user.api';
import { getTasksByTaskList } from '@/api/tasklist.api';
import { GroupPageInfo, TaskInfo } from '@/types/teampagetypes';
import { getFutureDateString } from '@/utils/date';

export const useGroupPageInfo = (groupId: string) => {
  return useQuery<GroupPageInfo>({
    queryKey: ['groupPageInfo', groupId],
    queryFn: () => getGroupPageInfo(groupId),
    enabled: !!groupId,
  });
};

export const useAllTaskListTasks = (groupId: number | undefined, taskListIds: number[]) => {
  const distantFuture = getFutureDateString(100);

  return useQueries({
    queries: taskListIds.map((taskListId) => ({
      queryKey: ['tasks', taskListId, distantFuture],
      queryFn: () => getTasksByTaskList(groupId!, taskListId, distantFuture),
      enabled: !!groupId && !!taskListId,
    })),
  }) as {
    data: TaskInfo[] | undefined;
  }[];
};
