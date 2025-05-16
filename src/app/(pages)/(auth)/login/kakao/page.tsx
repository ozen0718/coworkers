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
      console.error('❌ 인가 코드가 존재하지 않습니다.');
      return;
    }

    const handleKakaoLogin = async () => {
      try {
        console.log('🟡 카카오 인가 코드:', code);

        // ✅ 백엔드 API 호출
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin/KAKAO`, {
          token: code,
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
        });

        console.log('🟢 로그인 API 응답:', res.data);

        const { accessToken, refreshToken, user } = res.data;

        console.log('🟢 accessToken:', accessToken);
        console.log('🟢 user:', user);

        // ✅ 토큰 저장
        useAuthStore.getState().setAccessToken(accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // ✅ 사용자 정보 저장 (memberships가 없을 경우 빈 배열로 처리)
        useUserStore.getState().setUserInfo({
          nickname: user.nickname,
          profileImage: user.image ?? null,
          teams: [], // 👉 팀 정보가 필요하면 추후 별도 API 호출
        });

        console.log('✅ 로그인 상태 저장 완료 → 홈으로 이동');
        router.replace('/');
      } catch (error) {
        console.error('❌ 카카오 로그인 실패:', error);
        alert('카카오 로그인에 실패했습니다.');
        router.replace('/login');
      }
    };

    handleKakaoLogin();
  }, []);

  return <div className="p-6 text-white">카카오 로그인 처리 중입니다...</div>;
}
