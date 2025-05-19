import { useQuery } from '@tanstack/react-query';
import { getGroupDetail } from '@/api/group.api';
import { Group } from '@/types/grouptypes';

export const useGroupDetail = (groupId: number | undefined) => {
  return useQuery<Group>({
    queryKey: ['groupDetail', groupId],
    queryFn: () => getGroupDetail(groupId!),
    enabled: !!groupId,
  });
};
