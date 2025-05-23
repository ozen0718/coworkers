'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/hooks/useUserInfo';
import TeamPage from './TeamPage';

export default function TeamPageWrapper() {
  const router = useRouter();
  const { data: user, isLoading } = useUserInfo();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace('/login');
      } else if (user.memberships.length === 0) {
        router.replace('/noteam');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) return null;

  return <TeamPage />;
}
