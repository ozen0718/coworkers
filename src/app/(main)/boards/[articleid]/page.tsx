'use client';
import Image from 'next/image';
import { useState } from 'react';
import PostDropdown from '@/components/Card/Post/PostDropdown';
import AuthorInfo from '@/components/Card/Comment/AuthorInfo';
import AddComment from '@/components/Card/Comment/AddComment';
import BoardComment from '@/components/Card/Comment/BoardComment';
import { comments, testPosts } from '@/components/Card/testPosts';

export default function ArticleDetail() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  /* Dropdown 수정 */
  const handleEdit = () => {
    console.log('수정 눌렀다.');
  };

  /* Dropdown 삭제 */
  const handleDelete = () => {
    console.log('삭제 눌렀다.');
  };

  return (
    <div className="text-gray300 flex flex-col items-center">
      <div className="w-full max-w-[1200px] px-4">
        {/* 타이틀 + 작성 정보 */}
        <div className="max-h-[128px] w-full flex-col">
          {/* 타이틀 영역 */}
          <div className="mt-10 flex w-full max-w-[1200px] items-center justify-between">
            <p className="text-2lg-medium flex font-bold">게시물 제목 영역입니다.</p>

            {/* 케밥 아이콘 + 드롭다운 */}
            <div className="relative">
              <Image
                className="cursor-pointer"
                src="/icons/kebab.svg"
                alt="Kebab Icon"
                width={16}
                height={16}
                onClick={toggleDropdown}
              />

              {isDropDownOpen && (
                <PostDropdown
                  type="kebab"
                  textJustify="center"
                  options={[
                    { label: '수정', action: handleEdit },
                    { label: '삭제', action: handleDelete },
                  ]}
                  isOpen={isDropDownOpen}
                  toggleDropdown={toggleDropdown}
                  toppercent="150%"
                />
              )}
            </div>
          </div>
          <div className="my-4 h-px w-full bg-[#F8FAFC1A]" />

          <AuthorInfo
            showDivider={true}
            showLike={true}
            showDate={true}
            showKebab={false}
            showComment={true}
          />
        </div>

        {/*본문 */}
        <div className="scroll-area mt-15 h-[72px] w-full overflow-y-auto font-normal sm:h-[104px]">
          본문이 들어가는 영역입니다.
        </div>

        {/* 댓글 달기 */}
        <div className="mt-10 w-full">
          <AddComment />
        </div>

        <div className="my-4 h-px w-full bg-[#F8FAFC1A]" />

        {/* 댓글 */}
        <div className="scroll-area mt-10 flex h-full max-h-[262px] flex-col gap-4 overflow-y-auto">
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((comment) => (
              <BoardComment
                key={comment.id}
                type="free"
                author={comment.author}
                content={comment.content}
                date={comment.date}
              />
            ))
          ) : (
            <p className="text-lg-medium text-gray400 mt-10 text-center">
              아직 작성된 댓글이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
