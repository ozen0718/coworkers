import Button from "@/components/Button/Button";

export default function AddComment() {
  return (
    <div className="flex flex-col w-full lg:w-[1200px] lg:h-[216px] min-h-[113px] bg-bg200 p-5 rounded-lg">
      <div className="flex justify-between items-start w-full text-lg-regular">
        댓글달기
      </div>
      <div className="flex items-start w-full relative">
        댓글 입력 텍스트에리아
      </div>
    </div>
  );
}
