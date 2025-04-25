'use client';
import Image from 'next/image';
import AuthorInfo from '../../Comment/AuthorInfo';
import { useState, useEffect } from 'react';
import PostDropdown from '../PostDropdown';
import Button from '@/components/common/Button/Button';
import { TextAreaInput } from '@/components/common/Inputs';

export default function DetailPost() {
  return (
    <div className="bg-bg200 relative flex min-h-[113px] w-full max-w-[1200px] flex-col rounded-lg p-5 lg:h-[123px]">
      <div className="text-lg-regular flex w-full items-start justify-between"> 디텡리</div>
    </div>
  );
}
