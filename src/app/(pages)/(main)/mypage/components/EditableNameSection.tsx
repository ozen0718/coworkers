import { CurrentName } from '@/components/common/Inputs';
import Modal from '@/components/common/Modal';
import FormField from '@/components/FormField';
import { useModal } from '@/hooks/useModal';
import { useState } from 'react';

interface EditableNameProps {
  name: string;
}

export default function EditableNameSection({ name }: EditableNameProps) {
  const [inputName, setInputName] = useState(name ?? '');
  const { isOpen, open, close } = useModal();

  const handleNameChange = (value: string) => {
    setInputName(value);
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
      >
        <div className="mt-4 min-w-[280px]">
          <FormField label="이름" onValueChange={handleNameChange} value={inputName} />
        </div>
      </Modal>
    </>
  );
}
