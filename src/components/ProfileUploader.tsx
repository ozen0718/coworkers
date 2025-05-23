'use client';

import React, { useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface ProfileUploaderProps {
  fileUrl?: string | null;
  error?: string | null;
  onChange?: (file: File | null, error: string | null) => void;
  className?: string;
}

export default function ProfileUploader({
  fileUrl,
  error,
  onChange,
  className,
}: ProfileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      onChange?.(null, null);
      return;
    }

    // 유효 타입 검사
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      onChange?.(null, 'JPG/PNG만 가능합니다.');
      return;
    }
    // 용량 검사
    if (file.size > 10 * 1024 * 1024) {
      onChange?.(null, '10MB 이하만 가능합니다.');
      return;
    }

    // 정상 파일이면 바로 훅으로 전달
    onChange?.(file, null);
  };

  return (
    <label className={clsx('inline-block cursor-pointer', className)}>
      <div className="bg-bg200 relative h-16 w-16 overflow-hidden rounded-full border-2 border-gray-700">
        {fileUrl ? (
          <img
            src={fileUrl}
            alt="팀 프로필 미리보기"
            className="absolute top-1/2 left-1/2 h-full w-auto -translate-x-1/2 -translate-y-1/2 transform object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-500">
            <Image
              src="/icons/initialteamprofile.svg"
              alt="기본 팀 아이콘"
              width={32}
              height={32}
            />
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileChange}
      />
      {error && <p className="text-danger mt-2 text-sm">{error}</p>}
    </label>
  );
}
