// src/components/layout/Gnb/TeamSelector.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import SelectableDropdown from '@/components/dropdown/SelectableDropdown';
import DropDownGroupsItem from '@/components/dropdown/Groups';

export default function TeamSelector() {
  const teams = useUserStore((s) => s.teams) ?? [];

  // value 상태 초기화: teams가 로드되지 않았다면 '팀 없음'
  const [value, setValue] = useState<string>(teams[0]?.name ?? '팀 없음');

  // teams가 **0→N** 으로 바뀔 때만 value를 업데이트
  useEffect(() => {
    if (teams.length > 0) {
      setValue(teams[0].name!);
    }
    // teams가 비었을 때는 건너뛰기
  }, [teams]);

  // 옵션 렌더링
  const options = teams.map((team) => (
    <DropDownGroupsItem
      key={team.id}
      group={{
        id: Number(team.id),
        name: team.name || '이름 없음',
        image: team.image ?? '/team.png',
        teamId: team.id,
        createdAt: '',
        updatedAt: '',
      }}
    />
  ));

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
