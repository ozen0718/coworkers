'use client';

import Button from '@/components/common/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex h-[calc(100dvh-60px)] flex-col items-center justify-center">
      <h2 className="bg-gradient-primary w-[327px] bg-clip-text text-6xl font-bold text-transparent md:w-[398px] md:text-7xl">
        404 ERROR
      </h2>
      <p className="text-gray500 text-2xl font-semibold md:text-3xl">PAGE NOT FOUND</p>
      <div className="mt-6 mb-5 w-[256px] overflow-hidden">
        <img
          src="/images/noTeam.svg"
          alt="404"
          className="h-[130px] w-auto object-cover object-left"
        />
      </div>
      <p className="text-md text-gray500 text-center md:text-lg md:whitespace-nowrap">
        존재하지 않는 주소를 입력하셨거나,
        <span className="block md:inline"> 요청하신 페이지를 찾을 수 없습니다.</span>
      </p>

      <div className="mt-12 flex w-[186px] flex-col gap-4 md:w-[398px] md:flex-row">
        <Button
          fullWidth
          variant="inverse"
          className="hover:text-primary-hover hover:border-primary-hover active:border-primary-pressed active:text-primary-pressed !bg-transparent"
          onClick={() => router.back()}
        >
          이전 페이지
        </Button>

        <Link href="/" className="w-full">
          <Button fullWidth>홈으로 이동</Button>
        </Link>
      </div>
    </div>
  );
}
