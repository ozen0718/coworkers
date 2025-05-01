export interface MyHistoryItemProps {
  title: string;
  completed: boolean;
}

export interface MyHistoryByDateProps {
  date: string;
  history: MyHistoryItemProps[];
  customClass?: string;
}
