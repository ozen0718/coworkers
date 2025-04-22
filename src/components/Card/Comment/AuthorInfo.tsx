import Image from "next/image";

export default function AuthorInfo() {
  return (
    <div className="flex flex-col w-full lg:w-[311px] lg:h-[32px] bg-bg200 p-5 rounded-lg ">
      <div className="flex justify-between items-center w-full text-xs">
        <Image
          src="/icons/profile-member-lg"
          alt="프로필 사진"
          width={32}
          height={32}
        />
        <span className="block max-h-[45px] overflow-y-auto overflow-x-hidden scroll-area">
          우지은
        </span>

        <span>날짜</span>
      </div>
    </div>
  );
}
