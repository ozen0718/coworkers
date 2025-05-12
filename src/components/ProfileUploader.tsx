import React, { useRef } from 'react';
import Image from 'next/image';

interface Props {
  file: File | null;
  error: string | null;
  onChange: (file: File | null, error: string | null) => void;
  onClick: () => void;
}

export default function ProfileUploader({ file, error, onChange, onClick }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const MAX_SIZE = 5 * 1024 * 1024;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (f) {
      if (!['image/jpeg', 'image/png'].includes(f.type)) {
        return onChange(null, 'JPG/PNG만 업로드할 수 있어요.');
      }
      if (f.size > MAX_SIZE) {
        return onChange(null, '5MB 이하 파일만 허용됩니다.');
      }
    }
    onChange(f, null);
  };

  return (
    <div className="relative mb-4 inline-block h-16 w-16">
      <Image
        src={file ? URL.createObjectURL(file) : '/icons/initialteamprofile.svg'}
        alt="팀 아이콘"
        fill
        className="cursor-pointer rounded-full border-2 border-gray-700 object-cover"
        onClick={onClick}
      />
      <Image
        src="/icons/pencil.svg"
        alt="프로필 변경"
        width={24}
        height={24}
        className="bg-bg300 absolute right-0 bottom-0 cursor-pointer rounded-full p-1"
        onClick={onClick}
      />
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFile}
      />
      {error && <p className="text-danger mt-1 text-sm">{error}</p>}
    </div>
  );
}
