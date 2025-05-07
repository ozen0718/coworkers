import PostCard from './PostCard';

/**
 * title="자유게시판에 질문을 올릴 수 있어요 질문을 올려볼까요?"
 * imgUrl="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1855/testimage.jpg"
 * date="2024.07.25"
 */

type BestPostProps = {
  title: string;
  imgUrl: string;
  date: string;
};

export function BestPost({ title, imgUrl, date }: BestPostProps) {
  return <PostCard type="best" title={title} imgUrl={imgUrl} date={date} />;
}
