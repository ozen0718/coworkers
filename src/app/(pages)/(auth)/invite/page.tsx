'use client';

import { Suspense } from 'react';
import InvitePageContent from '@/app/(pages)/(auth)/invite/InvitePageContent';

export default function InvitePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">초대 정보를 불러오는 중...</div>}>
      <InvitePageContent />
    </Suspense>
  );
}
