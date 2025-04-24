'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type OptionsType = React.ReactNode[] | string[];

export interface DropDownProps {
  onSelect?: (e: React.MouseEvent<HTMLDivElement>) => void;
  options: OptionsType;
  size: Size;
  dropDownOpenBtn?: React.ReactNode;
  footerBtn?: React.ReactNode;
  placement: string;
}

export default function DropDown({
  onSelect,
  dropDownOpenBtn,
  options,
  size,
  footerBtn = null,
  placement,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hashedIndex = size.charCodeAt(0) % options.length;

  const handleClickOption = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(false);
    onSelect?.(e);
  };

  return (
    <div className="relative h-fit w-fit">
      <div className="cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
        {dropDownOpenBtn}
      </div>

      {isOpen && (
        <div
          className={clsx(
            'bg-bg200 border-bg100 absolute z-100 rounded-lg border border-1',
            size === 'xl' && 'h-fit px-4 py-4',
            footerBtn && 'flex flex-col gap-4',
            placement
          )}
        >
          <div className="max-h-120 overflow-auto">
            {options.map((option, idx) => (
              <div
                key={hashedIndex + idx}
                className={clsx(
                  'hover:bg-bg100 flex cursor-pointer items-center justify-center rounded-lg',
                  size === 'xs' && 'text-xs-medium h-10 w-[94px]',
                  size === 'sm' && 'text-md-medium h-10 w-[109px]',
                  size === 'md' && 'text-md-medium h-10 w-30',
                  size === 'lg' && 'text-lg-medium h-[47px] w-[135px]'
                )}
                onClick={handleClickOption}
              >
                {option}
              </div>
            ))}
          </div>
          {footerBtn}
        </div>
      )}
    </div>
  );
}
