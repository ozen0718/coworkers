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
      <br />
      <br />
      <h1>free BoardComment</h1>
      <BoardComment type="free" />
      <br />
      <br /> <br />
      <br />
      <DetailPost title={'법인 설립 비용 안내 드리기'} showComplete={false} />
    </div>
  );
}
