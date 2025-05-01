import Image from 'next/image';
import ReportProgress from '@/components/ReportProgress';
import { ProgressProp } from '@/types/teampagetypes';

const rightSideBoxStyle =
  'flex sm:gap-6 gap-1 h-fit w-full items-end justify-between bg-bg100 p-4 rounded-xl';
const rightSideTextBoxStyle = 'flex flex-col items-start justify-center gap-1 ';
const rightSideLabelStyle = 'text-xs-medium text-gray300';
const rightSideNumberStyle = 'text-2xl-bold text-tertiary';

function LeftSide({ percentage }: ProgressProp) {
  return (
    <div className="flex items-center justify-start gap-6 md:gap-11">
      <div className="h-43 w-43">
        <ReportProgress percentage={percentage} />
      </div>
      <div className="hidden flex-col items-start justify-center gap-1 sm:flex">
        <p className="text-md-medium text-gray100">
          오늘의
          <br />
          진행 상황
        </p>
        <p className="from-primary to-tertiary text-4xl-bold bg-gradient-to-r bg-clip-text text-transparent">
          {percentage}%
        </p>
      </div>
    </div>
  );
}

function TodayTasks() {
  return (
    <div className={rightSideBoxStyle}>
      <div className={rightSideTextBoxStyle}>
        <h3 className={rightSideLabelStyle}>오늘의 할 일</h3>
        <p className={rightSideNumberStyle}>20개</p>
      </div>
      <Image src="/icons/head.svg" alt="오늘의 할 일" width={40} height={40} />
    </div>
  );
}

function TodayCompletedTasks() {
  return (
    <div className={rightSideBoxStyle}>
      <div className={rightSideTextBoxStyle}>
        <h3 className={rightSideLabelStyle}>한 일</h3>
        <p className={rightSideNumberStyle}>5</p>
      </div>
      <Image src="/icons/sign_done.svg" alt="한 일" width={40} height={40} />
    </div>
  );
}

function RightSide() {
  return (
    <div className="flex w-full max-w-[50%] min-w-fit flex-col gap-4 sm:max-w-[45%] lg:max-w-[33%]">
      <TodayTasks />
      <TodayCompletedTasks />
    </div>
  );
}

export default function Report() {
  return (
    <div className="bg-bg200 flex h-fit w-full items-center justify-between gap-2 rounded-xl p-2 sm:p-6">
      <LeftSide percentage={25} />
      <RightSide />
    </div>
  );
}
