import IconDone from '@/assets/icons/Done';

interface TaskHistoryByDateProps {
  date: string;
  history: {
    title: string;
  }[];
}

export default function TaskHistoryByDate({ date, history }: TaskHistoryByDateProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg-medium">{date}</h2>
      <ul className="flex flex-col gap-4">
        {history.map((item, index) => (
          <li
            className="bg-bg200 text-md-regular flex gap-2 h-fit min-h-11 items-center rounded-lg px-3.5 py-2.5"
            key={index}
          >
            <IconDone gradientStartColor="#334155" gradientEndColor="#94a3b8" />
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
