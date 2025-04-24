import { TextAreaInput } from '@/components/common/Inputs/Inputs';

export default function AddComment() {
  return (
    <div className="flex min-h-[113px] w-full max-w-[1200px] flex-col bg-transparent lg:h-[216px]">
      <div className="text-gray100 mr-0.5 flex w-full items-start justify-between text-base font-bold sm:text-xl sm:font-medium">
        댓글달기
      </div>
      <div className="mt-3 p-0.5">
        <TextAreaInput placeholder="내용을 입력해주세요" height="h-[104px]" />
      </div>{' '}
      <div className="mt-2 flex justify-end">
        <button className="text-lg-semibold bg-primary hover:bg-primary-hover active:bg-primary-pressed max-[620px]:text-md-semibold flex h-12 w-[184px] items-center justify-center rounded-xl text-white max-[620px]:h-8 max-[620px]:w-[100px]">
          등록
        </button>
      </div>
    </div>
  );
}
