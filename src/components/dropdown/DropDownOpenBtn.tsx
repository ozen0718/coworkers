'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { Size } from './BaseDropdown';
import { useEffect, useState } from 'react';

interface Props {
  size: Size;
  currentSelected: string;
}

export default function DropDownOpenBtn({ size, currentSelected }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const iconSrc = isMobile ? '/icons/gnb_menu.svg' : '/icons/check.svg';

  return (
    <div
      className={clsx(
        'bg-bg200 flex items-center justify-center rounded-xl',
        size === 'xs' && 'text-xs-rg h-10 w-[94px] px-2 py-2',
        size === 'sm' && 'text-md-rg bg-bg400 h-11 w-[109px] px-3 py-[10px]',
        size === 'md' && 'text-md-rg h-11 w-30 px-[14px] py-[10px]',
        size === 'xl' && 'text-lg-rg h-fit w-[97px]'
      )}
    >
      <div className="flex w-full justify-between">
        <p className="w-full truncate">{currentSelected}</p>
        <Image src={iconSrc} width={16} height={16} alt="드롭다운 아이콘" />
      </div>
    </div>
  );
}
