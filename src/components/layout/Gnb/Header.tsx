'use client';

import Image from 'next/image';
import Link from 'next/link';
import Logo from './Logo';
import SideMenu from './SideMenu';
import TeamSelector from './TeamSelector';
import ProfileDropdown from './ProfileSelector';
import { useHeader } from './HeaderContext';
import { useUserStore } from '@/stores/useUserStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getUserInfo } from '@/api/user';
import { useEffect } from 'react';

interface HeaderProps {
  onOpenSideMenu: () => void;
}

export default function Header({ onOpenSideMenu }: HeaderProps) {
  const { showTeamSelector, showFreeBoardLink, showProfile } = useHeader();

  // 1) zustand에서 토큰 가져오기
  const accessToken = useAuthStore((s) => s.accessToken);

  // 2) userStore에서 팀 목록과 setter
  const { teams = [], setUserInfo } = useUserStore();

  // 3) 로그인(토큰 보유) 상태에서만 호출
  const { data: userData } = useQuery({
    queryKey: QUERY_KEYS.user.me,
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5,
    enabled: !!accessToken,
  });

  // 4) API 응답이 오면 store에 반영
  useEffect(() => {
    if (userData) {
      setUserInfo({
        nickname: userData.nickname,
        profileImage: userData.profileImage,
        teams: userData.teams,
      });
    }
  }, [userData, setUserInfo]);

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

          {/* PC 이상에서만 보이는 팀셀렉터 & 자유게시판 링크 */}
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

        {/* 우측 프로필 드롭다운 */}
        <div className="relative ml-auto">{showProfile && <ProfileDropdown />}</div>
      </div>

      {/* 사이드메뉴: 열린 상태 관리 로직은 상위에서 props로 넘겨주세요 */}
      <SideMenu isOpen={false} onClose={() => {}} />
    </header>
  );
}
