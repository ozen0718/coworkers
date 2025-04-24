'use client';

import Image from 'next/image';

export interface BoardPostProps {
  type: 'best' | 'general';
}

export function BestPost() {
  return <div className="max-h-[220px] max-w-[387px] rounded-xl">나는 베스트 </div>;
}

export function GeneralPost() {
  return <div>나는 일반글</div>;
}

export function BoardPost({ type }: BoardPostProps) {
  return <div>{type === 'best' ? <BestPost /> : <GeneralPost />}</div>;
}
