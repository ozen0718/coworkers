'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { TextInput } from '@/components/common/Inputs';
import { TaskListsItem } from '@/components/teampage/TaskElements';
import TeamHeader from '@/components/teampage/TeamHeader';
import Report from '@/components/teampage/Report';
import Member from '@/components/common/Member';
import Modal from '@/components/common/Modal';
import { Profile } from '@/components/common/Profiles';
import { getInvitationToken } from '@/api/group.api';
import { createTaskList, getTaskDetail } from '@/api/tasklist.api';
import { useGroupDetail } from '@/hooks/useGroupDetail';
import { useGroupPageInfo, useAllTaskListTasks, useGroupList } from '@/hooks/useGroupPageInfo';
import { useModalGroup } from '@/hooks/useModalGroup';
import { NewestTaskProps, TaskInfo } from '@/types/teampagetypes';
import { getFutureDateString } from '@/utils/date';

export default function TeamPage() {
  const sectionStyle = 'w-full py-6 flex flex-col items-center justify-start gap-4';
  const sectionHeaderStyle = 'flex w-full items-center justify-between';
  const sectionHeaderTitleStyle = 'flex items-center justtify-start gap-2';
  const sectionHeaderH2Style = 'text-lg-medium font-semibold';
  const sectionHeaderPSTyle = 'text-lg-regular text-gray500';
  const sectionHeaderButtonStyle = 'text-md-regular text-primary';
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: groupList, isLoading } = useGroupList();

  const [newListName, setNewListName] = useState('');
  const [selectedMember, setSelectedMember] = useState<{
    name: string;
    email: string;
    profileUrl?: string | null;
  } | null>(null);
  const [isClient, setIsClient] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const [memberPage, setMemberPage] = useState(1);
  const MEMBERS_PER_PAGE = 6;

  useEffect(() => setIsClient(true), []);

  const { open, close, isOpen } = useModalGroup<'invite' | 'createList' | 'memberProfile'>();

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    if (!groupId || !teamid) return toast.error('그룹 정보를 불러오지 못했습니다.');

    try {
      await createTaskList({
        groupId: groupId,
        name: newListName.trim(),
      });

      await queryClient.invalidateQueries({ queryKey: ['groupDetail', groupId] });

      close();
      setNewListName('');
    } catch (error) {
      toast.error('목록 생성에 실패했습니다.');
      console.error(error);
    }
  };

  const handleCopyPageLink = async () => {
    if (!groupId) {
      toast.error('그룹 정보를 불러오지 못했습니다.');
      return;
    }
    try {
      const token = await getInvitationToken(groupId);
      const inviteUrl = `${window.location.origin}/invite?token=${token}`;
      await navigator.clipboard.writeText(inviteUrl);
      toast.success('초대 링크가 복사되었습니다.');
    } catch (error) {
      console.error(error);
      toast.error('초대 링크 생성에 실패했습니다.');
    }
  };

  const handleCopyMemberEmail = async () => {
    if (!selectedMember) return;
    await navigator.clipboard.writeText(selectedMember.email);
    toast.success('복사되었습니다.');
  };

  const handleOpenProfile = (member: {
    name: string;
    email: string;
    profileUrl?: string | null;
  }) => {
    setSelectedMember(member);
    open('memberProfile');
  };

  const { teamid } = useParams() as { teamid: string };
  const { data: userData } = useGroupPageInfo(teamid);
  const isAdmin = userData?.role === 'ADMIN';
  const teamName = userData?.group.name ?? '팀 없음';
  const groupId = userData?.group.id;
  const { data: groupDetail } = useGroupDetail(groupId);

  const todayDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  const [futureDate, setFutureDate] = useState<string | null>(null);

  const taskListIds = useMemo(() => {
    const taskLists = groupDetail?.taskLists ?? [];
    console.log('🔍 groupDetail.taskLists:', taskLists);
    return (groupDetail?.taskLists ?? []).map((list) => Number(list.id));
  }, [groupDetail?.taskLists]);

  const shouldFetchTasks = !!groupId && taskListIds.length > 0 && !!futureDate;

  const { future: futureTasks, today: todayTasks } = useAllTaskListTasks(
    shouldFetchTasks ? groupId : undefined,
    shouldFetchTasks ? taskListIds : [],
    shouldFetchTasks ? futureDate : '',
    shouldFetchTasks ? todayDate : ''
  );

  const taskMap = useMemo(() => {
    const map = new Map<number, TaskInfo[]>();

    todayTasks.forEach(({ taskListId, data }) => {
      map.set(taskListId, data ?? []);
    });

    futureTasks.forEach(({ taskListId, data }) => {
      const existing = map.get(taskListId) ?? [];
      const combined = [...existing, ...(data ?? [])];
      map.set(taskListId, combined);
    });

    return map;
  }, [todayTasks, futureTasks]);

  const futureTaskList = useMemo(() => {
    return futureTasks.flatMap(({ taskListId, data }) =>
      (data ?? []).map((task) => ({ ...task, taskListId }))
    );
  }, [futureTasks]);

  const totalTaskCount = useMemo(() => {
    let total = 0;
    taskMap.forEach((tasks) => {
      total += tasks.length;
    });
    return total;
  }, [taskMap]);

  const todayTaskList = todayTasks.flatMap((entry) => entry.data ?? []);
  const totalTodayTasks = todayTaskList.length;
  const completedTodayTasks = todayTaskList.filter((task) => task.doneAt !== null).length;

  const paginatedTaskLists = useMemo(() => {
    if (!groupDetail?.taskLists) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return groupDetail.taskLists.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [groupDetail?.taskLists, currentPage]);

  const totalPages = Math.ceil((groupDetail?.taskLists?.length ?? 0) / ITEMS_PER_PAGE);

  const paginatedMembers = useMemo(() => {
    if (!groupDetail?.members) return [];
    const startIndex = (memberPage - 1) * MEMBERS_PER_PAGE;
    return groupDetail.members.slice(startIndex, startIndex + MEMBERS_PER_PAGE);
  }, [groupDetail?.members, memberPage]);

  const totalMemberPages = Math.ceil((groupDetail?.members?.length ?? 0) / MEMBERS_PER_PAGE);

  useEffect(() => {
    setFutureDate(getFutureDateString(100));
  }, []);

  const [newestTasks, setNewestTasks] = useState<NewestTaskProps[]>([]);
  const prevNewestRef = useRef<string>('');

  useEffect(() => {
    if (!futureDate || !groupId || futureTaskList.length === 0) return;

    const fetchNewestTaskDetails = async () => {
      const currentTime = new Date().getTime();

      const detailedTasks = await Promise.all(
        futureTaskList.map(async (task) => {
          const detail = await getTaskDetail(groupId, task.taskListId, task.id);
          const startDate = detail.recurring?.startDate;
          const startTime = new Date(startDate ?? '').getTime();

          return {
            ...task,
            startDate,
            startTime,
          };
        })
      );

      const pastTasks = detailedTasks
        .filter((task) => !!task.startTime && task.startTime <= currentTime)
        .sort((a, b) => b.startTime - a.startTime)
        .slice(0, 2);

      const taskKey = pastTasks.map((t) => `${t.id}-${t.startDate}`).join('|');

      if (taskKey === prevNewestRef.current) {
        return;
      }

      prevNewestRef.current = taskKey;

      if (pastTasks.length === 0) {
        setNewestTasks([{ title: '새롭게 시작된 할 일이 없습니다.', startDate: '' }]);
      } else {
        setNewestTasks(
          pastTasks.map((task) => ({
            title: task.name,
            startDate: task.startDate,
          }))
        );
      }
    };

    fetchNewestTaskDetails();
  }, [futureDate, futureTaskList, groupId]);

  if (!isLoading && (!groupList || groupList.length === 0)) {
    router.replace('/noteam');
    return null;
  }

  if (!futureDate || !groupId) return null;

  return (
    <div className="py-6">
      <TeamHeader title={teamName} showGear={isClient && isAdmin} />

      <section className={sectionStyle}>
        <header className={sectionHeaderStyle}>
          <div className={sectionHeaderTitleStyle}>
            <h2 className={sectionHeaderH2Style}>할 일 목록</h2>
            <p className={sectionHeaderPSTyle}>({totalTaskCount}개)</p>
          </div>
          {isClient && isAdmin && (
            <button className={sectionHeaderButtonStyle} onClick={() => open('createList')}>
              + 새로운 목록 추가하기
            </button>
          )}

          <Modal
            isOpen={isOpen('createList')}
            onClose={close}
            header={{ title: '할 일 목록' }}
            submitButton={{ label: '만들기' }}
            closeIcon
            onSubmit={handleCreateList}
          >
            <div className="mt-6">
              <TextInput
                placeholder="목록 명을 입력해주세요."
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                maxLength={10}
              />
            </div>
          </Modal>
        </header>

        {paginatedTaskLists.map((list) => {
          const taskListId = Number(list.id);
          const taskData = taskMap.get(Number(taskListId)) ?? [];
          const total = taskData.length;
          const completed = taskData.filter((task) => task.doneAt !== null).length;
          if (!futureDate) return null;

          console.log('🟡 list.id:', list.id);
          console.log('🟡 taskMap keys:', [...taskMap.keys()]);
          console.log('🟡 taskMap.get(list.id):', taskMap.get(taskListId));

          return (
            <TaskListsItem
              key={list.id}
              completed={completed}
              total={total}
              tasksTitle={list.name}
              taskListId={list.id}
              groupId={groupId}
              onClick={() => {
                router.push(`/${groupId}/tasklist?listId=${list.id}`);
              }}
            />
          );
        })}

        {totalPages > 1 && (
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="border-gray100/10 hover:bg-bg200 disabled:hover:bg-bg300 rounded border px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              ◀
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border-gray100/10 hover:bg-bg200 disabled:hover:bg-bg300 rounded border px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              ▶
            </button>
          </div>
        )}
      </section>

      <section className={sectionStyle}>
        <header className={sectionHeaderStyle}>
          <div className={sectionHeaderTitleStyle}>
            <h2 className={sectionHeaderH2Style}>리포트</h2>
          </div>
        </header>

        <Report total={totalTodayTasks} completed={completedTodayTasks} newestTasks={newestTasks} />
      </section>

      <section className={sectionStyle}>
        <header className={sectionHeaderStyle}>
          <div className={sectionHeaderTitleStyle}>
            <h2 className={sectionHeaderH2Style}>멤버</h2>
            <p className={sectionHeaderPSTyle}>({groupDetail?.members.length ?? 0}명)</p>
          </div>
          <div>
            {isClient && isAdmin && (
              <button className={sectionHeaderButtonStyle} onClick={() => open('invite')}>
                + 새로운 멤버 추가하기
              </button>
            )}

            <Modal
              isOpen={isOpen('invite')}
              onClose={close}
              header={{
                title: '멤버 초대',
                description: '그룹에 참여할 수 있는 링크를 복사합니다.',
              }}
              submitButton={{ label: '링크 복사하기' }}
              closeIcon
              onSubmit={handleCopyPageLink}
            />
          </div>
        </header>
        <div className="grid-rows-auto grid w-full grid-cols-[1fr_1fr] gap-4 sm:grid-cols-[1fr_1fr_1fr]">
          {paginatedMembers.map((member) => (
            <Member
              key={member.userId}
              name={member.userName}
              email={member.userEmail}
              profileUrl={member.userImage}
              userId={member.userId}
              hideMenu={member.userId === groupDetail?.members[0]?.userId}
              onClick={() =>
                handleOpenProfile({
                  name: member.userName,
                  email: member.userEmail,
                  profileUrl: member.userImage,
                })
              }
            />
          ))}
        </div>

        {totalMemberPages > 1 && (
          <div className="flex gap-2">
            <button
              onClick={() => setMemberPage((p) => Math.max(p - 1, 1))}
              disabled={memberPage === 1}
              className="border-gray100/10 hover:bg-bg200 disabled:hover:bg-bg300 rounded border px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              ◀
            </button>
            <button
              onClick={() => setMemberPage((p) => Math.min(p + 1, totalMemberPages))}
              disabled={memberPage === totalMemberPages}
              className="border-gray100/10 hover:bg-bg200 disabled:hover:bg-bg300 rounded border px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              ▶
            </button>
          </div>
        )}

        <Modal
          isOpen={isOpen('memberProfile')}
          onClose={close}
          submitButton={{ label: '이메일 복사하기' }}
          closeIcon
          onSubmit={handleCopyMemberEmail}
        >
          <div className="flex flex-col items-center gap-6">
            <Profile width={52} profileUrl={selectedMember?.profileUrl} />
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-md-medium">{selectedMember?.name}</p>
              <p className="text-xs-regular">{selectedMember?.email}</p>
            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
}
