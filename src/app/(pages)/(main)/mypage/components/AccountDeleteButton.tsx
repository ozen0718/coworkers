'use client';

import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/api/user';
import Modal from '@/components/common/Modal';
import { useModal } from '@/hooks/useModal';

export default function AccountDeleteButton() {
  const { isOpen, open, close } = useModal();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('계정이 삭제되었습니다.');
      router.replace('/');
    },
    onError: () => {
      toast.error('계정 탈퇴에 실패했습니다.');
    },
  });

  const handleSubmit = () => {
    mutate();
  };

  return (
    <>
      <button className="text-danger flex w-fit items-center gap-2" onClick={open}>
        <Image src="/icons/secession.svg" alt="회원 탈퇴 아이콘" width={24} height={24} />
        <span>회원 탈퇴하기</span>
      </button>

      <Modal
        header={{
          headerIcon: <Image src="/icons/alert.svg" width={24} height={24} alt="alert icon" />,
          title: '회원 탈퇴를 진행하시겠어요?',
          description: `그룹장으로 있는 그룹은  자동으로 삭제되고,
                        모든 그룹에서 나가집니다.`,
        }}
        cancelButton={{ label: '닫기', variant: 'textgray' }}
        submitButton={{ label: '회원 탈퇴', variant: 'danger' }}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={close}
      />
    </>
  );
}
