'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { MyHistoryItemProps } from '@/types/myhistorytypes';
import ActionMenu from '@/components/common/ActionMenu';

export default function TodoItem({ title, completed }: MyHistoryItemProps) {
  const [isChecked, setIsChecked] = useState(completed);
  const toggleChecked = () => setIsChecked((prev) => !prev);

  return (
    <div className="bg-bg200 flex h-fit min-h-11 w-full items-center justify-between rounded-lg px-3.5 py-2.5">
      <button
        onClick={toggleChecked}
        aria-pressed={isChecked}
        className="flex cursor-pointer gap-3 p-1"
      >
        <Image
          src={isChecked ? '/icons/checkbox_done.svg' : '/icons/checkbox_default.svg'}
          alt={isChecked ? '완료' : '미완료'}
          width={24}
          height={24}
          className={clsx('h-6 w-6', {
            'text-green-400': isChecked,
            'text-gray-400': !isChecked,
          })}
        />

        <span
          className={clsx('text-left font-medium break-all whitespace-normal', {
            'text-gray-400 line-through': isChecked,
            'text-white': !isChecked,
          })}
        >
          {title}
        </span>
      </button>

      <ActionMenu
        trigger={
          <Image
            src="/icons/kebab.svg"
            alt="더보기"
            width={16}
            height={16}
            className="h-4 w-4 text-gray-300"
          />
        }
        onEdit={() => console.log('수정하기')}
        onDelete={() => console.log('삭제하기')}
      />
    </div>
  );
}
