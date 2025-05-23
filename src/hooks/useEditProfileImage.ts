'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { uploadImage } from '@/api/TeamCreate';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { updateUserImage } from '@/api/user';

export function useEditProfileImage() {
  const queryClient = useQueryClient();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const MAX_SIZE = 10 * 1024 * 1024;

  const onFileChange = async (file: File | null, err: string | null) => {
    setFileError(err);
    setSubmitError(null);

    if (err || !file) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }
    if (file.size > MAX_SIZE) {
      setFileError('10MB 이하만 가능합니다.');
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));

    await onSubmit(file);
  };

  const onSubmit = async (fileToUpload: File | null = file) => {
    if (!fileToUpload) return;

    setIsLoading(true);
    setSubmitError(null);

    try {
      const imageUrl = await uploadImage(fileToUpload);
      await updateUserImage(imageUrl);
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.user.me,
      });
    } catch (err) {
      if (err instanceof Error) {
        setSubmitError(err.message || '이미지 수정 중 오류 발생');
      } else {
        setSubmitError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !!fileError || isLoading;

  return {
    previewUrl,
    fileError,
    submitError,
    isDisabled,
    isLoading,
    onFileChange,
    onSubmit,
  };
}
