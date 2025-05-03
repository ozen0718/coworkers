'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import clsx from 'clsx';

import Modal from '@/components/common/Modal';
import ModalHeader from '@/components/common/Modal/ModalHeader';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { TextInput } from '@/components/common/Inputs';
import TodoFullCreateModal, { TodoFullCreateModalProps } from '@/components/TodoFullCreateModal';
import TodoItem from '@/components/List/todo';

interface Todo {
  id: number;
  title: string;
  date: string;
  dateObj: Date;
  time: string;
  recurring: boolean;
  comments: number;
  completed: boolean;
}
type TodosMap = Record<string, Todo[]>;

export default function TaskListPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const prevDay = () => setCurrentDate((d) => addDays(d, -1));
  const nextDay = () => setCurrentDate((d) => addDays(d, +1));

  const [tabs, setTabs] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [todosMap, setTodosMap] = useState<TodosMap>({});

  const [newListName, setNewListName] = useState('');
  const [isListModalOpen, setListModalOpen] = useState(false);
  const [isTodoModalOpen, setTodoModalOpen] = useState(false);

  const handleAddList = () => {
    const name = newListName.trim();
    if (!name) return;
    setTabs((prev) => [...prev, name]);
    setSelectedTab(name);
    setTodosMap((prev) => ({ ...prev, [name]: [] }));
    setNewListName('');
    setListModalOpen(false);
  };

  const handleCreateTodo: TodoFullCreateModalProps['onSubmit'] = ({
    title,
    date,
    time,
    repeat,
  }) => {
    if (!selectedTab || !date) return;
    const formatted = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    const newTodo: Todo = {
      id: Date.now(),
      title,
      date: formatted,
      dateObj: date,
      time,
      recurring: repeat !== '반복 안함',
      comments: 0,
      completed: false,
    };
    setTodosMap((prev) => ({
      ...prev,
      [selectedTab]: [...(prev[selectedTab] || []), newTodo],
    }));
    setTodoModalOpen(false);
  };

  const visibleTodos = tabs.includes(selectedTab)
    ? (todosMap[selectedTab] || []).filter(
        (todo) => todo.dateObj.toDateString() === currentDate.toDateString()
      )
    : [];

  return (
    <>
      <main className="min-h-screen bg-slate-900 py-6">
        <div className="mx-auto mt-6 max-w-[1200px] space-y-6 px-4 sm:px-6 md:px-8 lg:mt-10">
          <header className="space-y-4">
            <h1 className="text-2xl-medium text-white">할 일</h1>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-gray300 flex items-center space-x-3 text-base">
                <button onClick={prevDay}>
                  <Image src="/icons/type=left.svg" alt="이전" width={16} height={16} />
                </button>
                <p className="text-white">{format(currentDate, 'M월 d일 (eee)', { locale: ko })}</p>
                <button onClick={nextDay}>
                  <Image src="/icons/type=right.svg" alt="다음" width={16} height={16} />
                </button>
                <button
                  onClick={() => {
                    /* 캘린더 */
                  }}
                >
                  <Image src="/icons/icon_calendar.svg" alt="캘린더" width={16} height={16} />
                </button>
              </div>
              <button
                className="text-primary text-sm font-medium hover:underline"
                onClick={() => setListModalOpen(true)}
              >
                + 새로운 목록 추가하기
              </button>
            </div>
          </header>

          {tabs.length > 0 && (
            <nav className="flex flex-wrap space-x-6 border-b border-slate-700 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={clsx(
                    'pb-1 text-sm font-medium',
                    tab === selectedTab ? 'border-b-2 border-white text-white' : 'text-gray400'
                  )}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          )}

          <section>
            {visibleTodos.length > 0 ? (
              <ul className="space-y-4">
                {visibleTodos.map((todo) => (
                  <li key={todo.id}>
                    <TodoItem {...todo} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray500 text-center">등록된 할 일이 없습니다.</p>
            )}
          </section>

          <div className="hidden justify-end md:flex">
            <button
              className="bg-primary rounded-full px-4 py-2 text-white shadow-lg"
              onClick={() => setTodoModalOpen(true)}
            >
              + 할 일 추가
            </button>
          </div>
        </div>
      </main>

      <TodoFullCreateModal
        isOpen={isTodoModalOpen}
        onClose={() => setTodoModalOpen(false)}
        onSubmit={handleCreateTodo}
        disabled={!selectedTab}
      />

      <Modal
        isOpen={isListModalOpen}
        onClose={() => setListModalOpen(false)}
        onSubmit={handleAddList}
        submitButtonLabel="만들기"
        cancelButtonLabel={undefined}
        disabled={!newListName.trim()}
      >
        <ModalHeader title="새로운 목록 추가" />
        <p className="text-gray300 mt-2 mb-4 text-center text-sm">
          할 일에 대한 목록을 추가하고
          <br />
          목록별 할 일을 만들 수 있습니다.
        </p>
        <TextInput
          placeholder="목록 이름을 입력해주세요."
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="w-full bg-slate-700 text-gray-300 placeholder-gray-500"
        />
      </Modal>

      {/* 모바일*/}
      <footer className="md:hidden">
        <button
          className="bg-primary fixed inset-x-4 bottom-4 rounded-full px-4 py-2 text-center text-white shadow-lg"
          onClick={() => setTodoModalOpen(true)}
        >
          + 할 일 추가
        </button>
      </footer>
    </>
  );
}
