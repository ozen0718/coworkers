'use client';

import { Profile } from '@/components/common/Profiles';
import { MemberProps } from '@/types/teampagetypes';
import Image from 'next/image';
import ActionMenu from '@/components/common/ActionMenu';

export default function Member({ profileUrl, name, email }: MemberProps) {
  return (
    <div className="bg-bg200 flex h-18 w-full items-center justify-between gap-1.5 rounded-2xl px-6">
      <div className="grid grid-cols-[min-content_1fr] grid-rows-[auto_auto] gap-x-3">
        <div className="col-span-1 row-span-1 flex min-w-0 flex-col items-start justify-center sm:row-span-2 sm:items-center">
          <Profile width={32} profileUrl={profileUrl} />
        </div>
        <p className="text-md-medium text-gray100 col-span-1 col-start-2 row-span-1 row-start-1 self-center">
          {name}
        </p>
        <p className="text-xs-regular text-gray300 col-span-2 col-start-1 row-span-1 row-start-2 mt-0.5 break-all whitespace-normal sm:col-span-1 sm:col-start-2">
          {email}
        </p>
      </div>
      <ActionMenu
        trigger={<Image src="/icons/kebab.svg" alt="멤버 메뉴" width={16} height={16}></Image>}
        onEdit={() => console.log('수정하기')}
        onDelete={() => console.log('삭제하기')}
      />
    </div>
  );
}
