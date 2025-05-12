'use client';

import React from 'react';
import clsx from 'clsx';
import Button from '@/components/common/Button/Button';
import FormField from '@/components/FormField';
import { useJoinTeamForm } from '@/hooks/useTeamAddJoinForms';
import { AuthPagesLayout, PageTitleStyle } from '@/styles/pageStyle';

export default function JoinTeamPage() {
  const { link, error, isDisabled, onChange, onSubmit } = useJoinTeamForm();

  return (
    <div className={clsx(AuthPagesLayout, 'mt-18')}>
      <h1 className={PageTitleStyle}>팀 참여하기</h1>

      <div className="w-full max-w-lg">
        <FormField
          id="teamLink"
          label="팀 링크"
          value={link}
          error={error}
          placeholder="팀 링크를 입력해주세요."
          onChange={onChange}
        />

        <div className="mt-10">
          <Button
            type="button"
            disabled={isDisabled}
            onClick={onSubmit}
            className={clsx(
              'text-lg-medium h-12 w-full rounded-xl',
              isDisabled
                ? 'bg-gray400 cursor-not-allowed text-white'
                : 'bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white'
            )}
          >
            참여하기
          </Button>
        </div>

        <p className="text-sm-regular mt-6 text-center">
          공유받은 팀 링크를 입력해 참여할 수 있어요.
        </p>
      </div>
    </div>
  );
}
