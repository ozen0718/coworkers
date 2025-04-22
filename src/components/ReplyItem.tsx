import Image from "next/image";
import { ReplyItemProps } from "@/types/inputtypes";

export function ReplyItem({
  comment,
  profileImageUrl,
  name,
  date,
}: ReplyItemProps) {
  return (
    <div className="w-full py-4 flex flex-col gap-4 border border-x-0 border-t-0 border-b-gray100/10">
      <div className="w-full flex items-start justify-between">
        <p className="w-full">{comment}</p>
        <Image src="/icons/kebab.svg" alt="메뉴" width={16} height={16} />
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={profileImageUrl || "/icons/initialprofile.svg"}
              alt="프로필 이미지"
              width={32}
              height={32}
            />
          </div>
          <p className="text-md-medium">{name}</p>
        </div>
        <p>{date}</p>
      </div>
    </div>
  );
}

export function EditReplyItem({ comment }: ReplyItemProps) {
  return (
    <div className="w-full py-4 flex flex-col gap-4 border border-x-0 border-t-0 border-b-gray100/10">
      <div className="w-full flex items-start justify-between">
        <p className="w-full">{comment}</p>
      </div>
      <div className="w-full flex items-center justify-between">
        <button></button>
        <button></button>
      </div>
    </div>
  );
}
