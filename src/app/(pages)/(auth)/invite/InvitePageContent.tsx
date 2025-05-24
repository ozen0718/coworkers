'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import InviteAuthForm from '@/components/invite/InviteAuthForm';
import InviteAcceptScreen from '@/components/invite/InviteAcceptScreen';
import { useInvitedUserInfo } from '@/hooks/useInvitePageInfo';
import { useAuthStore } from '@/stores/useAuthStore';

export default function InvitePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'checking' | 'accept' | 'auth'>('checking');
  const token = useMemo(() => searchParams.get('token'), [searchParams]);
  const accessToken = useAuthStore.getState().accessToken;

  useInvitedUserInfo();

  useEffect(() => {
    if (!token) {
      toast.error('유효하지 않은 초대 링크입니다.');
      router.replace('/');
      return;
    }

    if (accessToken) {
      setMode('accept');
    } else {
      setMode('auth');
    }
  }, [token, accessToken, router]);

  if (!token) {
    toast.error('유효하지 않은 초대 링크입니다.');
    router.replace('/');
    return;
  }

  if (mode === 'checking') {
    return <div className="p-8 text-center">초대 정보를 불러오는 중...</div>;
  }

  if (mode === 'auth') {
    return <InviteAuthForm token={token} />;
  }

  if (mode === 'accept') {
    return <InviteAcceptScreen token={token} />;
  }

  return null;
}
