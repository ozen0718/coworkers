import PostCard from './PostCard';
import { BestPostProps } from '../CardType';

export function BestPost({ id, title, image, createdAt, likeCount, writer }: BestPostProps) {
  return (
    <div className="w-full">
      <PostCard
        type="best"
        title={title}
        image={image}
        date={createdAt?.split('T')[0]}
        id={id}
        likeCount={likeCount}
        writer={writer}
      />
    </div>
  );
}
