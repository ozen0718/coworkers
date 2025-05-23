'use client';

import { Suspense } from 'react';
import KakaoCallback from './kakaoCallback';

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">카카오 로그인 처리 중...</div>}>
      <KakaoCallback />
    </Suspense>
  );
}
