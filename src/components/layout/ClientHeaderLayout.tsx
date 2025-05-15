'use client';

import { useState } from 'react';
import SideMenu from '@/components/layout/Gnb/SideMenu';
import Header from '@/components/layout/Gnb/Header';

export default function ClientHeaderLayout() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <Header onOpenSideMenu={() => setIsSideMenuOpen(true)} />
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
    </>
  );
}
