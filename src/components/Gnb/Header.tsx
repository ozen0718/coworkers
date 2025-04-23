"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import { OptionSelector } from "@/components/dropdown/optionItem";
import DropDownProfileItemList from "@/components/dropdown/ProfileItem";
import DropDownGroupsItem from "@/components/dropdown/GroupsItem";
import DropDown from "@/components/dropdown/index";

const USER_DATA = {
  name: "안혜나",
  teams: [
    {
      id: 1,
      name: "경영관리팀",
      image: "/img_team.png",
      teamId: "team-1",
      updatedAt: "",
      createdAt: "",
    },
    {
      id: 2,
      name: "프로젝트팀",
      image: "/img_team.png",
      teamId: "team-2",
      updatedAt: "",
      createdAt: "",
    },
  ],
};

const userName = USER_DATA.name;
const selectedTeam = USER_DATA.teams[0]?.name || "";

// ✅ onOpenSideMenu props 추가
interface HeaderProps {
  onOpenSideMenu: () => void;
}

export default function Header({ onOpenSideMenu }: HeaderProps) {
  return (
    <header className="bg-bg200 border-border sticky top-0 flex h-15 w-full justify-center border-b-1 py-[14px] z-50">
      <div className="flex w-full max-w-300 items-center justify-between p-4">
        <div className="flex items-center gap-8 lg:gap-10">
          <div className="flex items-center gap-4">
            {/* ✅ 모바일에서만 보이는 GNB 버튼 */}
            <button
              className="block md:hidden"
              title="메뉴 열기"
              onClick={onOpenSideMenu}
            >
              <Image
                src="/icons/gnb_menu.svg"
                alt="메뉴"
                width={24}
                height={24}
              />
            </button>
            <Logo />
          </div>

          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-lg-md">
            <div className="relative">
              <OptionSelector
                placement="top-10 mt-2"
                size="xl"
                defaultValue={selectedTeam}
                options={USER_DATA.teams.map((group) => (
                  <DropDownGroupsItem key={group.id} group={group} />
                ))}
                onSelect={() => {}}
                footerBtn={
                  <Link
                    href={`/groups`}
                    className="text-white border-white flex h-12 w-46 items-center justify-center rounded-xl border"
                  >
                    + 팀 추가하기
                  </Link>
                }
              />
            </div>

            <Link href={`/articles`} className="cursor-pointer mt-0">
              자유게시판
            </Link>
          </div>
        </div>

        <div className="relative ml-auto">
          <DropDown
            size="lg"
            placement="top-6 mt-2 right-0"
            dropDownOpenBtn={
              <button className="flex items-center gap-2">
                <Image
                  src="/icons/profile.svg"
                  alt="유저 아이콘"
                  width={24}
                  height={24}
                />
                <span className="text-md-md hidden lg:inline">{userName}</span>
              </button>
            }
            options={DropDownProfileItemList}
            onSelect={() => {}}
          />
        </div>
      </div>
    </header>
  );
}
