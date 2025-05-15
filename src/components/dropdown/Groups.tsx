'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface GroupOption {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
}

interface DropDownGroupsItemProps {
  group: GroupOption;
}

export default function DropDownGroupsItem({ group }: DropDownGroupsItemProps) {
  const { name, id } = group;

  return (
    <div className="hover:bg-bg100 flex w-[186px] cursor-pointer items-center justify-between rounded-lg px-2 py-[7px]">
      <Link href={`/${id}`} className="text-lg-md flex items-center gap-3 text-white">
        <Image
          src="/team.png"
          width={32}
          height={32}
          alt={`${name} 이미지`}
          className="h-[32px] w-[32px] rounded-md object-cover"
        />
        <p className="w-[110px] truncate">{name}</p>
      </Link>

      <Link href={`/${id}/edit`} className="shrink-0">
        <Image src="/icons/kebab.svg" width={16} height={16} alt="팀 편집" />
      </Link>
    </div>
  );
}
