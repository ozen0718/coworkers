'use client';

import OAuthButton from './OAuthButton';
import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (options: { redirectUri: string }) => void;
      };
    };
  }
}

export default function OAuthButtonGroup() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!);
      }
    }
  }, []);

  const handleOAuthLogin = (provider: 'google' | 'kakao') => {
    if (provider === 'kakao') {
      if (!window.Kakao || !window.Kakao.Auth) {
        alert('카카오 로그인을 사용할 수 없습니다. 페이지를 새로고침 해주세요.');
        return;
      }

      window.Kakao.Auth.authorize({
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
      });
    } else if (provider === 'google') {
      alert('구글 로그인은 지원하지 않습니다.');
    }
  };

  return (
    <div className="flex gap-3">
      <OAuthButton provider="google" onClick={handleOAuthLogin} />
      <OAuthButton provider="kakao" onClick={handleOAuthLogin} />
    </div>
  );
}
