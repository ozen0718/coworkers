import Modal from '@/components/common/Modal';
import { TextInput } from '@/components/common/Inputs';

interface EditTaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
}

export default function EditTaskListModal({
  isOpen,
  onClose,
  value,
  onChange,
  onSubmit,
}: EditTaskListModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={{ title: '할 일 목록' }}
      submitButton={{ label: '수정하기' }}
      closeIcon
      onSubmit={onSubmit}
    >
      <div className="mt-6">
        <TextInput
          placeholder="목록 명을 입력해주세요."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </Modal>
  );
}
