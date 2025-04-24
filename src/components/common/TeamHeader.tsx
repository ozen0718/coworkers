import Image from 'next/image';
import { TeamHeaderProps } from '@/types/tasktypes';

export default function TeamHeader({ title }: TeamHeaderProps) {
  return (
    <div className="bg-gray100/10 border-gray100/10 flex h-16 w-full items-center justify-between rounded-xl border bg-[url('/icons/teamheader_decoration.svg')] bg-no-repeat px-6">
      <h2>{title}</h2>
      <button>
        <Image src="/icons/gear.svg" width={24} height={24} alt="팀 수정하기" />
      </button>
    </div>
  );
}
