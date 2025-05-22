'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { useSelectedTeamStore } from '@/stores/useSelectedTeamStore';
import SelectableDropdown from '@/components/dropdown/SelectableDropdown';
import DropDownGroupsItem, { GroupOption } from '@/components/dropdown/Groups';

export default function TeamSelector() {
  const teams = useUserStore((s) => s.teams) ?? [];
  const { selectedTeam, setSelectedTeam } = useSelectedTeamStore();
  const [value, setValue] = useState<string>(selectedTeam?.name ?? '팀 없음');

  useEffect(() => {
    if (teams.length > 0 && !selectedTeam) {
      setSelectedTeam(teams[0]);
      setValue(teams[0].name);
    }
  }, [teams, selectedTeam, setSelectedTeam]);

  const options = teams.map((team) => {
    const group: GroupOption = {
      id: Number(team.id),
      teamId: team.id,
      name: team.name || '이름 없음',
      image: team.image ?? '/team.svg',
      createdAt: '',
      updatedAt: '',
    };

    return (
      <DropDownGroupsItem
        key={group.id}
        group={group}
        onClick={() => {
          setSelectedTeam(team);
          setValue(team.name);
        }}
      />
    );
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
