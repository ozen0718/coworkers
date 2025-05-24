export type Comments = {
  id: number;
  content: string;
  wirterId?: number;
  author: string;
  date: string;
};

export type DetailComments = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  writer: {
    id: number;
    nickname: string;
    image?: string | null;
  };
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
  createdAt?: string;
  likeCount?: number;
  commentCount?: number;
  articleId?: number;
  isLiked?: boolean;
  onLikeChanged?: () => void;
};

/* BoardComment - 게시글 댓글 내용 */
export type BoardCommentProps = {
  id?: string;
  groupId?: string;
  tasklistId?: string;
  type?: 'free' | 'list';
  author?: string;
  content?: string;
  date?: string;
  commentId: number;
  taskId?: number;
  onChange?: () => void;
  writer?: {
    id: number;
  };
};

/* PostCard - 게시글 */
export type PostCardProps = {
  id: number;
  type?: 'best' | 'general';
  size?: 'large' | 'medium' | 'small';
  title: string;
  image?: string;
  date?: string;
  showKebab?: boolean;
  topshowKebab?: boolean;
  onTitleClick?: () => void;
  likeCount?: number;
  writer?: {
    id: number;
    nickname: string;
  };
};

/* BestPost - 베스트 글 */
export type BestPostProps = {
  id: number;
  title: string;
  image: string;
  createdAt?: string;
  likeCount?: number;
  isLiked: boolean;
  writer?: {
    id: number;
    nickname: string;
  };
};

/* GeneralPost - 일반 글 */
export type GeneralPostProps = {
  id: number;
  title: string;
  image: string;
  createdAt?: string;
  likeCount?: number;
  writer?: {
    id: number;
    nickname: string;
  };
};

export type PostDetail = {
  id?: number;
  title: string;
  content: string;
  image?: string | null;
  createdAt?: string;
  updatedAt?: string;
  commentCount?: number;
  likeCount?: number;
  isLiked?: boolean;
  writer?: {
    id: number;
    nickname: string;
  };
};

/* 상세 카드 - 댓글 */
export type CommentDetail = {
  id: number;
  content?: string;
  taskId?: number;
  userId?: number;
  commentId?: number;
  createdAt?: string;
  user?: {
    id: number;
    nickname: string;
    image: string | null;
  };
};
