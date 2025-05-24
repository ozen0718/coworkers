"use client"

import NoTeamPage from './NoTeam';
import { useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'next/navigation';

export default function NoTeamPageWrapper() {
  const { teams } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (teams && teams.length > 0) {
      router.replace(`/${teams[0].id}`);
    }
  }, [teams, router]);
  return <NoTeamPage />;
}
