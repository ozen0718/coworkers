'use client';

import Modal from '@/components/common/Modal/index';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export default function ResetPasswordRequestModal({ isOpen, onClose, onSubmit }: Props) {
  const [email, setEmail] = useState('');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="비밀번호 재설정"
      description="비밀번호 재설정 링크를 보내드립니다."
      cancelButtonLabel="닫기"
      submitButtonLabel="링크 보내기"
      cancelButtonVariant="inverse"
      submitButtonVariant="primary"
      onSubmit={() => onSubmit(email)}
    >
      <div className="mt-4">
        <input
          type="email"
          placeholder="이메일을 입력하세요."
          className="bg-bg200 text-md-regular text-gray200 placeholder:text-gray500 border-gray100/10 h-12 w-full rounded-xl border px-4 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </Modal>
  );
}
