'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';

import Button from '@/components/common/Button/Button';

export default function AddTeamPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_LENGTH = 15;
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const isCreateDisabled = name.trim().length === 0 || Boolean(error);

  const handleFileClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setError(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value;
    if (v.length > MAX_LENGTH) return;
    setName(v);
    setError(
      v.length === MAX_LENGTH ? `팀 제목은 ${MAX_LENGTH}글자 이하로 작성할 수 있습니다.` : null
    );
  };

  const handleCreate = async () => {
    if (isCreateDisabled) return;
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    if (file) formData.append('image', file);

    const res = await fetch('/api/teams', { method: 'POST', body: formData });
    if (res.status === 409) {
      setError('이미 존재하는 이름입니다.');
      return;
    }
    if (!res.ok) {
      setError('팀 생성 중 오류가 발생했습니다.');
      return;
    }

    const { id } = await res.json();
    router.push(`/main/${id}`);
  };

  const mainClassName = clsx(
    'bg-bg300 flex min-h-screen flex-col items-center justify-start p-4',
    'pt-[72px] md:pt-[100px] lg:pt-[140px]'
  );

  const titleClassName = clsx('text-4xl-medium text-gray100 mt-6 mb-20');

  const inputClassName = clsx(
    'bg-bg100 text-lg-regular placeholder:text-gray500 h-12 w-full rounded-xl border px-4 focus:outline-none',
    {
      'border-danger': !!error,
      'border-gray100/10 focus:border-primary hover:border-primary-hover': !error,
    }
  );

  const buttonClassName = clsx('text-lg-medium h-12 w-full rounded-xl', {
    'bg-gray400 cursor-not-allowed text-white': isCreateDisabled,
    'bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white': !isCreateDisabled,
  });

  return (
    <>
      <main className={mainClassName}>
        <h1 className={titleClassName}>팀 생성하기</h1>

        <div className="w-full max-w-lg">
          <span className="text-md-medium text-gray100 mb-4 block">팀 프로필</span>
          <div className="relative mb-4 inline-block">
            <Image
              src={file ? URL.createObjectURL(file) : '/icons/initialteamprofile.svg'}
              alt="팀 아이콘"
              width={64}
              height={64}
              className="bg-bg200 cursor-pointer rounded-full border-2 border-gray-700"
              onClick={handleFileClick}
            />
            <Image
              src="/icons/pencil.svg"
              alt="프로필 변경"
              width={24}
              height={24}
              className="bg-bg300 absolute right-0 bottom-0 cursor-pointer rounded-full p-1"
              onClick={handleFileClick}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <label htmlFor="teamName" className="text-lg-medium text-gray100 mb-3 block">
            팀 이름
          </label>
          <input
            id="teamName"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="팀 이름을 입력해주세요."
            className={inputClassName}
          />
          {error && <p className="text-danger text-sm-medium mt-2">{error}</p>}

          <div className="mt-10">
            <Button
              type="button"
              disabled={isCreateDisabled}
              onClick={handleCreate}
              className={buttonClassName}
            >
              생성하기
            </Button>
          </div>

          <p className="text-sm-regular text-gray100 mt-6 text-center">
            팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
          </p>
        </div>
      </main>
    </>
  );
}
