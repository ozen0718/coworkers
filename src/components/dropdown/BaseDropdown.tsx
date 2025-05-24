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

  //외부 제어용
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export default function DropDown({
  onSelect,
  dropDownOpenBtn,
  options,
  size,
  footerBtn = null,
  placement,
  isOpen: controlledIsOpen,
  setIsOpen: setControlledIsOpen,
}: DropDownProps) {
  // 언컨트롤드 fallback
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : uncontrolledIsOpen;
  const setIsOpen = setControlledIsOpen ?? setUncontrolledIsOpen;

  const hashedIndex = size.charCodeAt(0) % options.length;

  const handleClickOption = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(false);
    onSelect?.(e);
  };

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative overflow-visible">
      {/* overflow-visible로 부모가 자식 잘림 방지 */}
      <div className="cursor-pointer" onClick={handleToggleOpen}>
        {dropDownOpenBtn}
      </div>

      {isOpen && (
        <div
          className={clsx(
            'bg-bg200 border-bg100 absolute z-50 rounded-lg border',
            size === 'xl' && 'h-fit px-4 py-4',
            footerBtn && 'flex flex-col gap-4',
            placement
          )}
          style={{ overflow: 'visible' }}
        >
          <div className="scroll-area max-h-120 overflow-auto">
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
