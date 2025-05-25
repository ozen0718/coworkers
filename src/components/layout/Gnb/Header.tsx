'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Logo from './Logo';
import SideMenu from './SideMenu';
import TeamSelector from './TeamSelector';
import ProfileDropdown from './ProfileSelector';
import { useHeader } from './HeaderContext';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import { useSelectedTeamStore } from '@/stores/useSelectedTeamStore';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getUserInfo } from '@/api/user';

interface HeaderProps {
  onOpenSideMenu: () => void;
}

export default function Header({ onOpenSideMenu }: HeaderProps) {
  const { showTeamSelector, showFreeBoardLink, showProfile } = useHeader();
  const accessToken = useAuthStore((s) => s.accessToken);

  const teams = useUserStore((s) => s.teams) ?? [];
  const setUserInfo = useUserStore((s) => s.setUserInfo);

  const selectedTeam = useSelectedTeamStore((s) => s.selectedTeam);
  const setSelectedTeam = useSelectedTeamStore((s) => s.setSelectedTeam);

  const { teamid } = useParams() as { teamid?: string };

  const { data: userData } = useQuery({
    queryKey: QUERY_KEYS.user.me,
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5,
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (userData) {
      setUserInfo({
        nickname: userData.nickname,
        profileImage: userData.profileImage,
        teams: userData.teams,
      });
    }
  }, [userData, setUserInfo]);

  useEffect(() => {
    if (!selectedTeam && teams.length > 0 && typeof teamid === 'string') {
      const matched = teams.find((t) => t.id === teamid);
      if (matched) setSelectedTeam(matched);
    }
  }, [teams, teamid, selectedTeam, setSelectedTeam]);

  useEffect(() => {
    if (teams.length > 0) {
      const exists = teams.some((t) => t.id === selectedTeam?.id);
      if (!exists) setSelectedTeam(teams[0]);
    } else {
      setSelectedTeam(null);
    }
  }, [teams, selectedTeam, setSelectedTeam]);

  const hoverEffect = `
    transition-transform transition-shadow duration-200 ease-out
    hover:shadow-xl hover:scale-105 hover:-translate-y-0.5
  `;

  return (
    <header className="bg-bg200 border-border sticky top-0 z-50 flex h-15 w-full justify-center border-b-1 py-[14px]">
      <div className="flex w-full max-w-300 items-center justify-between p-4">
        {/* 왼쪽 로고 & 메뉴 버튼 */}
        <div className="flex items-center gap-8 lg:gap-10">
          <div className="flex items-center gap-4">
            <button
              className={`block rounded p-1 md:hidden ${hoverEffect}`}
              title="메뉴 열기"
              onClick={onOpenSideMenu}
            >
              <Image src="/icons/gnb_menu.svg" alt="메뉴" width={24} height={24} />
            </button>
            <Logo />
          </div>

          <div className="text-lg-md hidden items-center gap-8 md:flex lg:gap-10">
            {showTeamSelector && (
              <div className={`inline-block rounded p-1 ${hoverEffect}`}>
                <TeamSelector />
              </div>
            )}
            {showFreeBoardLink && (
              <Link
                href="/boards"
                className={`inline-block cursor-pointer rounded p-1 ${hoverEffect}`}
              >
                자유게시판
              </Link>
            )}
          </div>
        </div>

        {/* 우측 프로필 드롭다운 */}
        <div className="relative ml-auto">{showProfile && <ProfileDropdown />}</div>
      </div>

      {/* 사이드 메뉴 (언제든 열 수 있도록 렌더링) */}
      <SideMenu isOpen={false} onClose={() => {}} />
    </header>
  );
}
