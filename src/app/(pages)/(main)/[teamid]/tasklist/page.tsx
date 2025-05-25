'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import clsx from 'clsx';
import { notFound, useParams, useSearchParams, useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tooltip } from 'react-tooltip';
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
const MAX_TASK_LISTS = 15;
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
  isInDropdown?: boolean;
}

const DraggableTaskList: React.FC<DraggableTaskListProps> = ({
  taskList,
  index,
  moveTaskList,
  isSelected,
  onSelect,
  isInDropdown = false,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASKLIST',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'TASKLIST',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveTaskList(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  if (isInDropdown) {
    return (
      <div
        ref={(node) => {
          drag(drop(node));
        }}
        className={clsx(
          'w-full px-4 py-2 text-left text-sm transition-all duration-200',
          isSelected ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700',
          isDragging ? 'scale-95 opacity-50' : '',
          isOver ? 'bg-gray-600' : ''
        )}
        onClick={() => onSelect(taskList)}
      >
        {taskList.name}
      </div>
    );
  }

  return (
    <div
      ref={(node) => {
        drag(drop(node));
      }}
      className={clsx(
        'cursor-pointer pb-1 text-xs font-medium transition-all duration-200 sm:text-sm',
        isSelected ? 'border-b-2 border-white text-white' : 'text-gray400',
        isDragging ? 'scale-95 opacity-50' : '',
        isOver ? 'border-b-2 border-gray-500' : ''
      )}
      onClick={() => onSelect(taskList)}
    >
      {taskList.name}
    </div>
  );
};

const TaskListDropdown: React.FC<{
  taskLists: TaskList[];
  selectedTaskList: TaskList | null;
  onSelect: (taskList: TaskList) => void;
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  moveTaskList: (dragIndex: number, hoverIndex: number) => void;
}> = ({ taskLists, selectedTaskList, onSelect, isOpen, onToggle, isMobile, moveTaskList }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const visibleCount = isMobile ? 3 : 10;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="expand-btn"
        onClick={onToggle}
        className="text-gray400 rounded-lg px-3 py-1 text-sm font-medium transition hover:bg-gray-700 focus:outline-none"
      >
        {isMobile ? '+ 더보기' : `+${taskLists.length - visibleCount}개 더보기`}
      </button>
      {isOpen && (
        <>
          {/* Desktop Dropdown */}
          <div className="hidden sm:absolute sm:top-full sm:right-0 sm:z-50 sm:mt-2 sm:block sm:w-48 sm:rounded-lg sm:bg-gray-800 sm:py-2 sm:shadow-lg">
            <div className="grid grid-cols-1 gap-2">
              {taskLists.slice(visibleCount).map((taskList, index) => (
                <DraggableTaskList
                  key={taskList.id}
                  taskList={taskList}
                  index={index + visibleCount}
                  moveTaskList={moveTaskList}
                  isSelected={taskList.id === selectedTaskList?.id}
                  onSelect={onSelect}
                  isInDropdown={true}
                />
              ))}
            </div>
          </div>

          <div className="fixed inset-0 z-50 sm:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={onToggle} />

            <div className="fixed right-0 bottom-0 left-0 max-h-[50vh] rounded-t-2xl bg-gray-800">
              <div className="sticky top-0 z-10 rounded-lg bg-gray-800 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="p-4 text-lg font-medium text-white">목록 선택</h3>
                  <button
                    onClick={onToggle}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-700"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="h-[calc(50vh-80px)] overflow-y-auto px-4 pb-4">
                <div className="space-y-2">
                  {taskLists.slice(visibleCount).map((taskList) => (
                    <button
                      key={taskList.id}
                      className={clsx(
                        'w-full rounded-lg px-4 py-3 text-left text-sm',
                        taskList.id === selectedTaskList?.id
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      )}
                      onClick={() => {
                        onSelect(taskList);
                        onToggle();
                      }}
                    >
                      {taskList.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
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

  const { reloadKey, triggerReload } = useTaskReload();

  const [currentDate, setCurrentDate] = useState(() => {
    const dateParam = searchParams.get('date');
    return dateParam ? new Date(dateParam) : new Date();
  });

  // URL의 date 파라미터 변경을 감지하여 페이지 날짜 업데이트
  useEffect(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      const newDate = new Date(dateParam);
      if (newDate.toString() !== 'Invalid Date') {
        setCurrentDate(newDate);
      }
    }
  }, [searchParams]);

  const prevDay = () => {
    const newDate = addDays(currentDate, -1);
    setCurrentDate(newDate);
    const params = new URLSearchParams(searchParams.toString());
    params.set('date', format(newDate, 'yyyy-MM-dd'));
    router.push(`/${teamId}/tasklist?${params.toString()}`);
  };

  const nextDay = () => {
    const newDate = addDays(currentDate, 1);
    setCurrentDate(newDate);
    const params = new URLSearchParams(searchParams.toString());
    params.set('date', format(newDate, 'yyyy-MM-dd'));
    router.push(`/${teamId}/tasklist?${params.toString()}`);
  };

  // const dateKey = format(currentDate, 'yyyy-MM-dd');

  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [selectedTaskList, setSelectedTaskList] = useState<TaskList | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const [newListName, setNewListName] = useState('');
  const [isListModalOpen, setListModalOpen] = useState(false);
  const [isTodoModalOpen, setTodoModalOpen] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [detailopen, setDetailOpen] = useState(false);

  // const [isDragging, setIsDragging] = useState(false);
  // 미사용 함수 주석
  const [pendingOrderUpdate, setPendingOrderUpdate] = useState<{
    taskListId: number;
    displayIndex: number;
  } | null>(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 캘린더 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isCalendarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCalendarOpen]);

  useEffect(() => {
    const fetchTaskLists = async () => {
      setIsLoading(true);
      try {
        // 모든 목록을 가져옴 (날짜 필터링 없음)
        const { taskLists } = await getGroupDetail(groupId);
        setTaskLists(taskLists);

        if (taskLists.length > 0) {
          setSelectedTaskList(taskLists[0]);
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
  }, [groupId, reloadKey]);

  useEffect(() => {
    const loadTasksForList = async (taskList: TaskList) => {
      try {
        const kstDateString = format(currentDate, 'yyyy-MM-dd');

        const tasks = await getTasksByTaskList(groupId, taskList.id, kstDateString);
        const todos = tasks.map(convertTaskToTodo);
        setTodoList(todos);
      } catch (error) {
        console.error(`목록 불러오는 거 실패 ${taskList.name}:`, error);
        toast.error(`${taskList.name} 목록의 할 일을 불러오는데 실패했습니다.`);
      }
    };

    if (selectedTaskList) {
      loadTasksForList(selectedTaskList);
    }
  }, [selectedTaskList, groupId, currentDate, reloadKey]);

  // 자정에 자동으로 데이터 갱신
  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    const timer = setTimeout(() => {
      triggerReload();
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, [triggerReload]);

  const handleAddList = async () => {
    const name = newListName.trim().slice(0, MAX_LIST_NAME_LENGTH);
    if (!name) return;
    if (KOREAN_CONSONANT_VOWEL_REGEX.test(name)) {
      toast.error('자음이나 모음만으로는 목록을 생성할 수 없습니다.');
      return;
    }
    if (taskLists.length >= MAX_TASK_LISTS) {
      toast.error('최대 15개의 목록만 생성할 수 있습니다.');
      return;
    }
    const formattedName = name;

    setIsLoading(true);
    try {
      // 현재 날짜의 목록만 생성
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
                  className="rounded-lg px-3 py-1 text-white transition hover:bg-gray-700 focus:outline-none"
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
                  className="ml-2 rounded-lg p-1 transition hover:bg-gray-700 focus:outline-none"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  type="button"
                  aria-label="달력 열기"
                >
                  <Image src="/icons/icon_calendar.svg" alt="캘린더" width={16} height={16} />
                </button>
                {isCalendarOpen && (
                  <>
                    {/* Desktop Calendar */}
                    <div className="hidden sm:relative sm:block">
                      <div className="absolute top-full left-0 z-50 mt-2 w-[320px] rounded-lg bg-gray-800 p-4">
                        <DatePickerCalendar
                          dateTime={currentDate}
                          setDate={(date) => {
                            if (date) {
                              setCurrentDate(date);
                              const params = new URLSearchParams(searchParams.toString());
                              params.set('date', format(date, 'yyyy-MM-dd'));
                              router.push(`/${teamId}/tasklist?${params.toString()}`);
                              setIsCalendarOpen(false);
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="fixed inset-0 z-50 sm:hidden">
                      <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setIsCalendarOpen(false)}
                      />

                      <div className="fixed right-0 bottom-0 left-0 h-[60vh] max-h-[80vh] overflow-y-auto rounded-t-2xl bg-gray-800 p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-lg font-medium text-white">날짜 선택</h3>
                          <button
                            onClick={() => setIsCalendarOpen(false)}
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-700"
                          >
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="relative">
                          <DatePickerCalendar
                            dateTime={currentDate}
                            setDate={(date) => {
                              if (date) {
                                setCurrentDate(date);
                                const params = new URLSearchParams(searchParams.toString());
                                params.set('date', format(date, 'yyyy-MM-dd'));
                                router.push(`/${teamId}/tasklist?${params.toString()}`);
                                setIsCalendarOpen(false);
                              }
                            }}
                          />

                          <div className="pointer-events-none h-[320px]" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <button
                id="add-list-btn"
                className="text-primary rounded-lg px-3 py-1 text-sm font-medium transition hover:bg-gray-700 focus:outline-none"
                onClick={() => setListModalOpen(true)}
              >
                + 새로운 목록 추가하기
              </button>
            </div>
          </header>

          {taskLists.length > 0 && (
            <nav
              className="flex items-center border-b border-slate-700 pb-2"
              onDragEnd={handleDragEnd}
            >
              <div className="flex flex-1 items-center gap-x-6 overflow-x-auto">
                {taskLists.slice(0, isMobile ? 3 : 10).map((taskList, index) => (
                  <DraggableTaskList
                    key={taskList.id}
                    taskList={taskList}
                    index={index}
                    moveTaskList={moveTaskList}
                    isSelected={taskList.id === selectedTaskList?.id}
                    onSelect={setSelectedTaskList}
                  />
                ))}
              </div>
              {((isMobile && taskLists.length > 3) || (!isMobile && taskLists.length > 10)) && (
                <div className="ml-4 flex-shrink-0">
                  <TaskListDropdown
                    taskLists={taskLists}
                    selectedTaskList={selectedTaskList}
                    onSelect={setSelectedTaskList}
                    isOpen={isDropdownOpen}
                    onToggle={() => setDropdownOpen(!isDropdownOpen)}
                    isMobile={isMobile}
                    moveTaskList={moveTaskList}
                  />
                </div>
              )}
            </nav>
          )}

          <section className="min-h-[calc(100vh-16rem)]">
            {selectedTaskList && todoList.length > 0 ? (
              <ul className="space-y-4">
                {todoList.map((todo) => (
                  <li key={todo.id}>
                    <div>
                      <TodoItem
                        tasklistid={selectedTaskList.id}
                        taskid={todo.id}
                        {...todo}
                        onOpenDetail={(taskid, title) => {
                          setSelectedTodo({ ...todo, id: taskid, title });
                          setDetailOpen(true);
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex h-[calc(100vh-24rem)] items-center justify-center">
                <p className="text-gray500 text-center">아직 할 일 목록이 없습니다.</p>
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
            //disabled={taskLists.length === 0}
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
        selectedTaskList={
          selectedTaskList ? { id: selectedTaskList.id, name: selectedTaskList.name } : undefined
        }
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
      {/* 툴팁 */}

      <Tooltip
        anchorId="add-list-btn"
        place={isMobile ? 'top' : 'right'}
        content="목록들의 순서를 변경할 수 있어요!"
        delayShow={200}
        delayHide={200}
        className="tooltip-bounce-in"
      />

      {!isMobile && (
        <Tooltip
          anchorId="expand-btn"
          place="right"
          content="더보기에 들어간 리스트를 꺼낼 수 있어요!"
          delayShow={200}
          delayHide={200}
          className="tooltip-bounce-in"
        />
      )}

      <style jsx global>{`
        .tooltip-bounce-in {
          background-color: #1e3a8a !important;
          color: #ffffff !important;
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 0.83rem;
          max-width: 110px; /* 최대 너비 제한 */
          white-space: normal !important; /* 줄바꿈 허용 */
          text-align: center;
          animation: bounce-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          transform-origin: left center; /* 기본 발생축 */
        }

        /* 모바일(767px 이하)에서 transform-origin을 아래 중앙으로 변경 */
        @media (max-width: 767px) {
          .tooltip-bounce-in {
            transform-origin: center bottom;
          }
        }

        .tooltip-bounce-in[data-state='hidden'] {
          animation: fade-out 0.2s ease-out forwards;
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }
          60% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes fade-out {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.8);
          }
        }
      `}</style>
    </DndProvider>
  );
}
