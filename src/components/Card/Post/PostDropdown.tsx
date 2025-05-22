'use client';

import React from 'react';
import clsx from 'clsx';

type PostDropdownProps = {
  type?: 'sort' | 'kebab';
  textJustify: 'center' | 'left';
  options: { label: string; value: string; action: () => void }[];
  isOpen: boolean;
  toggleDropdown: () => void;
  toppercent: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export default function PostDropdown({
  type,
  textJustify,
  options,
  isOpen,
  toggleDropdown,
  toppercent,
  onClick,
}: PostDropdownProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-bg200 border-bg100 absolute z-100 rounded-lg border-1',
        textJustify === 'center' && 'text-center',
        textJustify === 'left' && 'text-left',
        type === 'sort' ? 'w-[120px] min-w-[94px]' : 'w-[120px]',
        type === 'kebab' && 'h-[80px] w-[120px]'
      )}
      style={{
        top: toppercent,
        right: 0,
      }}
    >
      {/* 내용 */}
      {isOpen && (
        <div className="max-h-120 overflow-auto">
          {options.map((option, idx) => (
            <div
              key={idx}
              className="hover:bg-primary-hover cursor-pointer rounded-lg p-2"
              onClick={() => {
                option.action();
                toggleDropdown();
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
