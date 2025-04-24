// components/Gnb/ProfileDropdown.tsx
import Image from 'next/image';
import DropDown from '@/components/dropdown/index';
import DropDownProfileItemList from '@/components/dropdown/ProfileItem';

interface Props {
  userName: string;
}

export default function ProfileDropdown({ userName }: Props) {
  return (
    <DropDown
      size="lg"
      placement="top-6 mt-2 right-0"
      dropDownOpenBtn={
        <button className="flex items-center gap-2">
          <Image src="/icons/profile.svg" alt="유저 아이콘" width={24} height={24} />
          <span className="text-md-md hidden lg:inline">{userName}</span>
        </button>
      }
      options={DropDownProfileItemList}
      onSelect={() => {}}
    />
  );
}
