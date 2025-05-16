'use client';

import OAuthButton from './OAuthButton';
import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function OAuthButtonGroup() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('✅ window 객체 있음');

      if (window.Kakao) {
        console.log('✅ Kakao 객체 있음:', window.Kakao);

        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
          console.log('✅ Kakao SDK 초기화 완료');
        } else {
          console.log('⚠️ Kakao SDK 이미 초기화됨');
        }
      } else {
        console.warn('❌ Kakao 객체가 아직 로드되지 않았습니다.');
      }
    }
  }, []);

  const handleOAuthLogin = (provider: 'google' | 'kakao') => {
    console.log(`🟡 ${provider} 로그인 시도`);

    if (provider === 'kakao') {
      if (!window.Kakao || !window.Kakao.Auth) {
        console.error('❌ Kakao SDK가 로드되지 않았거나 초기화되지 않았습니다.');
        alert('카카오 로그인을 사용할 수 없습니다. 페이지를 새로고침 해주세요.');
        return;
      }

      console.log('✅ Kakao.Auth.authorize 실행');
      window.Kakao.Auth.authorize({
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
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
