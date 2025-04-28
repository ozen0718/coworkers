'use client';
import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Logo from '@/components/layout/Gnb/Logo';
import Button from '@/components/common/Button/Button';

export default function AddTeamPage() {
  const [name, setName] = useState('');
  const isDisabled = name.trim().length === 0;

  const handleCreate = () => {
    console.log('팀 생성:', name);
  };

  return (
    <main className="bg-bg300 flex min-h-screen flex-col items-center justify-center p-4">
      <Logo />
      <h1 className="text-4xl-medium text-gray100 mt-6">팀 생성하기</h1>

      <div className="mt-10 w-full max-w-lg">
        <span className="text-md-medium text-gray100 mb-4 block">팀 프로필</span>

        <div className="relative mb-2 inline-block">
          <Image
            src="/icons/initialteamprofile.svg"
            alt="팀 아이콘"
            width={65}
            height={65}
            className="bg-bg200 rounded-full"
          />
          <Image
            src="/icons/pencil.svg"
            alt="프로필 변경"
            width={20}
            height={20}
            className="bg-bg300 absolute right-0 bottom-0 cursor-pointer rounded-full p-1"
          />
        </div>

        <label htmlFor="teamName" className="text-lg-medium text-gray100 mt-3 mb-2 block">
          팀 이름
        </label>
        <input
          id="teamName"
          type="text"
          className="bg-bg100 border-gray100/10 text-gray100 text-lg-regular placeholder:text-gray500 focus:border-primary hover:border-primary-hover h-12 w-full rounded-xl border px-4 focus:outline-none"
          placeholder="팀 이름을 입력해주세요."
          value={name}
          maxLength={20}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
        />

        <div className="mt-10">
          <Button
            type="button"
            disabled={isDisabled}
            onClick={handleCreate}
            className={clsx(
              'text-lg-medium h-12 w-full rounded-xl',
              isDisabled
                ? 'bg-gray400 cursor-not-allowed text-white'
                : 'bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white'
            )}
          >
            생성하기
          </Button>
        </div>

        <p className="text-sm-regular text-gray100 mt-6 text-center">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </div>
    </main>
  );
}
