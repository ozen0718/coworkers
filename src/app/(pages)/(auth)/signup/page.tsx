'use client';

import { EmailInput, PasswordInput, TextInput } from '@/components/common/Inputs';
import OAuth from '@/components/oauth/index';
import Button from '@/components/common/Button/Button';
import Link from 'next/link';
import { PageTitleStyle } from '@/styles/pageStyle';

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-[25px] md:gap-12 lg:-mt-10">
      <div>
        {/* 제목 */}
        <h1 className={PageTitleStyle}>회원가입</h1>

        <div className="mb-10 flex flex-col gap-6">
          {/* 이름 */}
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className="text-lg-medium">
              이름
            </label>
            <TextInput id="name" placeholder="이름을 입력해주세요." />
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-lg-medium">
              이메일
            </label>
            <EmailInput id="email" placeholder="이메일을 입력해주세요." />
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-3">
            <label htmlFor="password" className="text-lg-medium">
              비밀번호
            </label>
            <PasswordInput id="password" placeholder="비밀번호를 입력해주세요." />
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex flex-col gap-3">
            <label htmlFor="passwordConfirm" className="text-lg-medium">
              비밀번호 확인
            </label>
            <PasswordInput id="passwordConfirm" placeholder="비밀번호를 다시 한번 입력해주세요." />
          </div>
        </div>

        {/* 회원가입 버튼 */}
        <Button size="large" variant="primary" fullWidth>
          회원가입
        </Button>
      </div>

      {/* 소셜 회원가입 */}
      <OAuth authType="signup" />
    </div>
  );
}
