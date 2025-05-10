'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { isBrowser } from '@/utils/env';
import { ModalProps } from './types';
import { paddingStyle, radiusStyle } from './style';
import ModalHeader from './components/ModalHeader';
import ModalButtons from './components/ModalButtons';
import useModalEffects from './useModalEffects';

export default function Modal({
  padding = 'default',
  borderRadius = '12',
  closeIcon,
  header,
  cancelButton,
  submitButton,
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

  const modalRef = useRef<HTMLDivElement>(null);

  useModalEffects(modalRef, onClose, isOpen);

  if (!isBrowser) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={clsx(
              'bg-bg200 relative flex w-full flex-col sm:w-[384px]',
              paddingStyle[padding],
              radiusStyle[borderRadius]
            )}
            initial={{ y: 20, opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.05 }}
            ref={modalRef}
          >
            {closeIcon && (
              <button type="button" onClick={onClose} className="absolute top-4 right-4">
                <Image src="/icons/close.svg" alt="" width={24} height={24} className="h-6 w-6" />
              </button>
            )}
            {header && <ModalHeader {...header} />}
            {children}
            <ModalButtons
              cancelButton={cancelButton}
              submitButton={submitButton}
              onClose={onClose}
              onSubmit={onSubmit}
              disabled={disabled}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
