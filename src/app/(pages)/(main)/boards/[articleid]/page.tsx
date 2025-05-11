'use client';
import Image from 'next/image';
import { useState } from 'react';
import PostDropdown from '@/components/Card/Post/PostDropdown';
import AuthorInfo from '@/components/Card/Comment/AuthorInfo';
import AddComment from '@/components/Card/Comment/AddComment';
import BoardComment from '@/components/Card/Comment/BoardComment';
import { comments } from '@/components/Card/testPosts';
import { useEffect } from 'react';
import axiosInstance from '@/app/api/axiosInstance';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { PostDetail } from '@/components/Card/CardType';

export default function ArticleDetail() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  const [detailPost, setPostDetail] = useState<PostDetail>({
    title: '',
    content: '',
  });

  const params = useParams();
  const id = params?.articleid;

  /* 일반 글 */
  useEffect(() => {
    if (!id) return;

    const fetchPostData = async () => {
      try {
        const response = await axiosInstance.get(`/13-4/articles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPostDetail(response.data);
      } catch (err) {
        const error = err as AxiosError;
        console.error('글 불러오기 에러:', error.response?.data);
      }
    };

    fetchPostData();
  }, [id]);

  /* Dropdown 수정 */
  const handleEdit = () => {
    console.log('수정 눌렀다.');
  };

  /* Dropdown 삭제 */
  const handleDelete = () => {
    console.log('삭제 눌렀다.');
  };

  return (
    <div className="text-gray300 my-16 flex flex-col md:my-20">
      {/* 타이틀 + 작성 정보 */}
      <div className="max-h-[128px] flex-col">
        {/* 타이틀 영역 */}
        <div className="flex items-center justify-between">
          <p className="text-2lg-medium flex font-bold">{detailPost.title}</p>

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
                  { label: '수정', value: '수정', action: handleEdit },
                  { label: '삭제', value: '삭제', action: handleDelete },
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
          authorName={detailPost.writer?.nickname}
          date={detailPost.createdAt}
          commentCount={detailPost.commentCount}
          likeCount={detailPost.likeCount}
        />
      </div>

      {/*본문 */}
      <div className="scroll-area mt-15 h-[72px] w-full overflow-y-auto font-normal sm:h-[104px]">
        {detailPost.content}
      </div>

      {/* 댓글 달기 */}
      <div className="mt-10 w-full">
        <AddComment />
      </div>

      <div className="my-4 h-px w-full bg-[#F8FAFC1A]" />

      {/* 댓글 */}
      <div className="scroll-area mt-10 flex h-[350px] flex-col gap-4 overflow-y-auto">
        {comments?.length > 0 ? (
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
  );
}
