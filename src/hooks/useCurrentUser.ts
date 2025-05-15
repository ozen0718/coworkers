import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/api/user.api';
import { UserRoleInfo } from '@/types/usertypes';

export const useCurrentUser = () => {
  return useQuery<UserRoleInfo>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });
};
