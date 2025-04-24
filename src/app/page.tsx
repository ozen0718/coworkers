import BoardComment from '@/components/Card/Comment/BoardComment';
import AddComment from '@/components/Card/Comment/AddComment';
import ImgUpload from '@/components/Card/ImgUpload';
import { BoardPost } from '@/components/Card/BoardPost';

export default function Home() {
  return (
    <div className="bg-bg300 min-h-screen p-10">
      <h1 className="text-xl-semibold text-blue">card Test Page</h1>
      <br />
      <BoardComment />
      <br />
      <AddComment />
      <br />
      <ImgUpload />

      <br />
      <BoardPost type="best" />
      <BoardPost type="general" />
    </div>
  );
}
