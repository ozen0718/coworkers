'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { resetPassword, resetPasswordEmail } from '@/app/api/auth';
import { PasswordInput } from '@/components/common/Inputs';
import Button from '@/components/common/Button/Button';
import ResetPasswordRequestModal from '@/components/ResetPw';
import { PageTitleStyle } from '@/styles/pageStyle';

export default function ResetPasswordPage() {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  useEffect(() => {
    setShowModal(!token);
  }, [token]);

  const handleReset = async () => {
    if (!token) {
      toast.error('토큰이 유효하지 않습니다.');
      return;
    }
    try {
      await resetPassword({
        token,
        password,
        passwordConfirmation,
      });
      toast.success('비밀번호 재설정 완료!');
      router.push('/login');
    } catch (error) {
      toast.error('비밀번호 재설정에 실패했습니다.');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <div>
          <h1 className={PageTitleStyle}>비밀번호 재설정</h1>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-lg-medium">새 비밀번호</label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 (영문, 숫자 포함, 12자 이내)를 입력해주세요."
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-lg-medium">비밀번호 확인</label>
              <PasswordInput
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="비밀번호를 다시 한번 입력해주세요."
              />
            </div>
          </div>
        </div>

        <Button size="large" variant="primary" className="mt-6 !w-full" onClick={handleReset}>
          재설정
        </Button>
      </div>

      <ResetPasswordRequestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={async (email) => {
          try {
            const redirectUrl = `${window.location.origin}`;
            await resetPasswordEmail({
              email,
              redirectUrl,
            });
            toast.success('비밀번호 재설정 메일이 발송되었습니다.');
            setShowModal(false);
          } catch (error) {
            toast.error('메일 발송에 실패했습니다.');
          }
        }}
      />
    </>
  );
}
