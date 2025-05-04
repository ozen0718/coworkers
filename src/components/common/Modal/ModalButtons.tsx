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
      {cancelButtonLabel && (
        <Button fullWidth variant={cancelButtonVariant} onClick={onClose}>
          {cancelButtonLabel}
        </Button>
      )}
      <Button fullWidth variant={submitButtonVariant} onClick={handleClickSubmit} disabled={disabled}>
        {submitButtonLabel}
      </Button>
    </div>
  );
}
