'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * 팀 생성
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

  const MIN_NAME = 2;
  const MAX_NAME = 15;
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

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

  // 파일 선택 및 서버 업로드
  const onFileChange = async (file: File | null, err: string | null) => {
    setFileError(null);
    if (err) {
      setPreviewUrl(null);
      setUploadedUrl(null);
      setFileError(err);
      return;
    }
    if (!file) {
      setPreviewUrl(null);
      setUploadedUrl(null);
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setPreviewUrl(null);
      setFileError('JPG/PNG만 업로드 가능합니다.');
      return;
    }
    if (file.size > MAX_SIZE) {
      setPreviewUrl(null);
      setFileError('5MB 이하만 가능합니다.');
      return;
    }

    // 미리보기
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

  // 이름 유효성 검사
  const validateName = (v: string): string | null => {
    if (!v.trim()) return null; // 빈 값은 에러 미표시
    if (v.length < MIN_NAME) return `최소 ${MIN_NAME}자 이상 입력해 주세요.`;
    if (v.length > MAX_NAME) return `최대 ${MAX_NAME}자까지 입력 가능합니다.`;
    const validPattern = /^[가-힣A-Za-z0-9._-]+$/;
    if (!validPattern.test(v)) return '유효한 문자가 아닙니다. 특수문자는 ., _, -만 가능합니다.';
    const jamoPattern = /^[ㄱ-ㅎㅏ-ㅣ]+$/;
    if (jamoPattern.test(v)) return '완성된 글자를 입력해 주세요.';
    return null;
  };

  // 이름 입력
  const onNameChange = (v: string) => {
    setName(v);
    setNameError(validateName(v));
  };

  // blur 시점에 추가 검증
  const onNameBlur = () => {
    setNameError(validateName(name));
  };

  // 팀 생성
  const onCreate = async () => {
    // blur 검증 미실행 상태라면 먼저 실행
    onNameBlur();
    if (nameError || fileError || !name.trim()) return;

    setSubmitError(null);
    setIsLoading(true);
    try {
      const form = new FormData();
      form.append('name', name);
      if (uploadedUrl) form.append('imageUrl', uploadedUrl);

      const res = await fetch('/api/teams', { method: 'POST', body: form });
      if (res.status === 409) {
        setNameError('이미 존재하는 이름입니다.');
        return;
      }
      if (!res.ok) {
        setSubmitError('팀 생성 중 오류가 발생했습니다.');
        return;
      }

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
    onNameBlur,
    onCreate,
  };
}

/**
 * 팀 참여
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
