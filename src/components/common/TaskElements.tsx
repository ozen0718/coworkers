'use client';

import { trimColors } from '@/styles/trimColors';
import { TaskListTapProps, ProgressBadgeProps, TasksItemProp } from '@/types/tasktypes';
import stringToHash from '@/utils/stringToHash';
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
    <div className="bg-bg300 flex h-6 w-fit items-center justify-center gap-1 rounded-full px-2 py-1">
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
              trailColor: 'var(--color-white)',
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

function getTrimColor(text: string): string {
  const hash = stringToHash(text);
  return trimColors[hash % trimColors.length];
}

export function TasksItem({ tasksTitle, completed, total }: TasksItemProp) {
  const trimColor = getTrimColor(tasksTitle);

  return (
    <div className="bg-bg200 flex h-10 w-full items-center justify-between overflow-hidden rounded-xl">
      <div className="flex items-center justify-start gap-3">
        <div className="h-10 w-3" style={{ backgroundColor: trimColor }} />
        <p className="text-md-medium">{tasksTitle}</p>
      </div>
      <div className="mr-2 flex w-21.5 items-center justify-end gap-1">
        <ProgressBadge completedTaskNumber={completed} totalTaskNumber={total} />
        <button>
          <Image src="/icons/kebab.svg" width={16} height={16} alt="" />
        </button>
      </div>
    </div>
  );
}
