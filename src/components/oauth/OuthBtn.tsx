'use client';

import Image from 'next/image';

export default function OAuthButtonGroup() {
  const handleOAuthLogin = (provider: 'google' | 'kakao') => {
    console.log(`${provider} 로그인 시도`);
    // TODO: API 연동
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={() => handleOAuthLogin('google')}
        className="flex h-[42px] w-[42px] items-center justify-center"
      >
        <Image src="/icons/google.svg" alt="구글 로그인" width={42} height={42} />
      </button>

      <button
        onClick={() => handleOAuthLogin('kakao')}
        className="flex h-[42px] w-[42px] items-center justify-center"
      >
        <Image src="/icons/kakaotalk.svg" alt="카카오 로그인" width={42} height={42} />
      </button>
    </div>
  );
}
