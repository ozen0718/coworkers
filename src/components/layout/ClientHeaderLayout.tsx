'use client';

import { useState } from 'react';
import SideMenu from '@/components/layout/Gnb/SideMenu';
import Header from '@/components/layout/Gnb/Header';

const USER_DATA = {
  name: '안혜나',
  teams: [
    { id: 1, name: '경영관리팀' },
    { id: 2, name: '프로젝트팀' },
  ],
};

export default function ClientHeaderLayout() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <Header onOpenSideMenu={() => setIsSideMenuOpen(true)} />
      <SideMenu
        teams={USER_DATA.teams}
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
    </>
  );
}
