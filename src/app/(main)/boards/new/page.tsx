'use client';
import Button from '@/components/common/Button/Button';

export default function CreateBoard() {
  return (
    <div className="text-gray100 flex flex-col items-center">
      <div className="max-h-[841px] w-full max-w-[1200px] px-5">
        {/* 타이틀 + 버튼 */}
        <div className="w-full flex-col">
          <div className="mt-15 flex w-full max-w-[1200px] items-center justify-between">
            <p className="text-xl-bold flex">게시글 쓰기</p>
            <div className="relative">
              <button className="text-lg-semibold bg-primary hover:bg-primary-hover active:bg-primary-pressed max-[620px]:text-md-semibold flex h-12 w-[184px] items-center justify-center rounded-xl text-white max-[620px]:h-8 max-[620px]:w-[100px]">
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
