import Button from "@/components/Button/Button";

export default function AddComment() {
  return (
    <div className="flex flex-col w-full lg:w-[1200px] lg:h-[216px] min-h-[113px] bg-trasparent p-5 rounded-lg bg-black">
      <div className="flex justify-between items-start w-full text-xl-bold text-gray100">
        댓글달기
      </div>
      <div className="mt-6 bg-bg200 flex items-start w-full relative">
        댓글 입력 텍스트에리아
      </div>
      <div>
        {" "}
        <Button size="large" />
        버튼
      </div>
    </div>
  );
}
