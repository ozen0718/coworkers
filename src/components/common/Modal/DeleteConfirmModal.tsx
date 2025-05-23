import Image from 'next/image';
import Modal from '@/components/common/Modal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: DeleteConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      padding="danger"
      closeIcon
      header={{
        headerIcon: <Image src="/icons/alert.svg" width={24} height={24} alt="경고" />,
        title,
        description,
      }}
      cancelButton={{ label: '닫기', variant: 'secondary' }}
      submitButton={{ label: '삭제하기', variant: 'danger' }}
      onSubmit={onConfirm}
    />
  );
}
