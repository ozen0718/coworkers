'use client';

import Image from 'next/image';
import { TeamHeaderProp } from '@/types/tasktypes';
import ActionMenu from '@/components/common/ActionMenu';
import { useParams, useRouter } from 'next/navigation';

export default function TeamHeader({ title, showGear }: TeamHeaderProp) {
  const router = useRouter();
  const params = useParams();
  const teamid = params.teamid as string;

  return (
    <div
      className="bg-gray100/10 border-gray100/10 flex h-16 w-full items-center justify-between rounded-xl border bg-[url('/icons/teamheader_decoration.svg')] bg-no-repeat px-6"
      style={{ backgroundPosition: 'calc(100% - 80px) center' }}
    >
      <h2 className="text-xl-bold">{title}</h2>

      {showGear && (
        <ActionMenu
          trigger={<Image src="/icons/gear.svg" width={24} height={24} alt="팀 설정" />}
          onEdit={() => router.push(`/${teamid}/edit`)}
          onDelete={() => console.log('삭제하기')}
        />
      )}
    </div>
  );
}
