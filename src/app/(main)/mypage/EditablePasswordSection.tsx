'use client';

import { CurrentPassword, PasswordInput } from '@/components/common/Inputs';
import Modal from '@/components/common/Modal';
import { useModal } from '@/hooks/useModal';

export default function EditablePasswordSection() {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <div className="flex flex-col gap-3">
        <label>비밀번호</label>
        {/* TODO: current password 값 설정 */}
        <CurrentPassword onClick={open} />
      </div>

      <Modal
        title="비밀번호 변경하기"
        cancelButtonLabel="닫기"
        cancelButtonVariant="cancel"
        submitButtonLabel="변경하기"
        isOpen={isOpen}
        onClose={close}
      >
        <div className='flex flex-col gap-4 mt-4'>
          <div className="flex flex-col gap-2">
            <label>새 비밀번호</label>
            {/* TODO: PasswordInput - placeholder 수정 */}
            <PasswordInput />
          </div>
          <div className="flex flex-col gap-2">
            <label>새 비밀번호 확인</label>
            {/* TODO: PasswordInput - placeholder 수정 */}
            <PasswordInput />
          </div>
        </div>
      </Modal>
    </>
  );
}
