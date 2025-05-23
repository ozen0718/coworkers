'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import clsx from 'clsx';
import { notFound, useParams } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

import Modal from '@/components/common/Modal';
import TodoItem from '@/components/List/todo';
import { TextInput } from '@/components/common/Inputs';
import DetailPost from '@/components/Card/Post/Detail/DetailPost';
import SlideWrapper from '@/components/Card/SlideWrapper';
import TodoFullCreateModal, { TodoFullCreateModalProps } from './components/TodoFullCreateModal';
import { createTaskList, getTasksByTaskList } from '@/api/tasklist.api';
import { TaskList } from '@/types/tasklisttypes';
import { Task } from '@/types/tasktypes';
import { getGroupDetail } from '@/api/group.api';

import { useTaskReload } from '@/context/TaskReloadContext';

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

const convertTaskToTodo = (task: Task): Todo => ({
  id: task.id,
  title: task.name,
  date: task.date,
  time: '',
  recurring: false,
  comments: 0,
  completed: task.doneAt !== null,
});

export default function TaskListPage() {
  const params = useParams();
  const groupId = params.teamid as unknown as number;
  if (!groupId) {
    notFound();
    // return;
  }

  const { reloadKey } = useTaskReload();

  const [currentDate, setCurrentDate] = useState(new Date());
  const prevDay = () => setCurrentDate((d) => addDays(d, -1));
  const nextDay = () => setCurrentDate((d) => addDays(d, +1));
  const dateKey = format(currentDate, 'yyyy-MM-dd');

  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [selectedTaskList, setSelectedTaskList] = useState<TaskList | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const [newListName, setNewListName] = useState('');
  const [isListModalOpen, setListModalOpen] = useState(false);
  const [isTodoModalOpen, setTodoModalOpen] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [detailopen, setDetailOpen] = useState(false);

  useEffect(() => {
    const fetchTaskLists = async () => {
      setIsLoading(true);
      try {
        const { taskLists } = await getGroupDetail(groupId);
        // tasklistid 가져오기
        // groupid 옆 파라미터
        setTaskLists(taskLists);

        if (taskLists.length > 0) {
          setSelectedTaskList(taskLists[0]);
        }
      } catch (error) {
        console.error('Failed to fetch task lists:', error);
        toast.error('목록을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaskLists();
  }, [groupId, dateKey, reloadKey]);

  useEffect(() => {
    const loadTasksForList = async (taskList: TaskList) => {
      try {
        const tasks = await getTasksByTaskList(groupId, taskList.id, dateKey);
        const todos = tasks.map(convertTaskToTodo);
        console.log('convertTaskToTodo', convertTaskToTodo);

        console.log('todos', todos);
        setTodoList(todos);
      } catch (error) {
        console.error(`Failed to load tasks for list ${taskList.name}:`, error);
        toast.error(`${taskList.name} 목록의 할 일을 불러오는데 실패했습니다.`);
      }
    };

    if (selectedTaskList) {
      loadTasksForList(selectedTaskList);
    }
  }, [selectedTaskList, groupId, dateKey, reloadKey]);

  const handleAddList = async () => {
    const name = newListName.trim().slice(0, MAX_LIST_NAME_LENGTH);
    if (!name) return;
    const formattedName = `[${name}]`;

    setIsLoading(true);
    try {
      const newTaskList = await createTaskList({
        groupId,
        name: formattedName,
      });

      setTaskLists((prev) => [...prev, newTaskList]);

      setNewListName('');
      setListModalOpen(false);
      toast.success('새로운 목록이 생성되었습니다.');
    } catch (error) {
      console.error('Failed to create task list:', error);
      toast.error('목록 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTodo: TodoFullCreateModalProps['onSubmit'] = ({}) => {
    setTodoModalOpen(false);
  };

  const handleOpenDetail = (todo: Todo) => {
    setSelectedTodo(todo);
    setDetailOpen(true);
  };

  return (
    <>
      <Toaster position="top-center" />
      <main className="py-6">
        <div className="relative mx-auto mt-6 max-w-[1200px] space-y-6 px-4 sm:px-6 md:px-8 lg:mt-10">
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

          {taskLists.length > 0 && (
            <nav className="flex flex-wrap space-x-6 border-b border-slate-700 pb-2">
              {taskLists.map((taskList) => (
                <button
                  key={taskList.id}
                  className={clsx(
                    'pb-1 text-sm font-medium',
                    taskList.id === selectedTaskList?.id
                      ? 'border-b-2 border-white text-white'
                      : 'text-gray400'
                  )}
                  onClick={() => setSelectedTaskList(taskList)}
                >
                  {taskList.name}
                </button>
              ))}
            </nav>
          )}

          <section className="min-h-[calc(100vh-16rem)]">
            {todoList.length > 0 ? (
              <ul className="space-y-4">
                {todoList.map((todo) => (
                  <li key={todo.id}>
                    <div onClick={() => handleOpenDetail(todo)}>
                      <TodoItem {...todo} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="pointer-events-none inset-0 flex items-center justify-center">
                <p className="text-gray500 pointer-events-auto text-center">
                  아직 할 일 목록이 없습니다.
                </p>
              </div>
            )}

            <SlideWrapper isOpen={detailopen} onCloseAction={() => setDetailOpen(false)}>
              {selectedTodo && selectedTaskList && (
                <DetailPost
                  groupId={groupId}
                  tasklistid={selectedTaskList.id}
                  taskid={selectedTodo.id}
                  title={selectedTodo.title}
                  showComplete={false}
                  onCloseAction={() => setDetailOpen(false)}
                  time={selectedTodo.time}
                />
              )}
            </SlideWrapper>
          </section>

          <button
            disabled={taskLists.length === 0}
            onClick={() => setTodoModalOpen(true)}
            className={clsx(
              'bg-primary absolute right-6 bottom-6 rounded-full px-4 py-2 text-white shadow-lg',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          >
            + 할 일 추가
          </button>
        </div>
      </main>

      <TodoFullCreateModal
        key={isTodoModalOpen ? 'todo-open' : 'todo-closed'}
        isOpen={isTodoModalOpen}
        onCloseAction={() => setTodoModalOpen(false)}
        onSubmit={handleCreateTodo}
        disabled={!selectedTaskList?.id || isLoading}
        taskListId={selectedTaskList?.id}
        groupId={groupId}
      />

      <Modal
        key={isListModalOpen ? 'list-open' : 'list-closed'}
        isOpen={isListModalOpen}
        onClose={() => setListModalOpen(false)}
        onSubmit={handleAddList}
        header={{
          title: '새로운 목록 추가',
          description: `할 일에 대한 목록을 추가하고
        목록별 할 일을 만들 수 있습니다.`,
        }}
        submitButton={{
          label: isLoading ? '생성 중...' : '만들기',
        }}
        disabled={!newListName.trim() || isLoading}
      >
        <div className="mt-4">
          <TextInput
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="목록 이름을 입력해주세요."
            className="w-full text-gray-300 placeholder-gray-500"
            disabled={isLoading}
          />
        </div>
      </Modal>
    </>
  );
}
