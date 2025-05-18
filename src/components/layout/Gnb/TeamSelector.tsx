'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import SelectableDropdown from '@/components/dropdown/SelectableDropdown';
import DropDownGroupsItem from '@/components/dropdown/Groups';

export default function TeamSelector() {
  // 1) store에서 teams만 구독
  const teams = useUserStore((s) => s.teams) ?? [];

  // 2) value 상태로 완전 제어
  const [value, setValue] = useState<string>(
    teams.length > 0 && teams[0].name ? teams[0].name : '팀 없음'
  );

  // 3) teams 배열이 바뀔 때마다 value 갱신
  useEffect(() => {
    if (teams.length > 0 && teams[0].name) {
      setValue(teams[0].name);
    } else {
      setValue('팀 없음');
    }
  }, [teams]);

  // 4) 옵션 요소들도 teams 기반으로 생성
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
      /** 이제 defaultValue 가 아닌 value/onChange 로 제어 */
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
