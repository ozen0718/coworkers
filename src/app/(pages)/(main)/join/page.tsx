'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import Button from '@/components/common/Button/Button';
import { AuthPagesLayout, PageTitleStyle } from '@/styles/pageStyle';

export default function JoinTeamPage() {
  const router = useRouter();

  const [link, setLink] = useState('');
  const [error, setError] = useState<string | null>(null);
  const isJoinDisabled = link.trim().length === 0 || Boolean(error);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.currentTarget.value);
    setError(null);
  };

  const handleJoin = async () => {
    if (isJoinDisabled) return;
    setError(null);

    const res = await fetch('/api/teams/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link }),
    });

    if (res.status === 404) {
      setError('유효하지 않은 링크입니다.');
      return;
    }
    if (!res.ok) {
      setError('참여 중 오류가 발생했습니다.');
      return;
    }

    const { id } = await res.json();
    router.push(`/main/${id}`);
  };

  const inputClassName = clsx(
    'bg-bg100 text-lg-regular placeholder:text-gray500 h-12 w-full rounded-xl border px-4 focus:outline-none',
    {
      'border-danger': !!error,
      'border-gray100/10 focus:border-primary hover:border-primary-hover': !error,
    }
  );

  const buttonClassName = clsx('text-lg-medium h-12 w-full rounded-xl', {
    'bg-gray400 cursor-not-allowed text-white': isJoinDisabled,
    'bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white': !isJoinDisabled,
  });

  return (
    <>
      <div className={clsx(AuthPagesLayout, 'mt-18')}>
        <h1 className={PageTitleStyle}>팀 참여하기</h1>

        <div className="w-full max-w-lg">
          <label htmlFor="teamLink" className="text-lg-medium mb-3 block">
            팀 링크
          </label>
          <input
            id="teamLink"
            type="text"
            value={link}
            onChange={handleLinkChange}
            placeholder="팀 링크를 입력해주세요."
            className={inputClassName}
          />
          {error && <p className="text-danger text-sm-medium mt-2">{error}</p>}

          <div className="mt-10">
            <Button
              type="button"
              disabled={isJoinDisabled}
              onClick={handleJoin}
              className={buttonClassName}
            >
              참여하기
            </Button>
          </div>

          <p className="text-sm-regular mt-6 text-center">
            공유받은 팀 링크를 입력해 참여할 수 있어요.
          </p>
        </div>
      </div>
    </>
  );
}
