'use client';

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ProgressProp } from '@/types/teampagetypes';

export default function ReportProgress({ percentage }: ProgressProp) {
  return (
    <div>
      <CircularProgressbarWithChildren
        value={percentage}
        maxValue={100}
        strokeWidth={16}
        styles={buildStyles({
          pathColor: 'url(#progressGradient)',
          trailColor: 'var(--color-bg100)',
        })}
      >
        <div className="flex flex-col items-center justify-center gap-0.5 sm:hidden">
          <p className="text-xs-medium text-gray300">오늘</p>
          <p className="text-xl-bold from-primary to-tertiary bg-gradient-to-r bg-clip-text text-transparent">
            {percentage}%
          </p>
        </div>
      </CircularProgressbarWithChildren>

      <svg className="absolute h-0 w-0">
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-tertiary)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
