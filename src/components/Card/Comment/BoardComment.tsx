'use client';
import Image from 'next/image';
import AuthorInfo from './AuthorInfo';
import { useState } from 'react';
import PostDropdown from '../Post/PostDropdown';
import Button from '@/components/common/Button/Button';
import { TextAreaInput } from '@/components/common/Inputs';
import clsx from 'clsx';
import { BoardCommentProps } from '../CardType';
import { deleteComment, editComment, fetchComment } from '@/app/api/articles';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

export default function BoardComment({
  commentId,
  type,
  content,
  author,
  date,
  onChange,
}: BoardCommentProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const id = params?.articleid;
  const token = useAuthStore((state) => state.accessToken);
  const [editedContent, setEditedContent] = useState(content);

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  /* Dropdown 수정 */
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(content);
  };

  /* 댓글 삭제 */
  const handleDelete = async () => {
    if (!id || !token) {
      console.log('토큰이나 아이디 없음');
      return;
    }

    try {
      await deleteComment(commentId);
      console.log('댓글 삭제 성공');
      onChange?.();
    } catch (err) {
      const error = err as AxiosError;
      console.error('댓글 삭제 에러:', error.response?.data);
    }
  };

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
          <div className="relative flex h-full w-full items-start">
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
            <span className="scroll-area mr-2 block max-h-[50px] min-h-[40px] overflow-x-hidden overflow-y-auto pr-6">
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
