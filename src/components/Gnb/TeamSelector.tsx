// components/Gnb/TeamSelector.tsx
import Link from 'next/link';
import { OptionSelector } from '@/components/dropdown/OptionItem';
import DropDownGroupsItem from '@/components/dropdown/Groups';

interface Team {
  id: number;
  name: string;
  image: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
}

interface Props {
  teams: Team[];
  defaultTeamName: string;
}

export default function TeamSelector({ teams, defaultTeamName }: Props) {
  return (
    <OptionSelector
      placement="top-10 mt-2"
      size="xl"
      defaultValue={defaultTeamName}
      options={teams.map((group) => (
        <DropDownGroupsItem key={group.id} group={group} />
      ))}
      onSelect={() => {}}
      footerBtn={
        <Link
          href={`/groups`}
          className="flex h-12 w-46 items-center justify-center rounded-xl border border-white text-white"
        >
          + 팀 추가하기
        </Link>
      }
    />
  );
}
