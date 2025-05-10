'use client';

import Image from 'next/image';

interface OAuthButtonProps {
  provider: 'google' | 'kakao';
  onClick: (provider: 'google' | 'kakao') => void;
}

const PROVIDER_ICON: Record<'google' | 'kakao', string> = {
  google: '/icons/google.svg',
  kakao: '/icons/kakaotalk.svg',
};

const PROVIDER_ALT: Record<'google' | 'kakao', string> = {
  google: '구글 로그인',
  kakao: '카카오 로그인',
};

export default function OAuthButton({ provider, onClick }: OAuthButtonProps) {
  return (
    <button
      onClick={() => onClick(provider)}
      className="flex h-[42px] w-[42px] items-center justify-center"
    >
      <Image src={PROVIDER_ICON[provider]} alt={PROVIDER_ALT[provider]} width={42} height={42} />
    </button>
  );
}
