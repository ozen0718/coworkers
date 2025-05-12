'use client';

import React, { useRef } from 'react';
import clsx from 'clsx';

import Button from '@/components/common/Button/Button';
import ProfileUploader from '@/components/ProfileUploader';
import FormField from '@/components/FormField';
import { useAddTeamForm } from '@/hooks/useTeamAddJoinForms';
import { AuthPagesLayout, PageTitleStyle } from '@/styles/pageStyle';

export default function AddTeamPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    name,
    previewUrl,
    fileError,
    nameError,
    submitError,
    isDisabled,
    isLoading,
    onFileChange,
    onNameChange,
    onCreate,
  } = useAddTeamForm();

  return (
    <div className={clsx(AuthPagesLayout, 'mt-18')}>
      <h1 className={PageTitleStyle}>팀 생성하기</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreate();
        }}
        className="w-full max-w-lg"
      >
        <span className="text-lg-medium mb-3 block">팀 프로필</span>
        <ProfileUploader
          fileUrl={previewUrl}
          error={fileError}
          onClick={() => fileRef.current?.click()}
          onChange={onFileChange}
        />
        <input
          ref={fileRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null, null)}
        />

        <FormField
          id="teamName"
          label="팀 이름"
          value={name}
          error={nameError}
          placeholder="팀 이름을 입력해주세요."
          onChange={onNameChange}
        />

        {submitError && <p className="text-danger text-sm-medium mb-4">{submitError}</p>}

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
          {isLoading ? '생성 중…' : '생성하기'}
        </Button>
      </form>
    </div>
  );
}
