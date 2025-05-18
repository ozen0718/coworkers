import { Memberships } from '@/types/usertypes';
import { Task } from './tasktypes';

export interface MemberProps {
  profileUrl?: string;
  name: string;
  email: string;
  onClick: () => void;
}

export type ProgressProp = {
  percentage: number;
};

export interface UrgentTaskProps {
  title: string;
  dueDate: string;
}

export type GroupPageInfo = Pick<Memberships, 'role'> & {
  group: Pick<Memberships['group'], 'id' | 'name'>;
};

export type TaskInfo = Pick<Task, 'id' | 'name' | 'description' | 'date' | 'doneAt'>;

export interface ReportProps {
  total: number;
  completed: number;
}
