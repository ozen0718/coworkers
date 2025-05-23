import { getKoreanDateString } from '@/utils/date';

interface Task {
  name: string;
  doneAt: string;
}

interface TaskHistory {
  title: string;
}

export function groupTasksByDate(tasks: Task[]): Record<string, TaskHistory[]> {
  return tasks.reduce(
    (acc, task) => {
      const dateKey = getKoreanDateString(task.doneAt);
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push({
        title: task.name,
      });
      return acc;
    },
    {} as Record<string, TaskHistory[]>
  );
}
