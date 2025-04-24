import BoardComment from '@/components/Card/Comment/BoardComment';
import AddComment from '@/components/Card/Comment/AddComment';

export default function Home() {
  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-xl-semibold text-blue">card Test Page</h1>
      <br />
      <BoardComment />
      <br />
      <AddComment />
    </div>
  );
}
