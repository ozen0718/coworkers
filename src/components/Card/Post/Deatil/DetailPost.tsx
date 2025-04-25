'use client';
import Image from 'next/image';
import AuthorInfo from '../../Comment/AuthorInfo';
import { useState, useEffect } from 'react';
import PostDropdown from '../PostDropdown';
import Button from '@/components/common/Button/Button';
import { TextAreaInput } from '@/components/common/Inputs';
import IconDelete from '@/assets/icons/IconDelete';
import IconCheck from '@/assets/icons/IconCheck';

type DetailPostProps = {
  title: string;
};

export default function DetailPost({ title }: DetailPostProps) {
  return (
    <div className="bg-bg200 relative flex h-[698px] max-h-[1019px] min-h-[698px] w-full max-w-[779px] flex-col gap-[10px] p-5 md:h-[1073px] lg:h-[1019px]">
      <div className="text-lg-regular flex w-full items-start justify-between">
        {' '}
        <IconDelete />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <IconCheck color="#a3e635" />
          <p className="text-tertiary text-xs font-medium">완료</p>
        </div>
        <div className="text-xl-bold mt-2 flex items-center">
          {title}
          <Image
            className="ml-auto flex h-[24px] min-h-[21px] max-w-[699px] cursor-pointer"
            src="/icons/kebab.svg"
            alt="Kebab Icon"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
}
