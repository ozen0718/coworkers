import Image from "next/image";
import Link from "next/link";

interface GroupOptionProps {
  group: {
    teamId: string;
    updatedAt: string;
    createdAt: string;
    image: string;
    name: string;
    id: number;
  };
}

export default function DropDownGroupsItem({ group }: GroupOptionProps) {
  const { name, image, id } = group;

  return (
    <div className="hover:bg-bg100 flex w-[186px] cursor-pointer items-center justify-between rounded-lg px-2 py-[7px]">
      <Link
        href={`/${id}`}
        className="text-lg-md text-gray400 flex items-center gap-3"
      >
        {/* ✅ image가 없으면 렌더링하지 않도록 수정 */}
        {image && (
          <Image
            src={image}
            width={32}
            height={32}
            alt="팀 이미지"
            className="rounded-md w-[32px] h-[32px] object-cover"
          />
        )}
        <p className="w-[110px] truncate">{name}</p>
      </Link>
      <Link href={`/${id}/edit`}>
        <Image width={16} height={16} src="/icons/kebab.svg" alt=":" />
      </Link>
    </div>
  );
}
