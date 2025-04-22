import Image from "next/image";

export default function BoardComment() {
  return (
    <div className="flex flex-col lg:w-[1200px] lg:h-[123px] bg-bg200 p-5">
      {/* 댓글 내용 + 아이콘 */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        댓글 영역입니다.
      </div>
    </div>
  );
}
