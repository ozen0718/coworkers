// page.tsx

import BoardComment from '@/components/Card/Comment/BoardComment';
import AddComment from '@/components/Card/Comment/AddComment';
import ImgUpload from '@/components/Card/ImgUpload';

import { BestPost } from '@/components/Card/Post/BestPost';
import { GeneralPost } from '@/components/Card/Post/GeneralPost';

import { DateInfo } from '@/components/Card/Post/Deatil/DateInfo';

import AuthorInfo from '@/components/Card/Comment/AuthorInfo';

import { TodoCardReplyInput } from '@/components/common/Inputs';

export default function Home() {
  return (
    <div className="bg-bg300 min-h-screen p-10">
      <h1 className="text-xl-semibold text-blue">상세 카드 모달 컴포넌트</h1>
      <br />
      <DateInfo date="2025-04-25T00:00:00Z" time="15:30" repeatinfo="DAILY" />
      <br />
      <br />

      <AuthorInfo showLike={false} showDivider={false} />
      <br />
      <br />
      <TodoCardReplyInput />
      <br />
      <BoardComment type="free" />
      <br />
      <BoardComment type="list" />
    </div>
  );
}
