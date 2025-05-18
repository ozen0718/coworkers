'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { TextInput } from '@/components/common/Inputs';
import { TasksItem } from '@/components/teampage/TaskElements';
import TeamHeader from '@/components/teampage/TeamHeader';
import Report from '@/components/teampage/Report';
import Member from '@/components/common/Member';
import Modal from '@/components/common/Modal';
import { Profile } from '@/components/common/Profiles';
import { createTaskList } from '@/api/tasklist.api';
import { useGroupDetail } from '@/hooks/useGroupDetail';
import { useGroupPageInfo, useAllTaskListTasks } from '@/hooks/useGroupPageInfo';
import { useModalGroup } from '@/hooks/useModalGroup';
import { getFutureDateString } from '@/utils/date';

const mockMembers = [
  { name: '우지은', email: 'coworkers@code.com' },
  { name: '김하늘', email: 'skyblue@example.com' },
  { name: '박서준', email: 'seojoon@example.com' },
  { name: '이수민', email: 'soomin@example.com' },
  { name: '정해인', email: 'haein@example.com' },
];

export default function TeamPage() {
  const sectionStyle = 'w-full py-6 flex flex-col items-center justify-start gap-4';
  const sectionHeaderStyle = 'flex w-full items-center justify-between';
  const sectionHeaderTitleStyle = 'flex items-center justtify-start gap-2';
  const sectionHeaderH2Style = 'text-lg-medium font-semibold';
  const sectionHeaderPSTyle = 'text-lg-regular text-gray500';
  const sectionHeaderButtonStyle = 'text-md-regular text-primary';

  const [newListName, setNewListName] = useState('');
  const [selectedMember, setSelectedMember] = useState<{ name: string; email: string } | null>(
    null
  );
  const [isClient, setIsClient] = useState(false);

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

      toast.success('새로운 목록이 생성되었습니다.');
      close();
      setNewListName('');
    } catch (error) {
      toast.error('목록 생성에 실패했습니다.');
      console.error(error);
    }
  };

  const handleCopyPageLink = async () => {
    await navigator.clipboard.writeText('https://your-invite-link.com');
    toast.success('복사되었습니다.');
  };

  const handleCopyMemberEmail = async () => {
    if (!selectedMember) return;
    await navigator.clipboard.writeText(selectedMember.email);
    toast.success('복사되었습니다.');
  };

  const handleOpenProfile = (member: { name: string; email: string }) => {
    setSelectedMember(member);
    open('memberProfile');
  };

  const { teamid } = useParams() as { teamid: string };
  const { data: userData } = useGroupPageInfo(teamid);
  const isAdmin = userData?.role === 'ADMIN';
  const teamName = userData?.group.name ?? '팀 없음';
  const groupId = userData?.group.id;
  const { data: groupDetail } = useGroupDetail(groupId);

  const [futureDate, setFutureDate] = useState<string | null>(null);

  useEffect(() => {
    setFutureDate(getFutureDateString(100));
  }, []);

  const taskListIds = groupDetail?.taskLists.map((list) => list.id) ?? [];
  const taskQueries = useAllTaskListTasks(groupId, taskListIds, futureDate ?? '');

  return (
    <div className="py-6">
      <TeamHeader title={teamName} showGear={isClient && isAdmin} />

      <section className={sectionStyle}>
        <header className={sectionHeaderStyle}>
          <div className={sectionHeaderTitleStyle}>
            <h2 className={sectionHeaderH2Style}>할 일 목록</h2>
            <p className={sectionHeaderPSTyle}>({groupDetail?.taskLists.length ?? 0}개)</p>
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
              />
            </div>
          </Modal>
        </header>

        {groupDetail?.taskLists.map((list, index) => {
          const taskQuery = taskQueries[index];
          const tasks = taskQuery?.data ?? [];
          const total = tasks.length;
          const completed = tasks.filter((task) => task.doneAt !== null).length;
          if (!futureDate) return null;

          return (
            <TasksItem key={list.id} completed={completed} total={total} tasksTitle={list.name} />
          );
        })}
      </section>

      <section className={sectionStyle}>
        <header className={sectionHeaderStyle}>
          <div className={sectionHeaderTitleStyle}>
            <h2 className={sectionHeaderH2Style}>리포트</h2>
          </div>
        </header>

        <Report />
      </section>

      <section className={sectionStyle}>
        <header className={sectionHeaderStyle}>
          <div className={sectionHeaderTitleStyle}>
            <h2 className={sectionHeaderH2Style}>멤버</h2>
            <p className={sectionHeaderPSTyle}>(8명)</p>
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
          {mockMembers.map((member) => (
            <Member
              key={member.email}
              name={member.name}
              email={member.email}
              onClick={() => handleOpenProfile(member)}
            />
          ))}
        </div>

        <Modal
          isOpen={isOpen('memberProfile')}
          onClose={close}
          submitButton={{ label: '이메일 복사하기' }}
          closeIcon
          onSubmit={handleCopyMemberEmail}
        >
          <div className="flex flex-col items-center gap-6">
            <Profile width={52} />
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
