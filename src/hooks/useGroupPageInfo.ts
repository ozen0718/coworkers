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
  date: string
) => {
  return useQueries({
    queries: taskListIds.map((taskListId) => ({
      queryKey: ['tasks', taskListId, date],
      queryFn: () => getTasksByTaskList(groupId!, taskListId, date),
      enabled: !!groupId && !!taskListId,
    })),
  }) as {
    data: TaskInfo[] | undefined;
  }[];
};
