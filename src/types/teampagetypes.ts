import { Membership } from '@/types/usertypes';
import { Task } from './tasktypes';

export interface MemberProps {
  profileUrl?: string | null;
  name: string;
  email: string;
  onClick: () => void;
  userId: number;
  isCurrentUserAdmin: boolean;
  isTargetAdmin: boolean;
}

export type ProgressProp = {
  percentage: number;
};

export interface TaskTotalAndDoneProps {
  total: number;
  completed: number;
}

export interface RecurringCountBoxProps {
  label: string;
  count: number | 0;
  imageSrc: string;
}

export interface RecurringTasksReportColumnProps {
  weeklyCount: number | 0;
  monthlyCount: number | 0;
}

export type GroupPageInfo = Pick<Membership, 'role'> & {
  group: Pick<Membership['group'], 'id' | 'name'>;
};

export type TaskInfo = Pick<Task, 'id' | 'name' | 'description' | 'date' | 'doneAt' | 'frequency'>;

export interface ReportProps extends TaskTotalAndDoneProps, RecurringTasksReportColumnProps {}
