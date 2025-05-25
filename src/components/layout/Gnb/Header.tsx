// src/components/layout/Gnb/Header.tsx
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

  // teams는 항상 배열로 보장 (undefined → 빈 배열)
  const teams = useUserStore((s) => s.teams) ?? [];
  const setUserInfo = useUserStore((s) => s.setUserInfo);

  const selectedTeam = useSelectedTeamStore((s) => s.selectedTeam);
  const setSelectedTeam = useSelectedTeamStore((s) => s.setSelectedTeam);

  // URL 파라미터로 넘어오는 teamid (초기엔 undefined일 수 있음)
  const { teamid } = useParams() as { teamid?: string };

  // 로그인된 상태일 때만 /user 조회
  const { data: userData } = useQuery({
    queryKey: QUERY_KEYS.user.me,
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5,
    enabled: !!accessToken,
  });

  // 1) React Query로 받아온 유저정보 → Zustand 업데이트
  useEffect(() => {
    if (userData) {
      setUserInfo({
        nickname: userData.nickname,
        profileImage: userData.profileImage,
        teams: userData.teams,
      });
    }
  }, [userData, setUserInfo]);

  // 2) 새로고침 등으로 teamid가 URL에 있으면 selectedTeam 복원
  useEffect(() => {
    if (!selectedTeam && teams.length > 0 && typeof teamid === 'string') {
      const matched = teams.find((t) => t.id === teamid);
      if (matched) {
        setSelectedTeam(matched);
      }
    }
  }, [teams, teamid, selectedTeam, setSelectedTeam]);

  // 3) 선택된 팀이 삭제되었거나 유효하지 않으면 첫 번째 팀으로 fallback
  useEffect(() => {
    if (teams.length > 0) {
      const exists = teams.some((t) => t.id === selectedTeam?.id);
      if (!exists) {
        setSelectedTeam(teams[0]);
      }
    } else {
      // 팀 목록이 비어있으면 selectedTeam 초기화
      setSelectedTeam(null);
    }
  }, [teams, selectedTeam, setSelectedTeam]);

  return (
    <header className="bg-bg200 border-border sticky top-0 z-50 flex h-15 w-full justify-center border-b-1 py-[14px]">
      <div className="flex w-full max-w-300 items-center justify-between p-4">
        {/* 왼쪽 로고 & 메뉴 버튼 */}
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
              <Link href="/boards" className="cursor-pointer">
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
