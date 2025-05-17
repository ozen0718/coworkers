import { useQuery } from '@tanstack/react-query';
import { getGroupPageInfo } from '@/api/user.api';
import { GroupPageInfo } from '@/types/teampagetypes';

export const useGroupPageInfo = (groupId: string) => {
  return useQuery<GroupPageInfo>({
    queryKey: ['groupPageInfo', groupId],
    queryFn: () => getGroupPageInfo(groupId),
    enabled: !!groupId,
  });
};
