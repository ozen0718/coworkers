'use client';

import Link from 'next/link';
import { useUserStore } from '@/stores/useUserStore';
import SelectableDropdown from '@/components/dropdown/SelectableDropdown';
import DropDownGroupsItem from '@/components/dropdown/Groups';

export default function TeamSelector() {
  const { teams, isInitialized } = useUserStore();

  // ✅ 초기화되지 않은 경우 렌더링하지 않음 (팀 없음 깜빡임 방지)
  if (!isInitialized) return null;

  // ✅ 첫 번째 팀 이름이 존재할 때만 버튼 텍스트로 사용
  const defaultTeamName = teams.length > 0 && teams[0].name ? teams[0].name : '팀 없음';

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
      defaultValue={defaultTeamName}
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
