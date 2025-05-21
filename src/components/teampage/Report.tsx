import Image from 'next/image';
import Alert from '@/assets/icons/Alert';
import ReportProgress from '@/components/teampage/ReportProgress';
import {
  ProgressProp,
  NewestTaskProps as NewestTaskProps,
  ReportProps,
} from '@/types/teampagetypes';
import { formatElapsedTime } from '@/utils/date';

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
        <p className={taskReportNumberStyle}>{completed}</p>
      </div>
      <Image src="/icons/sign_done.svg" alt="한 일" width={40} height={40} />
    </div>
  );
}

function TaskReportColumn({ total, completed }: ReportProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <TodayTasks total={total} />
      <TodayCompletedTasks completed={completed} />
    </div>
  );
}

function NewestTask({ title, startDate }: NewestTaskProps) {
  const elapsedTime = startDate ? formatElapsedTime(startDate) : '알 수 없음';

  return (
    <div
      className={`${taskReportBoxStyle} border-danger from-danger via-bg200 to-bg100 bg-gradient-to-r via-[12px] to-50%`}
    >
      <div className={taskReportTextBoxStyle}>
        <h3 className="text-xs-medium text-pink">NEWEST</h3>
        <p className={taskReportLabelStyle}>{elapsedTime}</p>
        <p className={`${taskReportNumberStyle} text-md-medium break-word line-clamp-1`}>{title}</p>
      </div>
    </div>
  );
}

function NewestTaskForMobile({ title, startDate }: NewestTaskProps) {
  const elapsedTime = startDate ? formatElapsedTime(startDate) : '알 수 없음';

  return (
    <div className="bg-bg200 right-[28%] flex h-14 w-full items-center justify-start gap-4 rounded-xl pr-2">
      <div className="from-danger to-bg200 flex h-full w-70 items-center justify-start gap-2 rounded-l-xl bg-gradient-to-r px-2">
        <Alert className="text-white" />
        <div className="flex flex-col items-center justify-center">
          <p className="text-xs-regular text-tertiary test-left w-full whitespace-nowrap">NEWEST</p>
          <p className="text-lg-medium h-fit w-fit rounded-l-full whitespace-nowrap">
            {elapsedTime}
          </p>
        </div>
      </div>
      <div className="flex h-full w-full items-center">
        <p className="text-md-regular break-word line-clamp-2">{title}</p>
      </div>
    </div>
  );
}

function NewestTasksReportColumn({ tasks }: { tasks: NewestTaskProps[] }) {
  return (
    <div className="flex w-full flex-col gap-4">
      {tasks.map((task, index) => (
        <NewestTask key={index} title={task.title} startDate={task.startDate} />
      ))}
    </div>
  );
}

export default function Report({ total, completed, newestTasks: newestTasks = [] }: ReportProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="relative w-full">
      <div className="bg-bg200 grid grid-cols-2 gap-4 rounded-xl px-2 py-2 sm:grid-cols-3 sm:px-6">
        <LeftSide percentage={percentage} />
        {newestTasks.length > 0 && newestTasks[0].startDate !== '' && (
          <div className="hidden justify-center sm:flex">
            <NewestTasksReportColumn tasks={newestTasks} />
          </div>
        )}
        <div className="flex justify-end">
          <TaskReportColumn total={total} completed={completed} />
        </div>
      </div>
      {newestTasks.length > 0 && newestTasks[0].startDate !== '' && (
        <div className="mt-4 flex flex-col items-center justify-start gap-4 sm:hidden">
          {newestTasks.map((newestTask, index) => (
            <NewestTaskForMobile
              key={index}
              title={newestTask.title}
              startDate={newestTask.startDate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
