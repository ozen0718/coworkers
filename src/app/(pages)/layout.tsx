import { fetchUser } from '@/api/user';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getQueryClient } from '@/lib/queryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.user.me,
    queryFn: fetchUser,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="px-4 md:px-6">
        <div className="mx-auto max-w-[1200px]">{children}</div>
      </div>
    </HydrationBoundary>
  );
}
