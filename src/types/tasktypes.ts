export interface TaskListTapProps {
  title: string;
  isSelected?: boolean;
}

export type TeamHeaderProps = {
  title: string;
  showGear?: boolean;
};

export interface ProgressBadgeProps {
  completedTaskNumber: number;
  totalTaskNumber: number;
}

export interface TaskListsItemProp {
  tasksTitle: string;
  completed: number;
  total: number;
  onClick?: () => void;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
  doneAt: string | null;
  updatedAt: string;
  deletedAt: string | null;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';
  recurringId: number;
  commentCount: number;
  displayIndex: number;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
  doneBy: {
    user: {
      id: number;
      nickname: string;
      image: string;
    };
  } | null;
  recurring: {
    startDate: string;
  };
}
