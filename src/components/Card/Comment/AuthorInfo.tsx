import Image from "next/image";

export default function AuthorInfo() {
  return (
    <div className="flex items-center w-full text-xs space-x-[6px] mt-3 justify-between">
      <div className="flex items-center space-x-[6px]">
        <Image
          src="/icons/profile-member-lg.svg"
          alt="프로필 사진"
          width={32}
          height={32}
        />
        <span className="block">우지은</span>
        <div className="border-l-2 border-slate-700 h-[12px]"></div>
        <span className="text-gray400">2024.07.25</span>
      </div>
      <div className="flex space-x-[6px]">
        <Image
          className="cursor-pointer"
          src="/icons/heart.svg"
          alt="좋아요"
          width={16}
          height={16}
        />
        <span className="text-gray400">9999+</span>
      </div>
    </div>
  );
}
