'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { useSelectedTeamStore } from '@/stores/useSelectedTeamStore';
import { useParams } from 'next/navigation';
import SelectableDropdown from '@/components/dropdown/SelectableDropdown';
import DropDownGroupsItem, { GroupOption } from '@/components/dropdown/Groups';

export default function TeamSelector() {
  const teams = useUserStore((s) => s.teams) ?? [];
  const { selectedTeam, setSelectedTeam } = useSelectedTeamStore();
  const { teamid } = useParams() as { teamid: string };
  const [value, setValue] = useState<string>(selectedTeam?.name ?? '팀 없음');

  // ✅ URL의 teamid와 현재 선택된 팀이 다르면 강제 동기화
  useEffect(() => {
    if (teams.length > 0 && teamid) {
      const matchedTeam = teams.find((t) => t.id === teamid);
      if (matchedTeam && selectedTeam?.id !== matchedTeam.id) {
        setSelectedTeam(matchedTeam);
      }
    }
  }, [teams, teamid, selectedTeam, setSelectedTeam]);

  // selectedTeam이 바뀌면 드롭다운 텍스트도 바뀜
  useEffect(() => {
    if (selectedTeam) {
      setValue(selectedTeam.name);
    } else {
      setValue('팀 없음');
    }
  }, [selectedTeam]);

  // fallback: 아무것도 없을 경우 첫 번째 팀 선택
  useEffect(() => {
    if (teams.length > 0 && !selectedTeam) {
      setSelectedTeam(teams[0]);
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
        key={`${group.id}-${group.name}`}
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
