export type Comments = {
  id: number;
  author: string;
  content: string;
  date: string;
};

/* AuthorInfo - 사용자 정보 */
export type AuthorInfoProps = {
  type?: 'detail';
  showDivider?: boolean;
  showLike?: boolean;
  showDate?: boolean;
  authorName?: string;
  date?: string;
  showKebab?: boolean;
  showComment?: boolean;
};

/* BoardComment - 게시글 댓글 내용 */
export type BoardCommentProps = {
  type?: 'free' | 'list';
  author?: string;
  content?: string;
  date?: string;
};

/* PostCard - 게시글 */
export type PostCardProps = {
  id: number;
  type?: 'best' | 'general';
  size?: 'large' | 'medium' | 'small';
  title: string;
  imgUrl?: string;
  date?: string;
  showKebab?: boolean;
  topshowKebab?: boolean;
  onTitleClick?: () => void;
};

/* BestPost - 베스트 글 */
export type BestPostProps = {
  id: number;
  title: string;
  imgUrl: string;
  date: string;
};

/* GeneralPost - 일반 글 */
export type GeneralPostProps = {
  id: number;
  title: string;
  imgUrl: string;
  date: string;
};
