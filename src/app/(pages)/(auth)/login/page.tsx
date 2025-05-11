'use client';

import { useState } from 'react';
import { EmailInput, PasswordInput } from '@/components/common/Inputs';
import OAuth from '@/components/oauth/index';
import Button from '@/components/common/Button/Button';
import Link from 'next/link';
import { PageTitleStyle } from '@/styles/pageStyle';
import { login } from '@/app/api/auth';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore'; // ✅ 추가

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const teamId = '13-4';
      const response = await login({ teamId, email: form.email, password: form.password });

      //로그인 성공 시 토큰 저장 (zustand + localStorage)
      useAuthStore.getState().setAccessToken(response.accessToken);

      toast.success('로그인 성공!');
      router.push('/'); // 로그인시 페이지 이동
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || '로그인 실패');
    }
  };

  return (
    <div className="flex flex-col gap-[25px] md:gap-12">
      <div>
        <h1 className={PageTitleStyle}>로그인</h1>

        <div className="mb-10 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-lg-medium">
              이메일
            </label>
            <EmailInput
              id="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="password" className="text-lg-medium">
              비밀번호
            </label>
            <PasswordInput
              id="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={form.password}
              onChange={handleChange}
            />
            <div className="flex justify-end">
              <Link
                href="/resetpassword"
                className="text-primary text-md-medium underline hover:opacity-80"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
          </div>
        </div>

        <Button size="large" variant="primary" fullWidth onClick={handleLogin}>
          로그인
        </Button>

        <p className="text-md-regular text-gray400 mt-6 text-center">
          아직 계정이 없으신가요?{' '}
          <Link href="/signup" className="text-primary underline hover:opacity-80">
            가입하기
          </Link>
        </p>
      </div>

      <OAuth authType="login" />
    </div>
  );
}
