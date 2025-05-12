'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

//팀 생성
export function useAddTeamForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const MAX_LENGTH = 15;
  const isDisabled = name.trim().length === 0 || Boolean(error);

  const onFileChange = (selected: File | null, errMsg: string | null) => {
    setFile(selected);
    setError(errMsg);
  };

  const onNameChange = (v: string) => {
    if (v.length > MAX_LENGTH) return;
    setName(v);
    setError(
      v.length === MAX_LENGTH ? `팀 제목은 ${MAX_LENGTH}글자 이하로 작성할 수 있습니다.` : null
    );
  };

  const onCreate = async () => {
    if (isDisabled) return;
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    if (file) formData.append('image', file);

    const res = await fetch('/api/teams', { method: 'POST', body: formData });
    if (res.status === 409) {
      setError('이미 존재하는 이름입니다.');
      return;
    }
    if (!res.ok) {
      setError('팀 생성 중 오류가 발생했습니다.');
      return;
    }

    const { id } = await res.json();
    router.push(`/main/${id}`);
  };

  return { file, name, error, isDisabled, onFileChange, onNameChange, onCreate };
}

//팀 참여
export function useJoinTeamForm() {
  const router = useRouter();
  const [link, setLink] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isDisabled = link.trim().length === 0 || Boolean(error);

  const onChange = (v: string) => {
    setLink(v);
    setError(null);
  };

  const onSubmit = async () => {
    if (isDisabled) return;
    setError(null);

    const res = await fetch('/api/teams/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link }),
    });
    if (res.status === 404) return setError('유효하지 않은 링크입니다.');
    if (!res.ok) return setError('참여 중 오류가 발생했습니다.');

    const { id } = await res.json();
    router.push(`/main/${id}`);
  };

  return { link, error, isDisabled, onChange, onSubmit };
}
