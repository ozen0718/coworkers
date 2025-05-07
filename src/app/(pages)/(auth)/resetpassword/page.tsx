'use client';

import { useEffect, useState } from 'react';
import { PasswordInput } from '@/components/common/Inputs';
import Button from '@/components/common/Button/Button';
import ResetPasswordRequestModal from '@/components/ResetPw';
import { PageTitleStyle } from '@/styles/pageStyle';

export default function ResetPasswordPage() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true); // 페이지 진입 시 모달 표시
  }, []);

  return (
    <>
      <div className="flex flex-col gap-10">
        <div>
          <h1 className={PageTitleStyle}>비밀번호 재설정</h1>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-lg-medium">새 비밀번호</label>
              <PasswordInput placeholder="비밀번호 (영문, 숫자 포함, 12자 이내)를 입력해주세요." />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-lg-medium">비밀번호 확인</label>
              <PasswordInput placeholder="새 비밀번호를 다시 한번 입력해주세요." />
            </div>
          </div>
        </div>

        <Button size="large" variant="primary" className="mt-6 !w-full">
          재설정
        </Button>
      </div>

      {/* 모달 연결 */}
      <ResetPasswordRequestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(email) => {
          console.log('이메일', email);
          setShowModal(false);
        }}
      />
    </>
  );
}
