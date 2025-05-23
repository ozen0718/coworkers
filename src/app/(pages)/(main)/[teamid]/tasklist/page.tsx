'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import clsx from 'clsx';
import { notFound, useParams, useSearchParams, useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Modal from '@/components/common/Modal';
import TodoItem from '@/components/List/todo';
import { TextInput } from '@/components/common/Inputs';
import DetailPost from '@/components/Card/Post/Detail/DetailPost';
import SlideWrapper from '@/components/Card/SlideWrapper';
import TodoFullCreateModal, { TodoFullCreateModalProps } from './components/TodoFullCreateModal';
import { createTaskList, getTasksByTaskList, updateTaskListOrder } from '@/api/tasklist.api';
import { TaskList } from '@/types/tasklisttypes';
import { Task } from '@/types/tasktypes';
import { getGroupDetail } from '@/api/group.api';

import { useTaskReload } from '@/context/TaskReloadContext';
import DatePickerCalendar from './components/TodoFullCreateModal/DatePickerCalender';

const MAX_LIST_NAME_LENGTH = 10;
const KOREAN_CONSONANT_VOWEL_REGEX = /^[ㄱ-ㅎㅏ-ㅣ]+$/;

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

interface DraggableTaskListProps {
  taskList: TaskList;
  index: number;
  moveTaskList: (dragIndex: number, hoverIndex: number) => void;
  isSelected: boolean;
  onSelect: (taskList: TaskList) => void;
}

const DraggableTaskList: React.FC<DraggableTaskListProps> = ({
  taskList,
  index,
  moveTaskList,
  isSelected,
  onSelect,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASKLIST',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TASKLIST',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveTaskList(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        drag(drop(node));
      }}
      className={clsx(
        'cursor-move pb-1 text-sm font-medium',
        isSelected ? 'border-b-2 border-white text-white' : 'text-gray400',
        isDragging ? 'opacity-50' : ''
      )}
      onClick={() => onSelect(taskList)}
    >
      {taskList.name}
    </div>
  );
};

export default function TaskListPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const teamId = params.teamid as string;
  const groupId = params.teamid as unknown as number;
  if (!groupId) {
    notFound();
    // return;
  }

  const { reloadKey } = useTaskReload();

  const [currentDate, setCurrentDate] = useState(() => {
    const dateParam = searchParams.get('date');
    return dateParam ? new Date(dateParam) : new Date();
  });

  const prevDay = () => {
    const newDate = addDays(currentDate, -1);
    setCurrentDate(newDate);
    router.push(`?date=${format(newDate, 'yyyy-MM-dd')}`);
  };

  const nextDay = () => {
    const newDate = addDays(currentDate, +1);
    setCurrentDate(newDate);
    router.push(`?date=${format(newDate, 'yyyy-MM-dd')}`);
  };

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

  const [isDragging, setIsDragging] = useState(false);
  const [pendingOrderUpdate, setPendingOrderUpdate] = useState<{
    taskListId: number;
    displayIndex: number;
  } | null>(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const fetchTaskLists = async () => {
      setIsLoading(true);
      try {
        const { taskLists } = await getGroupDetail(groupId);
        const filteredTaskLists = taskLists.filter((taskList) => {
          const taskListDate = format(new Date(taskList.createdAt), 'yyyy-MM-dd');
          return taskListDate === dateKey;
        });

        setTaskLists(filteredTaskLists);

        if (filteredTaskLists.length > 0) {
          setSelectedTaskList(filteredTaskLists[0]);
        } else {
          setSelectedTaskList(null);
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
  }, [selectedTaskList, groupId, dateKey]);

  const handleAddList = async () => {
    const name = newListName.trim().slice(0, MAX_LIST_NAME_LENGTH);
    if (!name) return;
    if (KOREAN_CONSONANT_VOWEL_REGEX.test(name)) {
      toast.error('자음이나 모음만으로는 목록을 생성할 수 없습니다.');
      return;
    }
    const formattedName = name;

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

  const handleCreateTodo: TodoFullCreateModalProps['onSubmit'] = ({
    title,
    date,
    time,
    repeat,
  }) => {
    if (!date) return;
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

    setTodoModalOpen(false);
  };

  const handleOpenDetail = (todo: Todo) => {
    setSelectedTodo(todo);
    setDetailOpen(true);
  };

  const moveTaskList = async (dragIndex: number, hoverIndex: number) => {
    const draggedTaskList = taskLists[dragIndex];
    const newTaskLists = [...taskLists];
    newTaskLists.splice(dragIndex, 1);
    newTaskLists.splice(hoverIndex, 0, draggedTaskList);
    setTaskLists(newTaskLists);
    setPendingOrderUpdate({
      taskListId: draggedTaskList.id,
      displayIndex: hoverIndex,
    });
  };

  // 드래그가 끝났을 때 API 호출
  const handleDragEnd = async () => {
    if (pendingOrderUpdate) {
      try {
        await updateTaskListOrder(
          teamId,
          groupId,
          pendingOrderUpdate.taskListId,
          pendingOrderUpdate.displayIndex
        );
        setPendingOrderUpdate(null);
      } catch (error) {
        console.error('Failed to update task list order:', error);
        toast.error('목록 순서 변경에 실패했습니다.');
        // Revert the order if the API call fails
        setTaskLists(taskLists);
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster position="top-center" />
      <main className="py-6">
        <div className="relative mx-auto mt-6 max-w-[1200px] space-y-6 px-4 sm:px-6 md:px-8 lg:mt-10">
          <header className="space-y-4">
            <h1 className="text-2xl-medium text-white">할 일</h1>
            <div className="text-gray300 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-base">
                <button onClick={prevDay}>
                  <Image src="/icons/type=left.svg" alt="이전" width={16} height={16} />
                </button>
                <button
                  className="rounded px-2 py-1 text-white transition hover:bg-gray-700 focus:outline-none"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  type="button"
                  aria-label="날짜 선택"
                >
                  {format(currentDate, 'M월 d일 (eee)', { locale: ko })}
                </button>
                <button onClick={nextDay}>
                  <Image src="/icons/type=right.svg" alt="다음" width={16} height={16} />
                </button>
                <button
                  className="ml-2 rounded p-1 transition hover:bg-gray-700 focus:outline-none"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  type="button"
                  aria-label="달력 열기"
                >
                  <Image src="/icons/icon_calendar.svg" alt="캘린더" width={16} height={16} />
                </button>
                {isCalendarOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 sm:absolute sm:inset-auto sm:top-full sm:left-0 sm:mt-2 sm:flex-none sm:bg-transparent">
                    <div className="w-full max-w-[320px] rounded-lg bg-gray-800 p-4 sm:w-auto">
                      <DatePickerCalendar
                        dateTime={currentDate}
                        setDate={(date) => {
                          if (date) {
                            setCurrentDate(date);
                            router.push(`?date=${format(date, 'yyyy-MM-dd')}`);
                            setIsCalendarOpen(false);
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
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
            <nav
              className="flex flex-wrap space-x-6 border-b border-slate-700 pb-2"
              onDragEnd={handleDragEnd}
            >
              {taskLists.map((taskList, index) => (
                <DraggableTaskList
                  key={taskList.id}
                  taskList={taskList}
                  index={index}
                  moveTaskList={moveTaskList}
                  isSelected={taskList.id === selectedTaskList?.id}
                  onSelect={setSelectedTaskList}
                />
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
              <div className="flex h-[calc(100vh-24rem)] items-center justify-center">
                <p className="text-gray500 text-center">아직 할 일 목록이 없습니다.</p>
              </div>
            )}

            <SlideWrapper isOpen={detailopen} onClose={() => setDetailOpen(false)}>
              {selectedTodo && selectedTaskList && (
                <DetailPost
                  groupId={groupId}
                  tasklistid={selectedTaskList.id}
                  taskid={selectedTodo.id}
                  title={selectedTodo.title}
                  showComplete={false}
                  onClose={() => setDetailOpen(false)}
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
        onClose={() => setTodoModalOpen(false)}
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
            maxLength={MAX_LIST_NAME_LENGTH}
          />
        </div>
      </Modal>
    </DndProvider>
  );
}
