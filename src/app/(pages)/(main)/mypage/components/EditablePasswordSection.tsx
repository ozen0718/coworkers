'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { CurrentPassword, PasswordInput } from '@/components/common/Inputs';
import Modal from '@/components/common/Modal';
import { useModal } from '@/hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserPassword } from '@/api/user';
import { QUERY_KEYS } from '@/constants/queryKeys';

export default function EditablePasswordSection() {
  const { isOpen, open, close } = useModal();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다.');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.me });
      close();
    },
    onError: () => {
      toast.error('비밀번호 변경에 실패했습니다.');
    },
  });

  const handleSubmit = () => {
    if (!password || !passwordConfirmation) {
      toast.error('모든 항목을 입력해주세요.');
      return;
    }

    if (password !== passwordConfirmation) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    mutate({ password, passwordConfirmation });
  };

  const handleClose = () => {
    close();
    setPassword('');
    setPasswordConfirmation('');
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label>비밀번호</label>
        {/* TODO: current password 값 설정 */}
        <CurrentPassword onClick={open} />
      </div>

      <Modal
        header={{ title: '비밀번호 변경하기' }}
        cancelButton={{ label: '닫기', variant: 'cancel' }}
        submitButton={{ label: '변경하기' }}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div className="mt-4 flex min-w-[280px] flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="password">새 비밀번호</label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="새 비밀번호를 입력해주세요."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="passwordConfirmation">새 비밀번호 확인</label>
            <PasswordInput
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="새 비밀번호를 다시 한 번 입력해주세요."
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
