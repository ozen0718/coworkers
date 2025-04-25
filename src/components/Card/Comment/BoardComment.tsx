import Image from 'next/image';
import AuthorInfo from './AuthorInfo';

type BoardCommentProps = {
  type?: 'free' | 'list';
};

export default function BoardComment({ type }: BoardCommentProps) {
  return (
    <div className="bg-bg200 flex min-h-[113px] w-full max-w-[1200px] flex-col rounded-lg p-5 lg:h-[123px]">
      <div className="text-lg-regular flex w-full items-start justify-between">
        <div className="relative flex w-full items-start">
          <span className="scroll-area mr-2 block max-h-[50px] min-h-[40px] overflow-x-hidden overflow-y-auto pr-6">
            댓글 영역입니다.
          </span>
          <Image
            className="absolute top-0 right-0 cursor-pointer"
            src="/icons/kebab.svg"
            alt="Kebab Icon"
            width={16}
            height={16}
          />
        </div>
      </div>
      <div className="flex-grow">
        <AuthorInfo
          showDivider={type !== 'free'}
          showLike={type !== 'free'}
          profileSpacing="210px"
        />
      </div>
    </div>
  );
}
