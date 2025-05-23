'use client';
import { motion } from 'framer-motion';
type SlideWrapperProps = {
  isOpen: boolean; // 열림 여부
  onCloseAction: () => void; // 닫힘 여부
  children: React.ReactNode; // 내용
};

export default function SlideWrapper({ isOpen, onCloseAction, children }: SlideWrapperProps) {
  return (
    <>
      {/* 배경*/}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/30" onClick={onCloseAction} />}

      {/* 카드 */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 z-50 h-full max-w-full overflow-auto bg-white shadow-xl sm:max-w-[435px] lg:max-w-[780px]"
      >
        {children}
      </motion.div>
    </>
  );
}
