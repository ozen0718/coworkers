'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { createTeam, uploadImage } from '@/api/TeamCreate';
import { QUERY_KEYS } from '@/constants/queryKeys';

export function useAddTeamForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const MIN_NAME = 2;
  const MAX_NAME = 15;
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  const validateName = (v: string): string | null => {
    if (!v.trim()) return '이름을 입력해 주세요.';
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

  const onFileChange = (file: File | null, err: string | null) => {
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
      let imageUrl: string | undefined;
      if (file) {
        imageUrl = await uploadImage(file);
      }

      const { id: teamId } = await createTeam(name, imageUrl);

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.me });
      router.push(`/${teamId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message || '팀 생성 중 오류가 발생했습니다.');
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
