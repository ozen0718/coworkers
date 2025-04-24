import Image from 'next/image';
import { ReplyItemProps } from '@/types/inputtypes';
import Button from '@/components/common/Button/Button';

export function ReplyItem({ comment, profileImageUrl, name, date }: ReplyItemProps) {
  return (
    <div className="border-b-gray100/10 flex w-full flex-col gap-4 border border-x-0 border-t-0 py-4">
      <div className="flex w-full items-start justify-between">
        <p className="text-md-regular w-full">{comment}</p>
        <Image src="/icons/kebab.svg" alt="메뉴" width={16} height={16} />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={profileImageUrl || '/icons/initialprofile.svg'}
              alt="프로필 이미지"
              width={32}
              height={32}
            />
          </div>
          <p className="text-md-medium">{name}</p>
        </div>
        <p className="text-md-regular">{date}</p>
      </div>
    </div>
  );
}

export function EditReplyItem({ comment }: ReplyItemProps) {
  return (
    <div className="border-b-gray100/10 flex w-full flex-col gap-4 border border-x-0 border-t-0 py-4">
      <div className="flex w-full items-start justify-between">
        <p className="text-md-regular w-full">{comment}</p>
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        <button className="text-sm-semibold text-gray500 hover:bg-gray300 h-8 rounded-xl px-3 py-1.5">
          취소
        </button>
        <Button size="small" variant="inverse" className="hover:bg-primary-hover hover:text-white">
          수정하기
        </Button>
      </div>
    </div>
  );
}
