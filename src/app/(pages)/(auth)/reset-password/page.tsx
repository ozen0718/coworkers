'use client';

import { Suspense } from 'react';
import ResetPasswordHandler from './passwordHandler';

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">비밀번호 재설정 페이지를 불러오는 중...</div>}
    >
      <ResetPasswordHandler />
    </Suspense>
  );
}
