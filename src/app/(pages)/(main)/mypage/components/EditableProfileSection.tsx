'use client';

import Button from '@/components/common/Button/Button';
import ProfileUploader from '@/components/ProfileUploader';
import { useEditProfileImage } from '@/hooks/useEditProfileImage';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function EditableProfileSection() {
  const { previewUrl, fileError, submitError, onFileChange, } =
    useEditProfileImage();

  useEffect(() => {
    if (submitError) {
      toast.error(submitError);
    }
  }, [submitError]);
  return (
    <div className="flex w-fit flex-col items-center gap-3">
      <ProfileUploader fileUrl={previewUrl} error={fileError} onChange={onFileChange} />
    </div>
  );
}
