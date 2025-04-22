import Kebab from "@/assets/icons/kebab";

export default function BoardComment() {
  return (
    <div className="flex flex-col lg:w-[1200px] lg:h-[123px] bg-bg200 p-5 rounded-lg ">
      {/* 댓글 내용 + 아이콘 */}

      <div className="flex justify-between items-center w-full text-base">
        <span className="truncate">댓글 영역입니다.</span>
        <Kebab width={16} height={16} color="#64748B" />
      </div>
    </div>
  );
}
