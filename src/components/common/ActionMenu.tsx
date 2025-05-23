'use client';

import { useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { ActionMenuProps } from '@/types/actionmenutypes';

export default function ActionMenu({
  trigger,
  onEdit,
  onDelete,
  menuPosition = 'right',
}: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="relative shrink-0" ref={ref}>
      <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`border-gray100/10 bg-bg200 text-md-regular absolute z-10 mt-2 w-36 overflow-hidden rounded-xl border ${
            menuPosition === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {onEdit && (
            <div
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              className="hover:bg-primary-hover h-10 w-full cursor-pointer px-4 py-[11.5px] text-left"
            >
              수정하기
            </div>
          )}
          <div
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="hover:bg-danger h-10 w-full cursor-pointer px-4 py-[11.5px] text-left"
          >
            삭제하기
          </div>
        </div>
      )}
    </div>
  );
}
