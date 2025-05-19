'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { updateUserName } from '@/api/user';
import { CurrentName } from '@/components/common/Inputs';
import Modal from '@/components/common/Modal';
import FormField from '@/components/FormField';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useModal } from '@/hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/stores/useUserStore';

interface EditableNameProps {
  name: string;
}

export default function EditableNameSection({ name }: EditableNameProps) {
  const [inputName, setInputName] = useState(name ?? '');
  const { isOpen, open, close } = useModal();
  const queryClient = useQueryClient();

  // 1) Zustand 업데이트 함수 가져오기
  const setUserInfo = useUserStore((s) => s.setUserInfo);

  const { mutate } = useMutation({
    mutationFn: updateUserName,
    onSuccess: (updated) => {
      toast.success('이름이 변경되었습니다.');

      // 2) React Query 캐시 무효화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.me });

      // 3) Zustand store에도 병합 업데이트
      const { profileImage, teams } = useUserStore.getState();
      setUserInfo({
        nickname: inputName,
        profileImage, // 기존 값 유지
        teams, // 기존 팀 목록 유지
      });

      close();
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string }>;
      const message = err.response?.data?.message;

      if (message === '이미 사용중인 닉네임입니다.') {
        toast.error('이미 사용중인 닉네임입니다.');
      } else if (message === 'jwt expired') {
        toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        toast.error('이름 변경에 실패했습니다.');
      }
    },
  });

  const handleNameChange = (value: string) => {
    setInputName(value);
  };

  const handleSubmit = () => {
    mutate(inputName);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label>이름</label>
        <CurrentName name={name} onClick={open} />
      </div>

      <Modal
        header={{ title: '이름 변경하기' }}
        cancelButton={{ label: '닫기', variant: 'cancel' }}
        submitButton={{ label: '변경하기' }}
        isOpen={isOpen}
        onClose={close}
        onSubmit={handleSubmit}
      >
        <div className="mt-4 min-w-[280px]">
          <FormField label="이름" onValueChange={handleNameChange} value={inputName} />
        </div>
      </Modal>
    </>
  );
}
