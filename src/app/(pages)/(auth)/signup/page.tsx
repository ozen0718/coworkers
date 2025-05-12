'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { signup } from '@/app/api/auth';
import { EmailInput, PasswordInput, TextInput } from '@/components/common/Inputs';
import OAuth from '@/components/oauth/index';
import Button from '@/components/common/Button/Button';
import { PageTitleStyle } from '@/styles/pageStyle';

export default function SignupPage() {
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

  const handleSubmit = async () => {
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
    <div className="flex flex-col gap-[25px] md:gap-12 lg:-mt-10">
      <div>
        <h1 className={PageTitleStyle}>회원가입</h1>

        <div className="mb-10 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="nickname" className="text-lg-medium">
              닉네임
            </label>
            <TextInput
              id="nickname"
              name="nickname"
              placeholder="닉네임을 입력해주세요."
              value={form.nickname}
              onChange={handleChange}
            />
          </div>

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
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="passwordConfirmation" className="text-lg-medium">
              비밀번호 확인
            </label>
            <PasswordInput
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="비밀번호를 다시 한번 입력해주세요."
              value={form.passwordConfirmation}
              onChange={handleChange}
            />
          </div>
        </div>

        <Button size="large" variant="primary" fullWidth onClick={handleSubmit}>
          회원가입
        </Button>
      </div>

      <OAuth authType="signup" />
    </div>
  );
}
