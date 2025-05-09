import useClickOutside from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useFocusTrap } from '@/hooks/useFocusTrap';

export default function useModalEvents(
  ref: React.RefObject<HTMLElement>,
  onClose: () => void,
  isOpen: boolean
) {
  useClickOutside(ref, () => {
    if (isOpen) onClose();
  });

  useEscapeKey(() => {
    if (isOpen) onClose();
  });

  useFocusTrap(ref, isOpen);
}
