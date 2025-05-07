'use client';

import { useState } from 'react';
import { EmailInput, PasswordInput } from '@/components/common/Inputs';
import OAuth from '@/components/oauth/index';
import Button from '@/components/common/Button/Button';
import Link from 'next/link';
import { PageTitleStyle } from '@/styles/pageStyle';
import { login } from '@/app/api/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/stores/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const teamId = '13-4'; // 🔧 팀 ID는 현재 고정값

  const handleLogin = async () => {
    try {
      const res = await login({ teamId, email, password });
      setAccessToken(res.accessToken);
      toast.success('로그인 성공!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || '로그인 실패');
    }
  };

  return (
    <div className="flex flex-col gap-[25px] md:gap-12">
      <div>
        <h1 className={PageTitleStyle}>로그인</h1>

        <div className="mb-10 flex flex-col gap-6">
          {/* 이메일 필드 */}
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-lg-medium">
              이메일
            </label>
            <EmailInput
              id="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* 비밀번호 필드 */}
          <div className="flex flex-col gap-3">
            <label htmlFor="password" className="text-lg-medium">
              비밀번호
            </label>
            <PasswordInput
              id="password"
              placeholder="비밀번호를 입력해주세요."
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

      {/* 소셜 로그인 영역 */}
      <OAuth authType="login" />
    </div>
  );
}
