'use client';

import NoTeamPage from './NoTeam';
import { useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';

export default function NoTeamPageWrapper() {
  const { teams, isInitialized } = useUserStore();
  const { accessToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    if (!accessToken) {
      router.replace('/login');
      return;
    }

    if (teams.length > 0) {
      router.replace(`/${teams[0].id}`);
    }
  }, [accessToken, isInitialized, teams, router]);

  if (!isInitialized || !accessToken) return null;

  return <NoTeamPage />;
}
