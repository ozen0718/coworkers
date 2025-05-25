'use client';
import Image from 'next/image';
import { useState } from 'react';
import PostDropdown from '@/components/Card/Post/PostDropdown';
import AuthorInfo from '@/components/Card/Comment/AuthorInfo';
import AddComment from '@/components/Card/Comment/AddComment';
import BoardComment from '@/components/Card/Comment/BoardComment';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { DetailComments } from '@/components/Card/CardType';
import { deleteArticle, fetchArticle, fetchComment } from '@/api/articles';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { getUserInfo } from '@/api/user';
import { toast } from 'react-toastify';

export default function ArticleDetail() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params?.articleid;

  const queryClient = useQueryClient();

  const handleArticleChanged = () => {
    queryClient.invalidateQueries({ queryKey: ['article', id] });
  };

  const handleCommentChanged = () => {
    queryClient.invalidateQueries({ queryKey: ['comments', id] });
  };

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  /* 사용자 정보 */
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  /* 게시글 */
  const { data: postData } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticle(Number(id)),
    enabled: !!id,
  });

  /* 댓글 */
  const { data: commentData } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => fetchComment(Number(id)),
    enabled: !!id,
  });

  /* 게시글 삭제 */
  const isWriter = userInfo?.id === Number(postData?.data.writer?.id);

  const handleDelete = async () => {
    if (!isWriter) {
      toast.error('작성자만 삭제할 수 있습니다');
      return;
    }
    deleteMutate();
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () => deleteArticle(Number(id)),
    onSuccess: () => {
      router.push('/boards');
    },
    onError: (err: AxiosError) => {
      console.error('게시글 삭제 에러:', err.response?.data);
    },
  });

  /* 게시글 수정 */
  const handleEdit = () => {
    if (!isWriter) {
      toast.error('작성자만 수정할 수 있습니다');
      return;
    }
    router.push(`/boards/${id}/edit`);
  };

  return (
    <div className="text-gray300 my-16 flex flex-col md:my-20">
      {/* 타이틀 + 작성 정보 */}
      <div className="max-h-[128px] flex-col">
        {/* 타이틀 영역 */}
        <div className="flex items-center justify-between">
          <p className="text-2lg-medium flex font-bold">{postData?.data.title}</p>

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
          authorName={postData?.data.writer?.nickname}
          date={postData?.data.createdAt}
          commentCount={postData?.data.commentCount}
          likeCount={postData?.data.likeCount}
          isLiked={postData?.data.isLiked}
          articleId={postData?.data.id}
          onLikeChanged={handleArticleChanged}
        />
      </div>

      {/*본문 */}
      <div className="scroll-area mt-10 flex h-[72px] w-full justify-between overflow-y-auto font-normal whitespace-pre-line sm:h-[104px]">
        {postData?.data.content}
        {postData?.data.image ? (
          <Image
            className="aspect-square min-w-[104px] rounded-lg object-cover"
            src={postData?.data.image}
            alt="게시글 이미지"
            width={104}
            height={104}
            sizes="(max-width: 600px) 50vw, 72px"
          />
        ) : (
          <></>
        )}
      </div>

      {/* 댓글 달기 */}
      <div className="mt-10 w-full">
        <AddComment
          articleId={Number(id)}
          onSuccess={() => {
            handleCommentChanged();
            handleArticleChanged();
          }}
        />
      </div>

      <div className="my-4 h-px w-full bg-[#F8FAFC1A]" />

      {/* 댓글 */}
      <div className="scroll-area mt-10 flex h-[350px] flex-col gap-4 overflow-y-auto whitespace-pre-line">
        {commentData?.data.list?.length > 0 ? (
          commentData?.data.list.map((comment: DetailComments) => (
            <BoardComment
              key={comment.id}
              commentId={comment.id}
              type="free"
              author={comment.writer.nickname}
              content={comment.content}
              date={comment.createdAt}
              onChange={() => {
                handleCommentChanged();
                handleArticleChanged();
              }}
              writer={{ id: comment.writer.id }}
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
