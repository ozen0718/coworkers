'use client';

import React, { useEffect, useState } from 'react';
import SideMenu from '@/components/Gnb/SideMenu';
import Header from '@/components/Gnb/Header';
import { HeaderProvider, useHeader } from '@/components/Gnb/HeaderContext';

const USER_DATA = {
  name: '안혜나',
  teams: [
    { id: 1, name: '경영관리팀' },
    { id: 2, name: '프로젝트팀' },
  ],
};

function PageContent() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { setHeaderState } = useHeader();

  useEffect(() => {
    setHeaderState({
      showTeamSelector: true, //팀선택 드롭다운
      showFreeBoardLink: true, //자유게시판
      showProfile: true, //프로필
    });
  }, []);

  return (
    <div className="bg-bg200 min-h-screen text-white">
      <Header onOpenSideMenu={() => setIsSideMenuOpen(true)} />
      <SideMenu
        teams={USER_DATA.teams}
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
    </div>
  );
}

export default function TestPage() {
  return (
    <HeaderProvider>
      <PageContent />
    </HeaderProvider>
  );
}
