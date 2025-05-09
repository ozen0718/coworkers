import Button from '../Button/Button';
import { ModalButtonsProps } from './types';

export default function ModalButtons({
  // cancelButtonLabel,
  // submitButtonLabel,
  // cancelButtonVariant,
  // submitButtonVariant,
  cancelButton,
  submitButton,
  onClose,
  onSubmit,
  disabled,
}: ModalButtonsProps) {
  const handleClickSubmit = async () => {
    if (onSubmit) {
      try {
        await onSubmit();
        onClose();
      } catch (error) {
        console.error('Submit 에러:', error);
      }
    } else {
      onClose();
    }
  };

  return (
    <div className="mt-6 flex gap-2">
      {cancelButton?.label && (
        <Button fullWidth variant={cancelButton?.variant} onClick={onClose}>
          {cancelButton?.label}
        </Button>
      )}
      <Button
        fullWidth
        variant={submitButton.variant}
        onClick={handleClickSubmit}
        disabled={disabled}
      >
        {submitButton.label}
      </Button>
    </div>
  );
}
