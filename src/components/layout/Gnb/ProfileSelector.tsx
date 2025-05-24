'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import DropDown from '@/components/dropdown/BaseDropdown';
import DropDownProfileItemList from '@/components/dropdown/ProfileItemList';
import { useUserStore } from '@/stores/useUserStore';
import { useAuthStore } from '@/stores/useAuthStore';
import useClickOutside from '@/hooks/useClickOutside';

export default function ProfileDropdown() {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { nickname } = useUserStore();
  const { logout } = useAuthStore();
  const router = useRouter();

  useClickOutside(ref, () => setIsOpen(false));

  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const selected = e.currentTarget.textContent?.trim();
    if (selected === '로그아웃') {
      logout();
      router.push('/');
    }
    setIsOpen(false); //선택 시 드롭다운 닫기
  };

  return (
    <div ref={ref}>
      <DropDown
        size="lg"
        placement="top-6 mt-2 right-0"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dropDownOpenBtn={
          <button className="flex items-center gap-2">
            <Image src="/icons/profile.svg" alt="유저 아이콘" width={24} height={24} />
            <span className="text-md-md hidden lg:inline">{nickname ?? '...'}</span>
          </button>
        }
        options={DropDownProfileItemList}
        onSelect={handleSelect}
      />
    </div>
  );
}
