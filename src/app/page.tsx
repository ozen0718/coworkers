// page.tsx

import BoardComment from '@/components/Card/Comment/BoardComment';
import AddComment from '@/components/Card/Comment/AddComment';
import PostCard from '@/components/Card/Post/PostCard';
import ImgUpload from '@/components/Card/ImgUpload';

import { BestPost } from '@/components/Card/Post/BestPost';
import { GeneralPost } from '@/components/Card/Post/GeneralPost';

import { DateInfo } from '@/components/Card/Post/Deatil/DateInfo';

import AuthorInfo from '@/components/Card/Comment/AuthorInfo';

import { TodoCardReplyInput } from '@/components/common/Inputs';

import { TextAreaInput } from '@/components/common/Inputs';

import Button from '@/components/common/Button/Button';

import DetailPost from '@/components/Card/Post/Deatil/DetailPost';

export default function Home() {
  return (
    <div className="bg-bg300 min-h-screen p-10">
      <GeneralPost />
      <br />
      <br />
      <PostCard title={'안녕'} />
      <ImgUpload />
      <h1 className="text-xl-semibold text-blue">상세 카드 모달 컴포넌트</h1>
      <br />
      <DateInfo date="2025-04-25T00:00:00Z" time="15:30" repeatinfo="DAILY" />
      <br />
      <br />
      <div className="max-w-[699px]">
        <AuthorInfo showLike={false} showDivider={false} />
        <br />
        <TodoCardReplyInput />
      </div>
      <br />
      <TextAreaInput />
      <br />
      <br />
      <BoardComment type="free" />
      <br />
      <BoardComment type="list" />
      <br />
      <Button size="small" variant="inverse">
        생성하기
      </Button>
      <br />
      <br /> <br />
      <br />
      <DetailPost title={'법인 설립 비용 안내 드리기'} showComplete={false} />
    </div>
  );
}
