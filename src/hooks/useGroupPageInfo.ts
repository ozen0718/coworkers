import { useMemo } from 'react';
import { useQuery, useQueries, UseQueryResult } from '@tanstack/react-query';
import { getGroupPageInfo, getUserGroupList } from '@/api/user.api';
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
  const futureDefs = useMemo(() => {
    return taskListIds.map((taskListId) => ({
      taskListId,
      queryKey: [{ groupId, taskListId, type: 'future', date: futureDate }],
      queryFn: () => getTasksByTaskList(groupId!, taskListId, futureDate),
      enabled: !!groupId && !!futureDate,
    }));
  }, [groupId, taskListIds, futureDate]);

  const todayDefs = useMemo(() => {
    return taskListIds.map((taskListId) => {
      return {
        taskListId,
        queryKey: ['tasks', groupId, taskListId, 'today', todayDate],
        queryFn: () => getTasksByTaskList(groupId!, taskListId, todayDate),
        enabled: !!groupId && !!todayDate,
      };
    });
  }, [groupId, taskListIds, todayDate]);

  const futureQueryResults = useQueries({
    queries: futureDefs.map((def) => ({
      queryKey: def.queryKey,
      queryFn: def.queryFn,
      enabled: def.enabled,
      meta: { taskListId: def.taskListId },
    })),
  });

  const todayQueryResults = useQueries({
    queries: todayDefs.map((def) => ({
      queryKey: def.queryKey,
      queryFn: def.queryFn,
      enabled: def.enabled,
      meta: { taskListId: def.taskListId },
    })),
  });

  const future = useMemo(() => {
    return futureDefs.map((def, index) => ({
      taskListId: def.taskListId,
      data: (futureQueryResults[index] as UseQueryResult<TaskInfo[]>).data,
    }));
  }, [futureQueryResults, futureDefs]);

  const today = useMemo(() => {
    return todayDefs.map((def, index) => ({
      taskListId: def.taskListId,
      data: (todayQueryResults[index] as UseQueryResult<TaskInfo[]>).data,
    }));
  }, [todayQueryResults, todayDefs]);

  return { future, today };
};

export const useGroupList = () => {
  return useQuery({
    queryKey: ['groupList'],
    queryFn: getUserGroupList,
  });
};
