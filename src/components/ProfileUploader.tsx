import React, { useRef } from 'react';
import Image from 'next/image';

interface Props {
  fileUrl: string | null;
  error: string | null;
  onChange: (file: File | null, err: string | null) => void;
  onClick: () => void;
}

export default function ProfileUploader({ fileUrl, error, onChange, onClick }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    onChange(f, null);
  };

  return (
    <div className="mb-4 flex flex-col items-start">
      <div className="relative h-16 w-16">
        <Image
          src={fileUrl ?? '/icons/initialteamprofile.svg'}
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
      </div>
      {error && <p className="text-danger mt-1 text-sm">{error}</p>}
    </div>
  );
}
