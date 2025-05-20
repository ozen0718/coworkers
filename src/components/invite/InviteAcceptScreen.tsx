'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { acceptGroupInvitation } from '@/api/group.api';
import { useInvitedUserInfo } from '@/hooks/useInvitePageInfo';
import { useUserStore } from '@/stores/useUserStore';
import extractGroupIdFromToken from '@/utils/inviteTokenDecoder';

export default function InviteAcceptScreen({ token }: { token: string }) {
  const router = useRouter();
  const { email, isLoading } = useInvitedUserInfo();
  const tokenGroupId = extractGroupIdFromToken(token);
  const teams = useUserStore((state) => state.teams);
  const alreadyMember = tokenGroupId && teams.some((team) => String(team.id) === tokenGroupId);

  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!isLoading && !email) {
      toast.error('이메일 정보를 가져오지 못했습니다.');
      setError('이메일 정보를 가져오지 못했습니다.');
    }
  }, [isLoading, email]);

  useEffect(() => {
    if (alreadyMember) {
      toast.info('이미 가입된 그룹입니다.');
      router.replace(`/${tokenGroupId}`);
      return;
    }

    if (!isLoading && email) {
      setShowConfirm(true);
    }
  }, [alreadyMember, email, isLoading, router, tokenGroupId]);

  const handleAccept = async () => {
    try {
      const { groupId } = await acceptGroupInvitation({ email: email!, token });
      toast.success('초대를 수락했습니다.');
      router.replace(`/${groupId}`);
    } catch (error) {
      console.error(error);
      toast.error('초대 수락에 실패했습니다.');
      router.replace('/');
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">초대 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (!showConfirm) return null;

  return (
    <div className="flex flex-col items-center gap-4 p-8 text-center">
      <p className="text-lg">초대를 수락하시겠습니까?</p>
      <button
        onClick={handleAccept}
        className="bg-primary hover:bg-primary-hover rounded px-6 py-2 text-white transition"
      >
        초대 수락
      </button>
    </div>
  );
}
