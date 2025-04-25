'use client';
import Image from 'next/image';
import React, { useState } from 'react';

interface TodoItemProps {
  id: number;
  title: string;
  date: string;
  time: string;
  recurring: boolean;
  comments: number;
  completed: boolean;
}

export default function TodoItem({
  title,
  date,
  time,
  recurring,
  comments,
  completed,
}: TodoItemProps) {
  const [isChecked, setIsChecked] = useState(completed);
  const toggleChecked = () => setIsChecked((prev) => !prev);

  return (
    <div className="flex flex-col space-y-2 rounded-lg bg-slate-800 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={toggleChecked} aria-pressed={isChecked} className="cursor-pointer p-1">
            <Image
              src={isChecked ? '/icons/checkbox_done.svg' : '/icons/checkbox_defualt.svg'}
              alt={isChecked ? '완료' : '미완료'}
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </button>
          <span
            className={`font-medium ${isChecked ? 'text-gray-400 line-through' : 'text-white'}`}
          >
            {title}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Image src="/icons/icon_comment.svg" alt="댓글" width={16} height={16} />
          <span className="text-xs text-gray-300">{comments}</span>
          <Image src="/icons/kebab.svg" alt="더보기" width={16} height={16} />
        </div>
      </div>

      <div className="flex items-center space-x-4 text-xs text-gray-400">
        <div className="flex items-center space-x-1">
          <Image src="/icons/icon_calendar.svg" alt="날짜" width={12} height={12} />
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Image src="/icons/icon_time.svg" alt="시간" width={12} height={12} />
          <span>{time}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Image
            src="/icons/icon_repeat.svg"
            alt="반복"
            width={12}
            height={12}
            className={recurring ? '' : 'opacity-30'}
          />
          {recurring && <span>매일 반복</span>}
        </div>
      </div>
    </div>
  );
}
