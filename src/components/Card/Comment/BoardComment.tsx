import Image from "next/image";

export default function BoardComment() {
  return (
    <div className="flex flex-col w-full lg:w-[1200px] lg:h-[123px] min-h-[113px] bg-bg200 p-5 rounded-lg">
      {/* 댓글 내용 + 아이콘 */}

      <div className="flex justify-between items-start w-full text-base">
        <div className="flex items-start">
          {/* 텍스트 내용 */}
          <span className="block max-h-[45px] overflow-y-auto overflow-x-hidden scroll-area mr-2">
            댓글 영역입니다. 댓글 영역입니다. 댓글 영역입니다. 댓글 영역입니다.
            ee 댓글 영역입니다. 댓글 영역입니다. 댓글 영역입니다. 댓글
            영역입니다. ee 댓글 영역입니다. 댓글 영역입니다. 댓글 영역입니다.
            댓글 영역입니다. ee
          </span>
          {/* 이미지 */}
          <Image
            className="flex items-start cursor-pointer"
            src="/icons/kebab-sm.svg"
            alt="Kebab Icon"
            width={16}
            height={16}
          />
        </div>
      </div>
    </div>
  );
}
