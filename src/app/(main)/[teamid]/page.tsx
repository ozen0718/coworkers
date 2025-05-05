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

export default function TeamPage() {
  const sectionStyle = 'w-full py-6 flex flex-col items-center justify-start gap-4';
  const sectionHeaderStyle = 'flex w-full items-center justify-between';
  const sectionHeaderTitleStyle = 'flex items-center justtify-start gap-2';
  const sectionHeaderH2Style = 'text-lg-medium font-semibold text-gray100';
  const sectionHeaderPSTyle = 'text-lg-regular text-gray500';
  const sectionHeaderButtonStyle = 'text-md-regular text-primary';

  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [isCreateListModalOpen, setCreateListModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');

  const openModal = () => setInviteModalOpen(true);
  const closeModal = () => setInviteModalOpen(false);

  const { message, visible, showToast } = useToast(3000);

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    setCreateListModalOpen(false);
    showToast('새로운 목록이 생성되었습니다.');
    setNewListName('');
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText('https://your-invite-link.com');
    showToast('복사되었습니다.');
  };

  return (
    <div className="mx-auto min-h-[100vh] w-full max-w-300 min-w-[375px] px-4 py-6 sm:px-6">
      <TeamHeader title="팀이름" />

      <section className={sectionStyle}>
        <header className={sectionHeaderStyle}>
          <div className={sectionHeaderTitleStyle}>
            <h2 className={sectionHeaderH2Style}>할 일 목록</h2>
            <p className={sectionHeaderPSTyle}>(4개)</p>
          </div>
          <button className={sectionHeaderButtonStyle} onClick={() => setCreateListModalOpen(true)}>
            + 새로운 목록 추가하기
          </button>

          <Modal
            isOpen={isCreateListModalOpen}
            onClose={() => setCreateListModalOpen(false)}
            submitButtonLabel="만들기"
            closeIcon
            title="할 일 목록"
            submitButtonVariant="primary"
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
            <button className={sectionHeaderButtonStyle} onClick={openModal}>
              + 새로운 멤버 추가하기
            </button>

            <Modal
              isOpen={isInviteModalOpen}
              onClose={closeModal}
              submitButtonLabel="링크 복사하기"
              closeIcon
              title="멤버 초대"
              description="그룹에 참여할 수 있는 링크를 복사합니다."
              submitButtonVariant="primary"
              onSubmit={handleCopyLink}
            />

            <Toast message={message} visible={visible} />
          </div>
        </header>
        <div className="grid-rows-auto grid w-full grid-cols-[1fr_1fr] gap-4 sm:grid-cols-[1fr_1fr_1fr]">
          <Member name="가나다" email="abc123@email.com" />
          <Member name="가나다" email="abc123@email.com" />
          <Member name="가나다" email="abc123@email.com" />
          <Member name="가나다" email="abc123@email.com" />
          <Member name="가나다" email="abc123@email.com" />
          <Member name="가나다" email="abc123@email.com" />
          <Member name="가나다" email="abc123@email.com" />
          <Member name="가나다" email="abc123@email.com" />
        </div>
      </section>
    </div>
  );
}
