import { Comments } from './CardType';
import { BoardCommentProps } from './CardType';

export const testPosts = [
  {
    id: 1,
    title: '첫 번째 게시글',
    imgUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1855/testimage.jpg',
    date: '2024-05-01',
  },
  {
    id: 2,
    title: '두 번째 게시글',
    imgUrl: '',
    date: '2024-05-02',
  },
  {
    id: 3,
    title: '세 번째 게시글',
    imgUrl: '',
    date: '2024-05-03',
  },
  {
    id: 4,
    title: '4 번째 게시글',
    imgUrl: '',
    date: '2024-05-03',
  },
  {
    id: 5,
    title: '5 번째 게시글',
    imgUrl: '',
    date: '2024-05-03',
  },
  {
    id: 6,
    title: '6 번째 게시글',
    imgUrl: '',
    date: '2024-05-03',
  },
  {
    id: 7,
    title: '7 번째 게시글',
    imgUrl: '',
    date: '2024-05-03',
  },
  {
    id: 8,
    title: '8 번째 게시글',
    imgUrl: '',
    date: '2024-05-03',
  },
];

export const comments: Comments[] = [
  {
    id: 1,
    author: '우지은',
    content: '첫번째 댓글 영역입니다.',
    date: '2025-04-30',
  },
  {
    id: 2,
    author: '홍길동',
    content: '두번째 댓글 영역입니다.',
    date: '2025-04-29',
  },
  {
    id: 3,
    author: '홍길동',
    content: '두번째 댓글 영역입니다.',
    date: '2025-04-29',
  },
];

export const testComments: BoardCommentProps[] = [
  {
    author: '우지은1',
    content: '댓글1',
    date: '2024.07.25',
  },
  {
    author: '우지은2',
    content: '댓글2',
    date: '2024.07.24',
  },
  {
    author: '우지은3',
    content: '댓글3',
    date: '2024.07.23',
  },
];
