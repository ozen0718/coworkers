'use client';

import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/api/user';
import Modal from '@/components/common/Modal';
import { useModal } from '@/hooks/useModal';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';

export default function AccountDeleteButton() {
  const { isOpen, open, close } = useModal();
  const router = useRouter();
  const qc = useQueryClient();

  const clearTokens = useAuthStore((s) => s.clearTokens);
  const logout = useAuthStore((s) => s.logout);
  const resetUser = useUserStore((s) => s.setUserInfo);

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('계정이 삭제되었습니다.');

      clearTokens();
      logout();
      resetUser({ nickname: '', profileImage: null, teams: [] });
      qc.clear();
      router.replace('/');
    },
    onError: () => {
      toast.error('계정 탈퇴에 실패했습니다.');
    },
  });

  const isPending = mutation.status === 'pending';

  const handleSubmit = () => {
    if (!isPending) {
      mutation.mutate();
    }
  };

  return (
    <>
      <button
        className="text-danger flex w-fit items-center gap-2"
        onClick={open}
        disabled={isPending}
      >
        <Image src="/icons/secession.svg" alt="회원 탈퇴 아이콘" width={24} height={24} />
        <span>회원 탈퇴하기</span>
      </button>

      <Modal
        header={{
          headerIcon: <Image src="/icons/alert.svg" width={24} height={24} alt="alert icon" />,
          title: '회원 탈퇴를 진행하시겠어요?',
          description: '그룹장으로 있는 그룹은 자동으로 삭제되고,\n모든 그룹에서 나가집니다.',
        }}
        cancelButton={{ label: '닫기', variant: 'textgray' }}
        submitButton={{
          label: isPending ? '탈퇴 중…' : '회원 탈퇴',
          variant: 'danger',
        }}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={close}
      />
    </>
  );
}
