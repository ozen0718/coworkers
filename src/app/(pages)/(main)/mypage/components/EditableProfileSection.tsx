'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import ProfileUploader from '@/components/ProfileUploader';
import { useEditProfileImage } from '@/hooks/useEditProfileImage';
import { useUserInfo } from '@/hooks/useUserInfo';

export default function EditableProfileSection({}) {
  const { data: user } = useUserInfo();
  const { previewUrl, fileError, submitError, onFileChange } = useEditProfileImage();

  useEffect(() => {
    if (submitError) {
      toast.error(submitError);
    }
  }, [submitError]);

  const getFileUrl = () => {
    if (previewUrl !== null) return previewUrl;
    if (user?.image) return user.image;
    return null;
  };

  const fileUrl = getFileUrl();

  return (
    <div className="flex w-fit flex-col items-center gap-3">
      <ProfileUploader fileUrl={fileUrl} error={fileError} onChange={onFileChange} />
    </div>
  );
}
