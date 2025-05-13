'use client';

import { useState } from 'react';
import { signup } from '../../../api/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.nickname || !form.password || !form.passwordConfirmation) {
      toast.error('모든 항목을 입력해주세요.');
      return;
    }

    if (form.password !== form.passwordConfirmation) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await signup(form);
      toast.success('회원가입 성공!');
      router.push('/login');
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} placeholder="이메일" onChange={handleChange} />
      <input name="nickname" value={form.nickname} placeholder="닉네임" onChange={handleChange} />
      <input
        name="password"
        value={form.password}
        type="password"
        placeholder="비밀번호"
        onChange={handleChange}
      />
      <input
        name="passwordConfirmation"
        value={form.passwordConfirmation}
        type="password"
        placeholder="비밀번호 확인"
        onChange={handleChange}
      />
      <button type="submit">회원가입</button>
    </form>
  );
}
