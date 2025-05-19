import { Task } from '@/types/tasktypes';

export interface TaskList {
  id: number;
  name: string;
  groupId: number;
  displayIndex: number;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}
