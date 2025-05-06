'use client';

import Modal from '@/components/common/Modal';
import { useModal } from '@/hooks/useModal';
import Image from 'next/image';

export default function AccountDeleteButton() {
  const { isOpen, open, close } = useModal();
  return (
    <>
      <button className="text-danger flex w-fit items-center gap-2" onClick={open}>
        <Image src="/icons/secession.svg" alt="회원 탈퇴 아이콘" width={24} height={24} />
        <span>회원 탈퇴하기</span>
      </button>

      <Modal
        headerIcon={<Image src="/icons/alert.svg" width={24} height={24} alt="alert icon" />}
        title="회원 탈퇴를 진행하시겠어요?"
        description={`그룹장으로 있는 그룹은  자동으로 삭제되고,
                        모든 그룹에서 나가집니다.`}
        cancelButtonLabel="닫기"
        cancelButtonVariant="textgray"
        submitButtonLabel="회원 탈퇴"
        submitButtonVariant="danger"
        isOpen={isOpen}
        onClose={close}
      />
    </>
  );
}
