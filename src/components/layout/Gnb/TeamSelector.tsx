'use client';

import Link from 'next/link';
import { useUserStore } from '@/stores/useUserStore';
import SelectableDropdown from '@/components/dropdown/SelectableDropdown';
import DropDownGroupsItem from '@/components/dropdown/Groups';

export default function TeamSelector() {
  const { teams, isInitialized } = useUserStore();

  if (!isInitialized || !Array.isArray(teams)) return null;

  const defaultTeamName = teams[0]?.name || '팀 없음';

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
