'use client';

import OAuth from '@/components/oauth/index';

export default function LoginPage() {
  return (
    <div className="bg-bg300 flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-[460px] flex-col gap-8">
        <h1 className="text-2xl-bold text-center text-white">로그인</h1>
        <OAuth authType="login" />
      </div>
    </div>
  );
}
