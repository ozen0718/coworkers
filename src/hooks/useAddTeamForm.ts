'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadImage, createTeam } from '@/api/TeamCreate';

export function useAddTeamForm() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const MIN_NAME = 2;
  const MAX_NAME = 15;
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  const validateName = (v: string): string | null => {
    if (!v.trim()) return null;
    if (v.length < MIN_NAME) return `최소 ${MIN_NAME}자 이상 입력해 주세요.`;
    if (v.length > MAX_NAME) return `최대 ${MAX_NAME}자까지 입력 가능합니다.`;
    const validPattern = /^[가-힣A-Za-z0-9._-]+$/;
    if (!validPattern.test(v)) return '특수문자는 ., _, -만 사용할 수 있어요.';
    const jamoPattern = /^[ㄱ-ㅎㅏ-ㅣ]+$/;
    if (jamoPattern.test(v)) return '완성된 글자를 입력해 주세요.';
    return null;
  };

  const onNameChange = (v: string) => {
    setName(v);
    setNameError(validateName(v));
  };

  const onNameBlur = () => {
    setNameError(validateName(name));
  };

  const onFileChange = async (file: File | null, err: string | null) => {
    setFileError(null);
    if (err) {
      setFileError(err);
      return;
    }
    if (!file) {
      setPreviewUrl(null);
      setUploadedUrl(null);
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setFileError('JPG/PNG만 업로드 가능합니다.');
      return;
    }
    if (file.size > MAX_SIZE) {
      setFileError('5MB 이하만 가능합니다.');
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    setIsLoading(true);
    try {
      const url = await uploadImage(file);
      setUploadedUrl(url);
    } catch {
      setFileError('업로드 중 오류가 발생했습니다.');
      setUploadedUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  const onCreate = async () => {
    const nameErr = validateName(name);
    if (nameErr || fileError || !name.trim()) {
      setNameError(nameErr);
      return;
    }

    setSubmitError(null);
    setIsLoading(true);
    try {
      const { id } = await createTeam(name, uploadedUrl ?? undefined);
      router.push(`/main/${id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === 'DUPLICATE_NAME') {
          setNameError('이미 존재하는 이름입니다.');
        } else {
          setSubmitError('팀 생성 중 오류가 발생했습니다.');
        }
      } else {
        setSubmitError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !!nameError || !!fileError || !name.trim() || isLoading;

  return {
    name,
    previewUrl,
    nameError,
    fileError,
    submitError,
    isDisabled,
    isLoading,
    onNameChange,
    onNameBlur,
    onFileChange,
    onCreate,
  };
}
