import { useState } from 'react';

export function useModal(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
}

/* ========================= */
/* 사용 예시 */
/* ========================= */

// const { isOpen, open, close } = useModal();

// <button onClick={open}>멤버 초대</button>

// <Modal
//   isOpen={isOpen}
//   onClose={close}
//   header={{ title: "멤버 초대" }}
//   ...
// />
