import Image from 'next/image';
import ReportProgress from '@/components/teampage/ReportProgress';
import {
  ProgressProp,
  RecurringCountBoxProps,
  RecurringTasksReportColumnProps,
  ReportProps,
  TaskTotalAndDoneProps,
} from '@/types/teampagetypes';

const taskReportBoxStyle = 'flex h-20 w-full items-end justify-between bg-bg100 p-4 rounded-xl';
const taskReportTextBoxStyle = 'flex flex-col items-start justify-center gap-1 ';
const taskReportLabelStyle = 'text-xs-medium text-gray300';
const taskReportNumberStyle = 'text-2xl-bold text-tertiary';

function LeftSide({ percentage }: ProgressProp) {
  return (
    <div className="flex w-full items-center justify-start gap-2">
      <div className="h-43 w-43 shrink-0">
        <ReportProgress percentage={percentage} />
      </div>
      <div className="flex w-full justify-center">
        <div className="hidden flex-col items-start justify-center gap-1 lg:flex">
          <p className="text-md-medium">
            오늘의
            <br />
            진행 상황
          </p>
          <p className="from-primary to-tertiary text-4xl-bold bg-gradient-to-r bg-clip-text text-transparent">
            {percentage}%
          </p>
        </div>
      </div>
    </div>
  );
}

function TodayTasks({ total }: { total: number }) {
  return (
    <div className={taskReportBoxStyle}>
      <div className={taskReportTextBoxStyle}>
        <h3 className={taskReportLabelStyle}>오늘의 할 일</h3>
        <p className={taskReportNumberStyle}>{total}개</p>
      </div>
      <Image src="/icons/head.svg" alt="오늘의 할 일" width={40} height={40} />
    </div>
  );
}

function TodayCompletedTasks({ completed }: { completed: number }) {
  return (
    <div className={taskReportBoxStyle}>
      <div className={taskReportTextBoxStyle}>
        <h3 className={taskReportLabelStyle}>한 일</h3>
        <p className={taskReportNumberStyle}>{completed}개</p>
      </div>
      <Image src="/icons/sign_done.svg" alt="한 일" width={40} height={40} />
    </div>
  );
}

function TaskReportColumn({ total, completed }: TaskTotalAndDoneProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <TodayTasks total={total} />
      <TodayCompletedTasks completed={completed} />
    </div>
  );
}

function RecurringCountBox({ label, count, imageSrc }: RecurringCountBoxProps) {
  return (
    <div className={taskReportBoxStyle}>
      <div className={taskReportTextBoxStyle}>
        <h3 className={taskReportLabelStyle}>{label}</h3>
        <p className={taskReportNumberStyle}>{count}개</p>
      </div>
      <Image src={imageSrc} alt={label} width={40} height={40} />
    </div>
  );
}

function RecurringCountBoxMobile({ label, count, imageSrc }: RecurringCountBoxProps) {
  return (
    <div className={taskReportBoxStyle}>
      <div className={taskReportTextBoxStyle}>
        <h3 className={taskReportLabelStyle}>{label}</h3>
        <p className={taskReportNumberStyle}>{count}개</p>
      </div>
      <Image src={imageSrc} alt={label} width={40} height={40} />
    </div>
  );
}

function RecurringTasksReportColumn({
  weeklyCount,
  monthlyCount,
}: RecurringTasksReportColumnProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <RecurringCountBox
        label="오늘의 주간 반복"
        count={weeklyCount}
        imageSrc="/icons/weekly.svg"
      />
      <RecurringCountBox
        label="오늘의 월간 반복"
        count={monthlyCount}
        imageSrc="/icons/monthly.svg"
      />
    </div>
  );
}

function RecurringTasksReportColumnMobile({
  weeklyCount,
  monthlyCount,
}: RecurringTasksReportColumnProps) {
  return (
    <div className="mt-4 flex items-center justify-start gap-4 sm:hidden">
      <RecurringCountBoxMobile
        label="오늘의 주간 반복"
        count={weeklyCount}
        imageSrc="/icons/weekly.svg"
      />
      <RecurringCountBoxMobile
        label="오늘의 월간 반복"
        count={monthlyCount}
        imageSrc="/icons/monthly.svg"
      />
    </div>
  );
}

export default function Report({ total, completed, weeklyCount, monthlyCount }: ReportProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="relative w-full">
      <div className="bg-bg200 grid grid-cols-[1fr_0px_1fr] gap-1 rounded-xl px-2 py-2 sm:grid-cols-3 sm:gap-4 sm:px-6">
        <LeftSide percentage={percentage} />
        <div className="sm:hidden" />

        <div className="hidden justify-center sm:flex">
          <RecurringTasksReportColumn weeklyCount={weeklyCount} monthlyCount={monthlyCount} />
        </div>

        <div className="flex justify-end">
          <TaskReportColumn total={total} completed={completed} />
        </div>
      </div>

      <RecurringTasksReportColumnMobile weeklyCount={weeklyCount} monthlyCount={monthlyCount} />
    </div>
  );
}
