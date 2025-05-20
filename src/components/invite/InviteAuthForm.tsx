'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signup, login } from '@/api/auth';
import { EmailInput, PasswordInput, TextInput } from '@/components/common/Inputs';
import Button from '@/components/common/Button/Button';
import { useAuthStore } from '@/stores/useAuthStore';

export default function InviteAuthForm({ token }: { token: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
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

  const handleSignup = async () => {
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
      const { accessToken } = await login({ email: form.email, password: form.password });

      useAuthStore.getState().setAccessToken(accessToken);
      toast.success('회원가입 성공!');
      router.replace(`/invite?token=${token}`);
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'response' in e) {
        const err = e as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message || '로그인 실패');
      } else {
        toast.error('로그인 실패');
      }
    }
  };

  const handleLogin = async () => {
    try {
      const { accessToken } = await login({
        email: form.email,
        password: form.password,
      });
      useAuthStore.getState().setAccessToken(accessToken);
      toast.success('로그인 성공!');
      router.replace(`/invite?token=${token}`);
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'response' in e) {
        const err = e as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message || '회원가입 실패');
      } else {
        toast.error('회원가입 실패');
      }
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 p-8">
      <h1 className="text-xl-bold text-center">
        초대 수락을 위해 {mode === 'signup' ? '회원가입' : '로그인'} 해주세요
      </h1>

      {mode === 'signup' && (
        <TextInput
          name="nickname"
          placeholder="닉네임"
          value={form.nickname}
          onChange={handleChange}
        />
      )}
      <EmailInput name="email" placeholder="이메일" value={form.email} onChange={handleChange} />
      <PasswordInput
        name="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
      />
      {mode === 'signup' && (
        <PasswordInput
          name="passwordConfirmation"
          placeholder="비밀번호 확인"
          value={form.passwordConfirmation}
          onChange={handleChange}
        />
      )}

      <Button fullWidth variant="primary" onClick={mode === 'signup' ? handleSignup : handleLogin}>
        {mode === 'signup' ? '회원가입 후 계속하기' : '로그인 후 계속하기'}
      </Button>

      <button
        className="text-gray400 hover:text-primary text-center text-sm underline"
        onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
      >
        {mode === 'signup'
          ? '이미 계정이 있으신가요? 로그인하기'
          : '계정이 없으신가요? 회원가입하기'}
      </button>
    </div>
  );
}
