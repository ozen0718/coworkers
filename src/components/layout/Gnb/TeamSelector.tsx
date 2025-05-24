'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { useSelectedTeamStore } from '@/stores/useSelectedTeamStore';
import SelectableDropdown from '@/components/dropdown/SelectableDropdown';
import DropDownGroupsItem, { GroupOption } from '@/components/dropdown/Groups';
import useClickOutside from '@/hooks/useClickOutside';

export default function TeamSelector() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const teams = useUserStore((s) => s.teams) ?? [];
  const { selectedTeam, setSelectedTeam } = useSelectedTeamStore();
  const { teamid } = useParams() as { teamid: string };
  const [value, setValue] = useState<string>(selectedTeam?.name ?? '팀 없음');

  // 바깥 클릭 시 드롭다운 닫기
  useClickOutside(dropdownRef, () => setIsOpen(false));

  // URL과 상태 동기화
  useEffect(() => {
    if (teams.length > 0 && teamid) {
      const matchedTeam = teams.find((t) => t.id === teamid);
      if (matchedTeam && selectedTeam?.id !== matchedTeam.id) {
        setSelectedTeam(matchedTeam);
      }
    }
  }, [teams, teamid, selectedTeam, setSelectedTeam]);

  // selectedTeam → 드롭다운 값 반영
  useEffect(() => {
    if (selectedTeam) {
      setValue(selectedTeam.name);
    } else {
      setValue('팀 없음');
    }
  }, [selectedTeam]);

  // fallback: 팀 없음 → 첫 번째 팀 선택
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
          setIsOpen(false); // 항목 선택 시 드롭다운 닫기
        }}
      />
    );
  });

  return (
    <div ref={dropdownRef}>
      <SelectableDropdown
        placement="top-10 mt-2"
        size="xl"
        value={value}
        onChange={(v) => {
          setValue(v);
          setIsOpen((prev) => !prev);
        }}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
    </div>
  );
}
