export interface TaskListTapProps {
  title: string;
  isSelected?: boolean;
}

export type TeamHeaderProp = {
  title: string;
};

export interface ProgressBadgeProps {
  completedTaskNumber: number;
  totalTaskNumber: number;
}
