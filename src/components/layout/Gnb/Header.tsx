'use client';

import Image from 'next/image';
import Link from 'next/link';
import Logo from './Logo';
import SideMenu from './SideMenu';
import TeamSelector from './TeamSelector';
import ProfileDropdown from './ProfileSelector';
import { useHeader } from './HeaderContext';
import { useUserStore } from '@/stores/useUserStore';

interface HeaderProps {
  onOpenSideMenu: () => void;
}

export default function Header({ onOpenSideMenu }: HeaderProps) {
  const { showTeamSelector, showFreeBoardLink, showProfile } = useHeader();
  const { teams, nickname } = useUserStore();
  const selectedTeam = teams[0]?.name ?? '팀 없음';

  return (
    <header className="bg-bg200 border-border sticky top-0 z-50 flex h-15 w-full justify-center border-b-1 py-[14px]">
      <div className="flex w-full max-w-300 items-center justify-between p-4">
        <div className="flex items-center gap-8 lg:gap-10">
          <div className="flex items-center gap-4">
            <button className="block md:hidden" title="메뉴 열기" onClick={onOpenSideMenu}>
              <Image src="/icons/gnb_menu.svg" alt="메뉴" width={24} height={24} />
            </button>
            <Logo />
          </div>

          <div className="text-lg-md hidden items-center gap-8 md:flex lg:gap-10">
            {showTeamSelector && (
              <div className="relative">
                <TeamSelector />
              </div>
            )}

            {showFreeBoardLink && (
              <Link href="/boards" className="mt-0 cursor-pointer">
                자유게시판
              </Link>
            )}
          </div>
        </div>

        <div className="relative ml-auto">{showProfile && <ProfileDropdown />}</div>
      </div>

      <SideMenu isOpen={false} onClose={() => {}} />
    </header>
  );
}
