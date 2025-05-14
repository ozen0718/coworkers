import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/app/api/user.api';
import { UserResponse } from '@/types/usertypes';

export const useCurrentUser = () => {
  return useQuery<UserResponse>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });
};
