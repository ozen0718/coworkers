'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DropDown from '@/components/dropdown/BaseDropdown';
import DropDownProfileItemList from '@/components/dropdown/ProfileItemList';
import { useUserStore } from '@/stores/useUserStore';
import { useAuthStore } from '@/stores/useAuthStore';

export default function ProfileDropdown() {
  const { nickname } = useUserStore();
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const selected = e.currentTarget.textContent?.trim();
    if (selected === '로그아웃') {
      logout();
      router.push('/');
    }
  };

  return (
    <DropDown
      size="lg"
      placement="top-6 mt-2 right-0"
      dropDownOpenBtn={
        <button className="flex items-center gap-2">
          <Image src="/icons/profile.svg" alt="유저 아이콘" width={24} height={24} />
          <span className="text-md-md hidden lg:inline">
            {nickname ?? '...'} {/* fallback 처리 */}
          </span>
        </button>
      }
      options={DropDownProfileItemList}
      onSelect={handleSelect}
    />
  );
}
