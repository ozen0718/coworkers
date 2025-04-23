import Image from "next/image";
import AuthorInfo from "./AuthorInfo";

export default function BoardComment() {
  return (
    <div className="flex flex-col w-full lg:w-[1200px] lg:h-[123px] min-h-[113px] bg-bg200 p-5 rounded-lg">
      <div className="flex justify-between items-start w-full text-lg-regular">
        <div className="flex items-start w-full relative">
          <span className="block min-h-[40px] max-h-[50px] overflow-y-auto overflow-x-hidden scroll-area mr-2 pr-6">
            댓글 영역입니다.
          </span>
          <Image
            className="absolute right-0 top-0 cursor-pointer"
            src="/icons/kebab.svg"
            alt="Kebab Icon"
            width={16}
            height={16}
          />
        </div>
      </div>
      <div className="flex-grow">
        <AuthorInfo />
      </div>
    </div>
  );
}
