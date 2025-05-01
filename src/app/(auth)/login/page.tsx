'use client';

import { EmailInput, PasswordInput } from '@/components/common/Inputs';
import OAuth from '@/components/oauth/index';
import Button from '@/components/common/Button/Button';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="bg-bg300 flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-[460px] flex-col gap-8">
        {/* 제목 */}
        <h1 className="text-4xl-medium mb-[60px] text-center text-white">로그인</h1>

        {/* 이메일 필드 */}
        <div className="flex flex-col gap-2">
          <label className="text-lg-medium text-white">이메일</label>
          <EmailInput />
        </div>

        {/* 비밀번호 필드 */}
        <div className="flex flex-col gap-2">
          <label className="text-lg-medium text-white">비밀번호</label>
          <PasswordInput />
          <div className="flex justify-end">
            <Link
              href="/resetpassword"
              className="text-primary text-md-medium underline hover:opacity-80"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <Button size="large" variant="primary" className="!w-full">
          로그인
        </Button>

        {/* 회원가입 안내 */}
        <p className="text-md-regular text-gray400 text-center">
          아직 계정이 없으신가요?{' '}
          <Link href="/signup" className="text-primary underline hover:opacity-80">
            가입하기
          </Link>
        </p>

        {/* 소셜 로그인 영역 */}
        <OAuth authType="login" />
      </div>
    </div>
  );
}
