'use client';

import clsx from 'clsx';

export default function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className={clsx(
        'bg-gray100 text-bg400 text-sm-medium fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg px-4 py-2 shadow-lg transition-opacity duration-500',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      {message}
    </div>
  );
}
