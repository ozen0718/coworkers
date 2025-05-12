'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
팀 생성
 */
export function useAddTeamForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const MAX_NAME = 15;
  const MAX_SIZE = 5 * 1024 * 1024;

  // 이미지 업로드
  async function uploadImage(file: File): Promise<string> {
    const form = new FormData();
    form.append('file', file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/images/upload`, {
      method: 'POST',
      body: form,
    });
    if (!res.ok) throw new Error('UPLOAD_FAIL');
    const { url } = await res.json();
    return url as string;
  }

  // 파일 선택 및 업로드
  const onFileChange = async (file: File | null, err: string | null) => {
    setFileError(null);
    if (err) {
      setPreviewUrl(null);
      setUploadedUrl(null);
      return setFileError(err);
    }
    if (!file) {
      setPreviewUrl(null);
      setUploadedUrl(null);
      return;
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setPreviewUrl(null);
      return setFileError('JPG/PNG만 업로드 가능합니다.');
    }
    if (file.size > MAX_SIZE) {
      setPreviewUrl(null);
      return setFileError('5MB 이하만 가능합니다.');
    }

    setPreviewUrl(URL.createObjectURL(file));

    // 서버 업로드
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

  // 팀 이름 입력
  const onNameChange = (v: string) => {
    setNameError(null);
    if (!v.trim()) return setNameError('팀 이름을 입력해 주세요.');
    if (v.length > MAX_NAME) return setNameError(`최대 ${MAX_NAME}자까지 입력 가능합니다.`);
    setName(v);
  };

  // 폼 제출
  const onCreate = async () => {
    if (nameError || fileError || !name.trim()) return;
    setSubmitError(null);
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append('name', name);
      if (uploadedUrl) form.append('imageUrl', uploadedUrl);

      const res = await fetch('/api/teams', { method: 'POST', body: form });
      if (res.status === 409) return setNameError('이미 존재하는 이름입니다.');
      if (!res.ok) return setSubmitError('팀 생성 중 오류가 발생했습니다.');

      const { id } = await res.json();
      router.push(`/main/${id}`);
    } catch {
      setSubmitError('알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !!nameError || !!fileError || !name.trim() || isLoading;

  return {
    name,
    previewUrl,
    fileError,
    nameError,
    submitError,
    isDisabled,
    isLoading,
    onFileChange,
    onNameChange,
    onCreate,
  };
}

/**
 * 팀 참du
 */
export function useJoinTeamForm() {
  const router = useRouter();
  const [link, setLink] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = link.trim().length === 0 || Boolean(error) || isLoading;

  const onChange = (v: string) => {
    setLink(v);
    setError(null);
    setSubmitError(null);
  };

  const onSubmit = async () => {
    if (isDisabled) return;
    setIsLoading(true);
    setSubmitError(null);

    const res = await fetch('/api/teams/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link }),
    });

    if (res.status === 404) {
      setSubmitError('유효하지 않은 링크입니다.');
    } else if (!res.ok) {
      setSubmitError('참여 중 오류가 발생했습니다.');
    } else {
      const { id } = await res.json();
      router.push(`/main/${id}`);
    }

    setIsLoading(false);
  };

  return { link, error, submitError, isDisabled, isLoading, onChange, onSubmit };
}
