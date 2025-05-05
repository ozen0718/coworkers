export interface MemberProps {
  profileUrl?: string;
  name: string;
  email: string;
}

export type ProgressProp = {
  percentage: number;
};

export interface UrgentTaskProps {
  title: string;
  dueDate: string;
}
