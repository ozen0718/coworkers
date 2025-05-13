'use client';

import EditableNameSection from './EditableNameSection';
import CurrentEmailSection from './CurrentEmailSection';
import EditablePasswordSection from './EditablePasswordSection';
import AccountDeleteButton from './AccountDeleteButton';
import EditableProfileSection from './EditableProfileSection';
import { useUserInfo } from '@/hooks/useUserInfo';

export default function MyPage() {
  const { data: user, isLoading, error } = useUserInfo();

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생</p>;

  return (
    <div className="mx-auto flex max-w-[792px] flex-col gap-6 py-10">
      <h2 className="text-2lg-bold">계정 설정</h2>

      <EditableProfileSection width={64} />

      <div className="flex flex-col gap-4">
        <EditableNameSection name={user.nickname} />
        <CurrentEmailSection email={user.email} />
        <EditablePasswordSection />
      </div>

      <AccountDeleteButton />
    </div>
  );
}
