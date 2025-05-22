'use client';
import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

type ArrowDropdownProps = {
  size?: 'sm' | 'md' | 'lg';
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
};

export default function ArrowDropdown({
  size = 'lg',
  options,
  selected,
  onSelect,
  className,
}: ArrowDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={clsx('relative', className)}>
      <button
        onClick={toggleDropdown}
        className={clsx(
          'text-md-regular flex items-center justify-between rounded-xl p-2 sm:px-[14px] sm:py-2.5',
          size === 'sm' && 'text-gray100 h-[40px] w-[94px]',
          size === 'md' && 'text-gray500 h-[44px] w-[109px]',
          size === 'lg' && 'text-gray100 text-xs-regular white-space: nowrap; h-[44px] w-[120px]',
          isOpen ? 'bg-bg100' : size === 'md' ? 'bg-bg500' : 'bg-bg200'
        )}
      >
        {selected || options[0]}
        <span className="text-sm">
          <Image alt="화살표" width={15.7} height={7.42} src="/icons/down_arrow.svg" />
        </span>
      </button>

      {isOpen && (
        <div
          className={clsx(
            'bg-bg200 text-md-regular absolute z-[999] mt-1 w-full overflow-hidden rounded-xl shadow-lg',
            size === 'sm' && 'min-h-[80px] min-w-[120px]',
            size === 'md' ? 'border border-[#F8FAFC1A]' : 'border border-[#334155]',
            size === 'lg' && 'min-h-[80px] min-w-[120px]'
          )}
        >
          {options.map((option) => (
            <div
              key={option}
              className={clsx(
                'text-gray100 hover:bg-primary-hover h-[40px] cursor-pointer rounded-md px-2 py-[13px] sm:px-[14px] sm:py-[11.5px]'
              )}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
