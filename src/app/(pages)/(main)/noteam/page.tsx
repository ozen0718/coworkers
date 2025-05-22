import Button from '@/components/common/Button/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function noTeamPage() {
  return (
    <div className="mx-auto flex h-[calc(100vh-60px)] max-w-[560px] min-w-[375px] flex-col items-center justify-center px-[14px] md:min-w-[520px] md:px-0 lg:min-w-[810px]">
      <Image src="images/noTeam.svg" width={810} height={255} alt="no team image" />
      <p className="text-gray500 mt-8 mb-12 text-center text-[14px] leading-[17px] font-medium md:mt-12 md:mb-20 md:text-[16px] md:leading-[19px]">
        아직 소속됨 팀이 없습니다.
        <br />
        팀을 생성하거나 팀에 참여해보세요.
      </p>
      <div className="flex w-[186px] flex-col gap-4">
        <Button fullWidth>
          <Link href="/addteam">팀 생성하기</Link>
        </Button>
        <Button fullWidth variant="inverse" className="!bg-transparent">
          <Link href="/join">팀 참여하기</Link>
        </Button>
      </div>
    </div>
  );
}
