"use client";

import React, { useState } from "react";
import Header from "@/components/Gnb/Header";
import SideMenu from "@/components/Gnb/SideMenu";

const USER_DATA = {
  name: "안혜나",
  teams: [
    { id: 1, name: "경영관리팀" },
    { id: 2, name: "프로젝트팀" },
  ],
};

export default function TestHeaderPage() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg200 text-white">
      {/* ✅ 사이드 메뉴 열기 함수 전달 */}
      <Header onOpenSideMenu={() => setIsSideMenuOpen(true)} />

      {/* ✅ 테스트용 버튼 생략 가능 */}
      {/* <button onClick={() => setIsSideMenuOpen(true)}>사이드 메뉴 열기</button> */}

      <SideMenu
        teams={USER_DATA.teams}
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
    </div>
  );
}
