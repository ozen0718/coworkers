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
import { useUserStore } from '@/stores/useUserStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useSelectedTeamStore } from '@/stores/useSelectedTeamStore';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getUserInfo } from '@/api/user';

interface HeaderProps {
  onOpenSideMenu: () => void;
}

export default function Header({ onOpenSideMenu }: HeaderProps) {
  const { showTeamSelector, showFreeBoardLink, showProfile } = useHeader();
  const accessToken = useAuthStore((s) => s.accessToken);
  const { teams, setUserInfo } = useUserStore();
  const { selectedTeam, setSelectedTeam } = useSelectedTeamStore();
  const { teamid } = useParams() as { teamid: string };

  const { data: userData } = useQuery({
    queryKey: QUERY_KEYS.user.me,
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5,
    enabled: !!accessToken,
  });

  // 유저 정보 받아오면 상태 반영
  useEffect(() => {
    if (userData) {
      setUserInfo({
        nickname: userData.nickname,
        profileImage: userData.profileImage,
        teams: userData.teams,
      });
    }
  }, [userData, setUserInfo]);

  // ✅ 새로고침 시 URL의 teamid로 selectedTeam 복원
  useEffect(() => {
    if (!selectedTeam && teams.length > 0 && teamid) {
      const matchedTeam = teams.find((t) => t.id === teamid);
      if (matchedTeam) {
        setSelectedTeam(matchedTeam);
      }
    }
  }, [selectedTeam, teams, teamid, setSelectedTeam]);

  // ✅ 선택된 팀이 삭제되었거나 유효하지 않으면 fallback
  useEffect(() => {
    if (teams && teams.length > 0) {
      const stillExists = teams.find((team) => team.id === selectedTeam?.id);
      if (!stillExists) {
        setSelectedTeam(teams[0]); // fallback to 첫 번째 팀
      }
    } else {
      setSelectedTeam(null);
    }
  }, [teams]);

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
