import Button from '../Button/Button';
import { ModalButtonsProps } from './types';

export default function ModalButtons({
  cancelButtonLabel,
  submitButtonLabel,
  cancelButtonVariant,
  submitButtonVariant,
  onClose,
  onSubmit,
  disabled,
}: ModalButtonsProps) {
  const handleClickSubmit = () => {
    onSubmit?.();
    onClose();
  };

  return (
    <div className="mt-6 flex gap-2">
      {cancelButtonLabel && (
        <Button variant={cancelButtonVariant} onClick={onClose}>
          {cancelButtonLabel}
        </Button>
      )}
      <Button variant={submitButtonVariant} onClick={handleClickSubmit} disabled={disabled}>
        {submitButtonLabel}
      </Button>
    </div>
  );
}
