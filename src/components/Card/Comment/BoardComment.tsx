'use client';
import Image from 'next/image';
import AuthorInfo from './AuthorInfo';
import { useState } from 'react';
import PostDropdown from '../Post/PostDropdown';
import Button from '@/components/common/Button/Button';
import { TextAreaInput } from '@/components/common/Inputs';
import clsx from 'clsx';
import { BoardCommentProps } from '../CardType';
import { deleteComment, editComment } from '@/api/articles';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { getUserInfo } from '@/api/user';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { deleteDetailComment } from '@/api/detailPost';

export default function BoardComment({
  commentId,
  type,
  content,
  author,
  date,
  onChange,
  writer,
  taskId,
}: BoardCommentProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const id = params?.articleid;
  const [editedContent, setEditedContent] = useState(content);

  const queryClient = useQueryClient();

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  /* 사용자 정보 */
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  const isWriter = userInfo?.id === writer?.id;

  /* Dropdown 수정 */
  const handleEdit = () => {
    if (!isWriter) {
      toast.error('작성자만 수정할 수 있습니다');
      return;
    }
    setIsEditing(true);
    setEditedContent(content);
  };

  /* 댓글 삭제 */
  const handleDelete = async () => {
    if (!isWriter) {
      toast.error('작성자만 삭제할 수 있습니다');
      return;
    }

    if (type === 'list') {
      deleteDetailMutation.mutate();
    } else {
      deleteMutation.mutate();
    }
  };

  const deleteMutation = useMutation({
    mutationFn: () => deleteComment(commentId),
    onSuccess: () => {
      console.log('댓글 삭제 성공');
      onChange?.();
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    },
    onError: (err: AxiosError) => {
      console.error('댓글 삭제 실패:', err.response?.data);
    },
  });

  const deleteDetailMutation = useMutation({
    mutationFn: () => {
      console.log('🔥 deleteDetailComment 호출:', { taskId, commentId }); // ← 찍히는지 확인
      if (taskId === undefined) {
        throw new Error('taskId가 없습니다');
      }
      return deleteDetailComment(taskId, commentId);
    },
    onSuccess: () => {
      console.log('상세 카드 댓글 삭제 성공');
      onChange?.();
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
    onError: (err: AxiosError) => {
      console.error('상세 카드 댓글 삭제 실패:', err.response?.data);
    },
  });

  /* 댓글 수정*/
  const handleEditComment = async () => {
    if (!id || !editedContent) {
      return;
    }
    try {
      await editComment(commentId, { content: editedContent });
      console.log('댓글 수정 성공');
      setIsEditing(false);
      onChange?.();
    } catch (err) {
      const error = err as AxiosError;
      console.log('댓글 수정 에러', error.response?.data);
    }
  };

  /* 댓글 수정 취소 */
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div
      className={clsx(
        'bg-bg200 relative flex min-h-[81px] w-full max-w-[1200px] flex-col rounded-lg lg:h-[134px]',
        type === 'free' && 'flex-shrink-0 p-4'
      )}
    >
      <div className="text-lg-regular flex w-full items-start justify-between">
        {isEditing ? (
          <div
            className={clsx('relative flex h-full w-full items-start', type === 'list' && 'mt-3')}
          >
            <TextAreaInput
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              height="h-[65px]"
            />
          </div>
        ) : (
          <div
            className={clsx('relative flex w-full items-start', type === 'free' ? 'mt-0' : 'mt-4')}
          >
            <span className="scroll-area mr-2 block max-h-[50px] min-h-[40px] overflow-x-hidden overflow-y-auto pr-6 whitespace-pre-line">
              {content}
            </span>
            <Image
              className="absolute top-0 right-0 cursor-pointer"
              src="/icons/kebab.svg"
              alt="Kebab Icon"
              width={16}
              height={16}
              onClick={toggleDropdown}
            />
          </div>
        )}
      </div>

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
          toppercent="30%"
        />
      )}

      <div className="flex flex-grow flex-col justify-end">
        {isEditing ? (
          <div className="mt-3 ml-auto flex">
            <button
              onClick={handleCancel}
              className="text-gray500 h-[32px] w-[48px] bg-transparent text-sm font-semibold"
            >
              취소
            </button>
            <Button size="small" variant="inverse" onClick={handleEditComment}>
              수정하기
            </Button>
          </div>
        ) : (
          <AuthorInfo
            authorName={author}
            date={date?.split('T')[0]}
            type="detail"
            showDivider={type !== 'list'}
            showLike={type !== 'list'}
          />
        )}
      </div>
      {type === 'list' && <div className="mt-2 h-[1px] w-full bg-[#F8FAFC1A]"></div>}
    </div>
  );
}
