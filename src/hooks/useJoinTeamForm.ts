// src/hooks/useJoinTeamForm.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { joinTeam } from '@/api/TeamCreate';
import { acceptGroupInvitation } from '@/api/group.api';
import { useInvitedUserInfo } from '@/hooks/useInvitePageInfo';
import { getUserInfo } from '@/api/user';
import { useUserStore } from '@/stores/useUserStore';
import { QUERY_KEYS } from '@/constants/queryKeys';

export function useJoinTeamForm() {
  const router = useRouter();
  const qc = useQueryClient();
  const { email } = useInvitedUserInfo();
  const setUserInfo = useUserStore((s) => s.setUserInfo);

  const [link, setLink] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (v: string) => {
    setLink(v);
    setError(null);
    setSubmitError(null);
  };

  const extractTokenFromLink = (link: string): string | null => {
    try {
      const url = new URL(link);
      return url.searchParams.get('token');
    } catch {
      return null;
    }
  };

  const onSubmit = async () => {
    if (!link.trim()) {
      setError('팀 링크를 입력해 주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const token = extractTokenFromLink(link);
      let targetId: string;

      if (token) {
        if (!email) {
          setSubmitError('이메일 정보를 가져오지 못했습니다.');
          return;
        }
        const { groupId } = await acceptGroupInvitation({ email, token });
        targetId = String(groupId);
      } else {
        const { id } = await joinTeam(link);
        targetId = String(id);
      }

      // 1) 최신 유저 정보 받아와 Zustand 스토어에 업데이트
      const fresh = await getUserInfo();
      setUserInfo({
        nickname: fresh.nickname,
        profileImage: fresh.profileImage,
        teams: fresh.teams,
      });

      // 2) React Query 캐시 무효화 → Header 쪽 useQuery가 즉시 refetch
      await qc.invalidateQueries({ queryKey: QUERY_KEYS.user.me });

      // 3) 올바른 경로로 이동
      router.push(`/${targetId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === 'NOT_FOUND') {
          setSubmitError('유효하지 않은 링크입니다.');
        } else {
          setSubmitError('참여 중 오류가 발생했습니다.');
        }
      } else {
        setSubmitError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !link.trim() || !!error || isLoading;

  return { link, error, submitError, isDisabled, isLoading, onChange, onSubmit };
}
