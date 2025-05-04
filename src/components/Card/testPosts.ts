import { Comments } from './CardType';

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
    title: '세 번째 게시글',
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
];
