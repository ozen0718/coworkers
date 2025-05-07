'use client';

import { useState } from 'react';
import { EmailInput, PasswordInput } from '@/components/common/Inputs';
import OAuth from '@/components/oauth/index';
import Button from '@/components/common/Button/Button';
import Link from 'next/link';
import { PageTitleStyle } from '@/styles/pageStyle';
import { login } from '@/app/api/auth'; // login 함수
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const teamId = '13-4'; // or use context/store if dynamic
      await login({ teamId, email, password });
      toast.success('로그인 성공!');
      // TODO: 토큰 저장 및 라우팅 처리
    } catch (error: any) {
      console.error('로그인 실패:', error.response?.data || error);
      toast.error(error.response?.data?.message || '로그인 실패');
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
              placeholder="이메일을 입력해주세요."
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="password" className="text-lg-medium">
              비밀번호
            </label>
            <PasswordInput
              placeholder="비밀번호를 입력해주세요."
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
