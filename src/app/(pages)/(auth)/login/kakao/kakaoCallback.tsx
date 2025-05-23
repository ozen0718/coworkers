'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      alert('카카오 인가 코드가 존재하지 않습니다.');
      router.replace('/login');
      return;
    }

    const handleKakaoLogin = async () => {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin/KAKAO`, {
          token: code,
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
        });

        const { accessToken, refreshToken, user } = res.data;

        // 토큰 저장
        useAuthStore.getState().setAccessToken(accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // 사용자 정보 저장
        useUserStore.getState().setUserInfo({
          nickname: user.nickname,
          profileImage: user.image ?? null,
          teams: [],
        });

        router.replace('/');
      } catch {
        alert('카카오 로그인에 실패했습니다.');
        router.replace('/login');
      }
    };

    handleKakaoLogin();
  }, [router, searchParams]);

  return null;
}
