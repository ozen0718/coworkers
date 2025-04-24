import { TextAreaInput } from "@/components/Inputs/Inputs";

export default function AddComment() {
  return (
    <div className="flex flex-col w-full lg:w-[1200px] lg:h-[216px] min-h-[113px] bg-trasparent bg-transparent">
      <div className="mr-0.5 flex justify-between items-start w-full sm:text-xl text-base font-bold sm:font-medium text-gray100">
        댓글달기
      </div>
      <div className="p-0.5 mt-3">
        <TextAreaInput placeholder="내용을 입력해주세요" height="h-[104px]" />
      </div>{" "}
      <div className="flex justify-end mt-2">
        <button className="flex items-center justify-center text-lg-semibold w-[184px] h-12 rounded-xl bg-primary text-white hover:bg-primary-hover active:bg-primary-pressed max-[620px]:w-[100px] max-[620px]:h-8 max-[620px]:text-md-semibold">
          등록
        </button>
      </div>
    </div>
  );
}
