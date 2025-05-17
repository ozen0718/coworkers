'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUserStore } from '@/stores/useUserStore';
import { useRouter } from 'next/navigation';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const { teams } = useUserStore();
  const router = useRouter();

  if (!isOpen) return null;

  const handleTeamClick = (teamId: string) => {
    router.push(`/${teamId}`);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div className="bg-bg200 fixed top-0 left-0 z-50 flex h-screen w-[204px] flex-col gap-6 overflow-scroll p-4 pb-10 shadow-lg">
        <button onClick={onClose} className="cursor-pointer self-end" title="닫기">
          <Image src="/icons/close.svg" alt="닫기" width={24} height={24} />
        </button>

        <div className="flex flex-col gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="text-md-medium hover:bg-bg300 cursor-pointer rounded px-2 py-1"
              onClick={() => handleTeamClick(team.id)}
            >
              {team.name}
            </div>
          ))}
          <Link href="/articles" className="text-primary text-md-medium px-2 py-1">
            자유게시판
          </Link>
        </div>
      </div>
    </>
  );
}
