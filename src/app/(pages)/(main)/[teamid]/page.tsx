'use client';

import { useState } from 'react';
import { TextInput } from '@/components/common/Inputs';
import { TasksItem } from '@/components/teampage/TaskElements';
import TeamHeader from '@/components/teampage/TeamHeader';
import Report from '@/components/teampage/Report';
import Member from '@/components/common/Member';
import Modal from '@/components/common/Modal';
import Toast from '@/components/common/Toast';
import useToast from '@/hooks/useToast';
import { Profile } from '@/components/common/Profiles';
import { useModalGroup } from '@/hooks/useModalGroup';

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

  const { open, close, isOpen } = useModalGroup<'invite' | 'createList' | 'memberProfile'>();

  const { message, visible, showToast } = useToast(3000);

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    close();
    showToast('새로운 목록이 생성되었습니다.');
    setNewListName('');
  };

  const handleCopyPageLink = async () => {
    await navigator.clipboard.writeText('https://your-invite-link.com');
    showToast('복사되었습니다.');
  };

  const handleCopyMemberEmail = async () => {
    if (!selectedMember) return;
    await navigator.clipboard.writeText(selectedMember.email);
    showToast('복사되었습니다.');
  };

  const handleOpenProfile = (member: { name: string; email: string }) => {
    setSelectedMember(member);
    open('memberProfile');
  };

  return (
    <div className="py-6">
      <TeamHeader title="팀이름" />

      <section className={sectionStyle}>
        <header className={sectionHeaderStyle}>
          <div className={sectionHeaderTitleStyle}>
            <h2 className={sectionHeaderH2Style}>할 일 목록</h2>
            <p className={sectionHeaderPSTyle}>(4개)</p>
          </div>
          <button className={sectionHeaderButtonStyle} onClick={() => open('createList')}>
            + 새로운 목록 추가하기
          </button>

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

          <Toast message={message} visible={visible} />
        </header>

        <TasksItem completed={1} total={3} tasksTitle="할일목록 1" />
        <TasksItem completed={2} total={5} tasksTitle="할일목록 2" />
        <TasksItem completed={3} total={7} tasksTitle="할일목록 3" />
        <TasksItem completed={10} total={10} tasksTitle="할일목록 4" />
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
            <button className={sectionHeaderButtonStyle} onClick={() => open('invite')}>
              + 새로운 멤버 추가하기
            </button>

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

            <Toast message={message} visible={visible} />
          </div>
        </header>
        <div className="grid-rows-auto grid w-full grid-cols-[1fr_1fr] gap-4 sm:grid-cols-[1fr_1fr_1fr]">
          {mockMembers.map((member) => (
            <Member
              key={member.email} // API 연동 후 수정
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
