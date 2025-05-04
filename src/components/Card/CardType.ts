export type Comments = {
  id: number;
  author: string;
  content: string;
  date: string;
};

/* AuthorInfo - 사용자 정보 */
export type AuthorInfoProps = {
  showDivider?: boolean;
  showLike?: boolean;
  showDate?: boolean;
  authorName?: string;
  date?: string;
  showKebab?: boolean;
  showComment?: boolean;
};

/* BoardComment - 댓글 내용 */
export type BoardCommentProps = {
  type?: 'free' | 'list';
  author?: string;
  content?: string;
  date?: string;
};

/* PostCard : 게시글 */
export type PostCardProps = {
  type?: 'best' | 'general';
  size?: 'large' | 'medium' | 'small';
  title: string;
  imgUrl?: string;
  date?: string;
  showKebab?: boolean;
  topshowKebab?: boolean;
};
