'use client';

import { TaskListTapProps, ProgressBadgeProps } from '@/types/tasktypes';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image';

export function TaskListTab({ title, isSelected = false }: TaskListTapProps) {
  return (
    <button
      className={`text-lg-medium py-1.5 ${isSelected ? 'border-b border-white text-white' : 'text-gray500 border-b-0'}`}
    >
      {title}
    </button>
  );
}

export function ProgressBadge({ completedTaskNumber, totalTaskNumber }: ProgressBadgeProps) {
  return (
    <div className="bg-bg300 flex h-6 w-14.5 items-center justify-between rounded-full px-2 py-1">
      {completedTaskNumber === totalTaskNumber ? (
        <Image src="/icons/done.svg" alt="완료됨" width={20} height={20} />
      ) : (
        <div className="h-3.5 w-3.5">
          <CircularProgressbar
            value={completedTaskNumber}
            maxValue={totalTaskNumber}
            strokeWidth={16}
            styles={buildStyles({
              pathColor: 'var(--color-primary)',
              trailColor: '#ffffff',
            })}
          />
        </div>
      )}
      <p className="text-primary text-md-regular">
        {completedTaskNumber}/{totalTaskNumber}
      </p>
    </div>
  );
}
