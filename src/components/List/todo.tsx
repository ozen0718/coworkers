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
    <div className="flex items-center justify-between rounded-lg bg-slate-800 p-3">
      <div className="flex items-center space-x-3">
        <button onClick={toggleChecked} className="cursor-pointer">
          <Image
            src={isChecked ? '/icons/checkbox_done.svg' : '/icons/checkbox_defualt.svg'}
            alt={isChecked ? '완료' : '미완료'}
            width={18}
            height={18}
          />
        </button>
        <div className="flex flex-col space-y-1">
          <span
            className={`font-medium ${isChecked ? 'text-gray-400 line-through' : 'text-white'}`}
          >
            {title}
          </span>
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <Image src="/icons/icon_calendar.svg" alt="날짜" width={12} height={12} />
            <span>{date}</span>
            <span>·</span>
            <Image src="/icons/icon_time.svg" alt="시간" width={12} height={12} />
            <span>{time}</span>
            {recurring && (
              <>
                <span>·</span>
                <Image src="/icons/icon_repeat.svg" alt="반복" width={12} height={12} />
                <span>매일 반복</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Image src="/icons/icon_comment.svg" alt="댓글" width={16} height={16} />
        <span className="text-xs text-gray-300">{comments}</span>
        <Image src="/icons/kebab.svg" alt="더보기" width={16} height={16} />
      </div>
    </div>
  );
}
