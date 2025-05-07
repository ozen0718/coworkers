import { useState } from 'react';

export function useModalGroup<T extends string>() {
  const [activeModal, setActiveModal] = useState<T | null>(null);

  const open = (name: T) => setActiveModal(name);
  const close = () => setActiveModal(null);
  const isOpen = (name: T) => activeModal === name;

  return { open, close, isOpen };
}

/* ========================= */
/* 사용 예시 */
/* ========================= */

// const { open, close, isOpen } = useModalGroup<'invite' | 'createList' | 'profile'>();
//
// <button onClick={() => open('invite')}>멤버 초대</button>
// <button onClick={() => open('createList')}>할 일 목록 추가</button>
// <button onClick={() => open('profile')}>프로필</button>
//
// <Modal
//   isOpen={isOpen('invite')}
//   onClose={close}
//   title="멤버 초대"
//   // ...
// />

// <button onClick={() => open('createList')}>목록 추가</button>
// <Modal
//   isOpen={isOpen('createList')}
//   onClose={close}
//   title="할 일 목록 추가"
// />

// <Modal
//   isOpen={isOpen('profile')}
//   onClose={close}
//   title="프로필"
// />
