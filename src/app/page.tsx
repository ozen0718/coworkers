'use client';

import React, { useState } from 'react';
import SideMenu from '@/components/layout/Gnb/SideMenu';
import Header from '@/components/layout/Gnb/Header';
import { HeaderProvider } from '@/components/layout/Gnb/HeaderContext';
import Home from '@/components/landing/index'; // ✅ 추가

const USER_DATA = {
  name: '안혜나',
  teams: [
    { id: 1, name: '경영관리팀' },
    { id: 2, name: '프로젝트팀' },
  ],
};

function PageContent() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <div className="bg-bg300 min-h-screen text-white">
      <Header onOpenSideMenu={() => setIsSideMenuOpen(true)} />
      <SideMenu
        teams={USER_DATA.teams}
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />

      <Home />
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
