import { useQuery } from '@tanstack/react-query';
import { getGroupPageInfo } from '@/api/user.api';
import { GroupPageInfo } from '@/types/teampagetypes';

export const useGroupPageInfo = () => {
  return useQuery<GroupPageInfo>({
    queryKey: ['groupPageInfo'],
    queryFn: getGroupPageInfo,
  });
};
