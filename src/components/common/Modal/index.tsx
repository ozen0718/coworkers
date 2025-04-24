'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { ModalProps } from './types';
import { paddingStyle, radiusStyle } from './style';
import ModalHeader from './ModalHeader';
import ModalButtons from './ModalButtons';

export default function Modal({
  padding = 'default',
  borderRadius = '12',
  title,
  description,
  cancelButtonLabel,
  submitButtonLabel,
  cancelButtonVariant,
  submitButtonVariant,
  isOpen,
  onClose,
  onSubmit,
  disabled,
  children,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={clsx(
          'bg-bg200 flex w-[375px] flex-col md:w-[384px]',
          paddingStyle[padding],
          radiusStyle[borderRadius]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader title={title} description={description} />
        {children}
        <ModalButtons
          cancelButtonLabel={cancelButtonLabel}
          submitButtonLabel={submitButtonLabel}
          cancelButtonVariant={cancelButtonVariant}
          submitButtonVariant={submitButtonVariant}
          onClose={onClose}
          onSubmit={onSubmit}
          disabled={disabled}
        />
      </div>
    </div>,
    document.body
  );
}
