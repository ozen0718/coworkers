'use client';

import { EmailInput, PasswordInput } from '@/components/common/Inputs';
import OAuth from '@/components/oauth/index';
import Button from '@/components/common/Button/Button';
import Link from 'next/link';
import { PageTitleStyle } from '@/styles/pageStyle';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-[25px] md:gap-12">
      <div>
        {/* 제목 */}
        <h1 className={PageTitleStyle}>로그인</h1>

        <div className="mb-10 flex flex-col gap-6">
          {/* 이메일 필드 */}
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-lg-medium">
              이메일
            </label>
            <EmailInput placeholder="이메일을 입력해주세요." id="email" />
          </div>

          {/* 비밀번호 필드 */}
          <div className="flex flex-col gap-3">
            <label htmlFor="password" className="text-lg-medium">
              비밀번호
            </label>
            <PasswordInput placeholder="비밀번호를 입력해주세요." id="password" />
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

        {/* 로그인 버튼 */}
        <Button size="large" variant="primary" fullWidth>
          로그인
        </Button>

        {/* 회원가입 안내 */}
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
