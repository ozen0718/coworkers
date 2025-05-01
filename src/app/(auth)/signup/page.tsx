'use client';

import { EmailInput, PasswordInput, TextInput } from '@/components/common/Inputs';
import OAuth from '@/components/oauth/index';
import Button from '@/components/common/Button/Button';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="bg-bg300 flex min-h-screen justify-center px-4">
      <div className="mt-[80px] mb-[40px] flex w-full max-w-[460px] flex-col gap-8">
        {/* 제목 */}
        <h1 className="text-4xl-medium mb-[60px] text-center text-white">회원가입</h1>

        {/* 이름 */}
        <div className="flex flex-col gap-2">
          <label className="text-lg-medium text-white">이름</label>
          <TextInput placeholder="이름을 입력해주세요." />
        </div>

        {/* 이메일 */}
        <div className="flex flex-col gap-2">
          <label className="text-lg-medium text-white">이메일</label>
          <EmailInput />
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col gap-2">
          <label className="text-lg-medium text-white">비밀번호</label>
          <PasswordInput />
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col gap-2">
          <label className="text-lg-medium text-white">비밀번호 확인</label>
          <PasswordInput placeholder="비밀번호를 다시 한번 입력해주세요." />
        </div>

        {/* 회원가입 버튼 */}
        <Button size="large" variant="primary" className="mt-4 !w-full">
          회원가입
        </Button>

        {/* 소셜 회원가입 */}
        <div className="mt-6">
          <OAuth authType="signup" />
        </div>
      </div>
    </div>
  );
}
