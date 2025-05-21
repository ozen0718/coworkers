'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import SelectableDropdown from '@/components/dropdown/SelectableDropdown';
import DropDownGroupsItem, { GroupOption } from '@/components/dropdown/Groups';

export default function TeamSelector() {
  const teams = useUserStore((s) => s.teams) ?? [];

  // 첫 렌더링 시 teams[0]이 있으면 값 초기화
  const [value, setValue] = useState<string>(teams[0]?.name ?? '팀 없음');

  useEffect(() => {
    if (teams.length > 0) {
      setValue(teams[0].name);
    }
  }, [teams]);

  // DropDownGroupsItem 에 넘겨줄 GroupOption 배열 생성
  const options = teams.map((team) => {
    const group: GroupOption = {
      id: Number(team.id), // DropDownGroupsItem 에서 id는 number
      teamId: team.id, // 원래 팀 식별자(문자열)
      name: team.name || '이름 없음',
      image: team.image ?? '/team.svg', // null 이면 기본 아이콘
      createdAt: '', // 필요에 따라 값 채워주세요
      updatedAt: '',
    };
    return <DropDownGroupsItem key={group.id} group={group} />;
  });

  return (
    <SelectableDropdown
      placement="top-10 mt-2"
      size="xl"
      value={value}
      onChange={setValue}
      options={options}
      footerBtn={
        <Link
          href="/addteam"
          className="flex h-12 w-46 items-center justify-center rounded-xl border border-white text-white"
        >
          + 팀 추가하기
        </Link>
      }
    />
  );
}
