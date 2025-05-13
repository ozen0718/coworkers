'use client';
import Image from 'next/image';
import { useState } from 'react';
import PostDropdown from '@/components/Card/Post/PostDropdown';
import AuthorInfo from '@/components/Card/Comment/AuthorInfo';
import AddComment from '@/components/Card/Comment/AddComment';
import BoardComment from '@/components/Card/Comment/BoardComment';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { PostDetail } from '@/components/Card/CardType';
import { DetailComments } from '@/components/Card/CardType';
import { deleteArticle, fetchArticle, fetchComment } from '@/app/api/articles';
import { useRouter } from 'next/navigation';

export default function ArticleDetail() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params?.articleid;
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  const [detailPost, setPostDetail] = useState<PostDetail>({
    title: '',
    content: '',
  });
  const [comments, setComments] = useState<DetailComments[]>([]);

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!id) return;

    fetchPostData();
    fetchComments();
  }, [id]);

  /* 게시글 수정 */
  const handleEdit = () => {
    router.push(`/boards/${id}/edit`);
  };

  /* 게시글 삭제 */
  const handleDelete = async () => {
    if (!id || !token) {
      console.log('토큰이나 아이디 없음');
      return;
    }

    try {
      await deleteArticle(Number(id), token);
      console.log('댓글 삭제 성공');
      router.push('/boards');
    } catch (err) {
      const error = err as AxiosError;
      console.error('댓글 삭제 에러:', error.response?.data);
    }
  };

  /* 게시글 */
  const fetchPostData = async () => {
    try {
      const response = await fetchArticle(Number(id), token!);
      setPostDetail(response.data);
    } catch (err) {
      const error = err as AxiosError;
      console.error('글 불러오기 에러:', error.response?.data);
    }
  };

  /* 댓글 */
  const fetchComments = async () => {
    try {
      const response = await fetchComment(Number(id), token!);
      setComments(response.data.list);
    } catch (err) {
      const error = err as AxiosError;
      console.error('댓글 불러오기 에러:', error.response?.data);
    }
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
          articleId={detailPost.id}
        />
      </div>

      {/*본문 */}
      <div className="scroll-area mt-15 h-[72px] w-full overflow-y-auto font-normal sm:h-[104px]">
        {detailPost.content}
      </div>

      {/* 댓글 달기 */}
      <div className="mt-10 w-full">
        <AddComment articleId={Number(id)} onSuccess={fetchComments} />
      </div>

      <div className="my-4 h-px w-full bg-[#F8FAFC1A]" />

      {/* 댓글 */}
      <div className="scroll-area mt-10 flex h-[350px] flex-col gap-4 overflow-y-auto whitespace-pre-line">
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <BoardComment
              key={comment.id}
              commentId={comment.id}
              type="free"
              author={comment.writer.nickname}
              content={comment.content}
              date={comment.createdAt}
              onDelete={fetchComments} // 삭제 후 댓글 목록 갱신
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
