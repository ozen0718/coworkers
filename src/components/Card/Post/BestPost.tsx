import PostCard from './PostCard';
import { BestPostProps } from '../CardType';

export function BestPost({ id, title, image, date }: BestPostProps) {
  return (
    <div className="w-full">
      <PostCard type="best" title={title} image={image} date={date} id={id} />
    </div>
  );
}
