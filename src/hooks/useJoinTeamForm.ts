'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { joinTeam } from '@/api/TeamCreate';

export function useJoinTeamForm() {
  const router = useRouter();

  const [link, setLink] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (v: string) => {
    setLink(v);
    setError(null);
    setSubmitError(null);
  };

  const onSubmit = async () => {
    if (!link.trim()) {
      setError('팀 링크를 입력해 주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const { id } = await joinTeam(link);
      router.push(`/main/${id}`);
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
