import React from 'react';
import TodoItem from '@/components/List/todo';

export default function ListPage() {
  const todos = [
    {
      id: 1,
      title: '동아리 활동 안내 드리기',
      date: '2024년 7월 29일',
      time: '오후 3:30',
      recurring: false,
      comments: 3,
      completed: true,
    },
    {
      id: 2,
      title: '등기 비용 안내 드리기',
      date: '2024년 7월 29일',
      time: '오후 3:30',
      recurring: false,
      comments: 3,
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8">
      <div className="mx-auto w-full max-w-xs space-y-4 md:max-w-full">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
}
