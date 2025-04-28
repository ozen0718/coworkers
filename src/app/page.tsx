// page.tsx

'use client';
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

import { useState } from 'react';
import DetailPost from '@/components/Card/Post/Deatil/DetailPost';
import SlideWrapper from '@/components/Card/SlideWrapper';

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-bg300 min-h-screen p-10">
      <br />
      <br />
      <button onClick={() => setOpen(true)} className="text-balck bg-blue h-[50px] w-[120px]">
        클릭
      </button>
      <SlideWrapper isOpen={open} onClose={() => setOpen(false)}>
        <DetailPost title="법인 설립 서비스 설명" onClose={() => setOpen(false)} />
      </SlideWrapper>
      <br />
      <br />
      <h1>free BoardComment</h1>
      <BoardComment type="free" />
      <br />
      <br /> <br />
      <br />
    </div>
  );
}
