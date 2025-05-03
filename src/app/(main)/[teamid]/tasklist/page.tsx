'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { addDays, format } from 'date-fns';
import clsx from 'clsx';
import Modal from '@/components/common/Modal';
import ModalHeader from '@/components/common/Modal/ModalHeader';
import TodoFullCreateModal, { TodoFullCreateModalProps } from '@/components/TodoFullCreateModal';
import TodoItem from '@/components/List/todo';

interface Todo {
  id: number;
  title: string;
  date: string;
  time: string;
  recurring: boolean;
  comments: number;
  completed: boolean;
}

type TodosMap = Record<string, Todo[]>;

export default function TaskListPage() {
  // 날짜 네비게이션 상태
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const prevDay = () => setCurrentDate((d) => addDays(d, -1));
  const nextDay = () => setCurrentDate((d) => addDays(d, +1));

  // 탭 및 탭별 할 일 상태
  const [tabs, setTabs] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [todosMap, setTodosMap] = useState<TodosMap>({});

  // 신규 목록 모달 상태
  const [newListName, setNewListName] = useState('');
  const [isListModalOpen, setListModalOpen] = useState(false);

  // 할 일 모달 상태
  const [open, setOpen] = useState(false);

  // 새로운 목록 생성 핸들러
  const handleAddList = () => {
    const name = newListName.trim();
    if (!name) return;
    setTabs((prev) => [...prev, name]);
    setSelectedTab(name);
    setTodosMap((prev) => ({ ...prev, [name]: [] }));
    setNewListName('');
    setListModalOpen(false);
  };

  // 할 일 생성 핸들러
  const handleCreate: TodoFullCreateModalProps['onSubmit'] = ({ title, date, time, repeat }) => {
    if (!selectedTab) return;
    const formattedDate = date
      ? `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
      : '';
    const newTodo: Todo = {
      id: Date.now(),
      title,
      date: formattedDate,
      time,
      recurring: repeat !== '반복 안함',
      comments: 0,
      completed: false,
    };
    setTodosMap((prev) => ({
      ...prev,
      [selectedTab]: [...(prev[selectedTab] || []), newTodo],
    }));
    setOpen(false);
  };

  // 현재 탭의 할 일 목록
  const visibleTodos = tabs.includes(selectedTab) ? todosMap[selectedTab] || [] : [];

  return (
    <>
      <div className="min-h-screen space-y-6 bg-slate-900 px-4 py-6">
        {/* 페이지 헤더 */}
        <h1 className="text-2xl-medium mt-10 text-white">할 일</h1>

        {/* 날짜 네비게이션 & 신규 목록 버튼 */}
        <div className="flex items-center justify-between">
          <div className="text-gray300 flex items-center space-x-3 text-base">
            <button onClick={prevDay}>
              <Image src="/icons/type=left.svg" alt="이전" width={16} height={16} />
            </button>
            <p className="text-white">{format(currentDate, 'M월 d일 (eee)')}</p>
            <button onClick={nextDay}>
              <Image src="/icons/type=right.svg" alt="다음" width={16} height={16} />
            </button>
            <button
              onClick={() => {
                /* TODO: 달력 열기 */
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

        {/* 탭 메뉴 */}
        {tabs.length > 0 && (
          <div className="flex space-x-6 border-b border-slate-700 pb-2">
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
          </div>
        )}

        {/* 할 일 리스트 */}
        {visibleTodos.length > 0 ? (
          <div className="space-y-4">
            {visibleTodos.map((t) => (
              <TodoItem key={t.id} {...t} />
            ))}
          </div>
        ) : (
          <p className="text-gray500 text-center">등록된 할 일이 없습니다.</p>
        )}
      </div>

      {/* 할 일 추가 버튼 & 모달 */}
      <button
        className="bg-primary fixed right-6 bottom-6 rounded-full px-4 py-2 text-white shadow-lg"
        onClick={() => setOpen(true)}
      >
        + 할 일 추가
      </button>
      <TodoFullCreateModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreate}
        disabled={!selectedTab}
      />

      {/* 새로운 목록 추가 모달 */}
      <Modal
        isOpen={isListModalOpen}
        onClose={() => setListModalOpen(false)}
        onSubmit={handleAddList}
        submitButtonLabel="만들기"
        disabled={!newListName.trim()}
      >
        <ModalHeader title="새로운 목록 추가" />
        <p className="text-gray300 mb-4 text-sm">
          할 일에 대한 목록을 추가하고
          <br />
          목록별 할 일을 만들 수 있습니다.
        </p>
        <input
          className="mb-4 h-10 w-full rounded-md bg-slate-700 px-3 text-gray-300 placeholder-gray-500"
          placeholder="목록 이름을 입력해주세요."
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
      </Modal>
    </>
  );
}
