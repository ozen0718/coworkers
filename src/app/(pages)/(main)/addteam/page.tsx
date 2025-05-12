'use client';

import React, { useRef } from 'react';
import clsx from 'clsx';

import Button from '@/components/common/Button/Button';
import ProfileUploader from '@/components/ProfileUploader';
import { useAddTeamForm } from '@/hooks/useTeamAddJoinForms';
import { AuthPagesLayout, PageTitleStyle } from '@/styles/pageStyle';

export default function AddTeamPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { file, name, error, isDisabled, onFileChange, onNameChange, onCreate } = useAddTeamForm();

  const handleFileClick = () => fileInputRef.current?.click();

  return (
    <div className={clsx(AuthPagesLayout, 'mt-18')}>
      <h1 className={PageTitleStyle}>팀 생성하기</h1>

      <div className="w-full max-w-lg">
        <span className="text-lg-medium mb-3 block">팀 프로필</span>
        <ProfileUploader
          file={file}
          error={error}
          onClick={handleFileClick}
          onChange={onFileChange}
        />

        <label htmlFor="teamName" className="text-lg-medium mb-3 block">
          팀 이름
        </label>
        <input
          id="teamName"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="팀 이름을 입력해주세요."
          className={clsx(
            'bg-bg100 text-lg-regular placeholder:text-gray500 h-12 w-full rounded-xl border px-4 focus:outline-none',
            {
              'border-danger': !!error,
              'border-gray100/10 focus:border-primary hover:border-primary-hover': !error,
            }
          )}
        />
        {error && <p className="text-danger text-sm-medium mt-2">{error}</p>}

        <div className="mt-10">
          <Button
            type="button"
            disabled={isDisabled}
            onClick={onCreate}
            className={clsx('text-lg-medium h-12 w-full rounded-xl', {
              'bg-gray400 cursor-not-allowed text-white': isDisabled,
              'bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white': !isDisabled,
            })}
          >
            생성하기
          </Button>
        </div>

        <p className="text-sm-regular mt-6 text-center">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => {
            const selected = e.target.files?.[0] ?? null;
            onFileChange(selected, null);
          }}
        />
      </div>
    </div>
  );
}
