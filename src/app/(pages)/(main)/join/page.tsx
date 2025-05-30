'use client';

import React from 'react';
import clsx from 'clsx';

import Button from '@/components/common/Button/Button';
import FormField from '@/components/FormField';
import { useJoinTeamForm } from '@/hooks/useJoinTeamForm';
import { AuthPagesLayout, PageTitleStyle } from '@/styles/pageStyle';

export default function JoinTeamPage() {
  const { link, error, submitError, isDisabled, isLoading, onChange, onSubmit } = useJoinTeamForm();

  return (
    <div className={clsx(AuthPagesLayout, 'mt-18')}>
      <h1 className={PageTitleStyle}>팀 참여하기</h1>

      <form
        className="w-full max-w-lg"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <FormField
          id="teamLink"
          label="팀 링크"
          type="text"
          value={link}
          placeholder="팀 링크를 입력해주세요."
          error={error ?? submitError}
          onValueChange={onChange}
        />

        <Button
          type="submit"
          disabled={isDisabled}
          className={clsx(
            'text-lg-medium h-12 w-full rounded-xl',
            isDisabled
              ? 'bg-gray400 cursor-not-allowed text-white'
              : 'bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white'
          )}
        >
          {isLoading ? '참여 중…' : '참여하기'}
        </Button>

        <p className="text-sm-regular mt-6 text-center">
          공유받은 팀 링크를 입력해 참여할 수 있어요.
        </p>
      </form>
    </div>
  );
}
