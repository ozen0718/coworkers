'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import clsx from 'clsx';

import Modal from '@/components/common/Modal';
import TodoFullCreateModal, { TodoFullCreateModalProps } from '@/components/TodoFullCreateModal';
import TodoItem from '@/components/List/todo';
import { TextInput } from '@/components/common/Inputs';

const MAX_LIST_NAME_LENGTH = 15;

interface Todo {
  id: number;
  title: string;
  date: string;
  time: string;
  recurring: boolean;
  comments: number;
  completed: boolean;
}

export default function TaskListPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const prevDay = () => setCurrentDate((d) => addDays(d, -1));
  const nextDay = () => setCurrentDate((d) => addDays(d, +1));
  const dateKey = format(currentDate, 'yyyy-MM-dd');

  const [tabsMap, setTabsMap] = useState<Record<string, string[]>>({});
  const [todosMap, setTodosMap] = useState<Record<string, Record<string, Todo[]>>>({});
  const [selectedTab, setSelectedTab] = useState<string>('');

  const [newListName, setNewListName] = useState('');
  const [isListModalOpen, setListModalOpen] = useState(false);
  const [isTodoModalOpen, setTodoModalOpen] = useState(false);

  useEffect(() => {
    setSelectedTab('');
  }, [dateKey]);

  const visibleTabs = tabsMap[dateKey] || [];
  const visibleTodos = selectedTab ? todosMap[dateKey]?.[selectedTab] || [] : [];

  const handleAddList = () => {
    const name = newListName.trim().slice(0, MAX_LIST_NAME_LENGTH);
    if (!name) return;
    setTabsMap((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), name],
    }));
    setTodosMap((prev) => ({
      ...prev,
      [dateKey]: {
        ...(prev[dateKey] || {}),
        [name]: [],
      },
    }));
    setSelectedTab(name);
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
      time,
      recurring: repeat !== '반복 안함',
      comments: 0,
      completed: false,
    };
    setTodosMap((prev) => {
      const day = prev[dateKey] || {};
      const list = day[selectedTab] || [];
      return {
        ...prev,
        [dateKey]: {
          ...day,
          [selectedTab]: [...list, newTodo],
        },
      };
    });
    setTodoModalOpen(false);
  };

  return (
    <>
      <div className="relative mt-6 space-y-6 lg:mt-10">
        <header className="space-y-4">
          <h1 className="text-2lg-bold md:!text-xl">할 일</h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-base">
              <button onClick={prevDay}>
                <Image src="/icons/type=left.svg" alt="이전" width={16} height={16} />
              </button>
              <p>{format(currentDate, 'M월 d일 (eee)', { locale: ko })}</p>
              <button onClick={nextDay}>
                <Image src="/icons/type=right.svg" alt="다음" width={16} height={16} />
              </button>
              <button
                onClick={() => {
                  /* 캘린더 열기 */
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

        {visibleTabs.length > 0 && (
          <nav className="flex flex-wrap space-x-6 border-b border-slate-700 pb-2">
            {visibleTabs.map((tab) => (
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

        <section className="min-h-[calc(100vh-16rem)]">
          {visibleTodos.length > 0 ? (
            <ul className="space-y-4">
              {visibleTodos.map((todo) => (
                <li key={todo.id}>
                  <TodoItem {...todo} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
              <p className="text-gray500 pointer-events-auto text-center">
                아직 할 일 목록이 없습니다.
              </p>
            </div>
          )}
        </section>

        <button
          disabled={visibleTabs.length === 0}
          onClick={() => setTodoModalOpen(true)}
          className={clsx(
            'bg-primary absolute right-6 bottom-6 rounded-full px-4 py-2 text-white shadow-lg',
            visibleTabs.length === 0 && 'cursor-not-allowed opacity-50'
          )}
        >
          + 할 일 추가
        </button>
      </div>

      <TodoFullCreateModal
        key={isTodoModalOpen ? 'todo-open' : 'todo-closed'}
        isOpen={isTodoModalOpen}
        onClose={() => setTodoModalOpen(false)}
        onSubmit={handleCreateTodo}
        disabled={!selectedTab}
      />

      <Modal
        key={isListModalOpen ? 'list-open' : 'list-closed'}
        isOpen={isListModalOpen}
        onClose={() => setListModalOpen(false)}
        onSubmit={handleAddList}
        submitButtonLabel="만들기"
        disabled={!newListName.trim()}
        title="새로운 목록 추가"
        description={`할 일에 대한 목록을 추가하고 
        목록별 할 일을 만들 수 있습니다.`}
      >
        <div className="mt-4">
          <TextInput
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="목록 이름을 입력해주세요."
            className="w-full text-gray-300 placeholder-gray-500"
          />
        </div>
      </Modal>
    </>
  );
}
