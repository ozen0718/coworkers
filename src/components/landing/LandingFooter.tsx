'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface LandingFooterProps {
  bottomImageSrc: string;
}

export default function LandingFooter({ bottomImageSrc }: LandingFooterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative flex h-[431px] w-full flex-col items-center overflow-x-hidden md:h-[675px] lg:h-[1080px]"
    >
      <div className="absolute top-[100px] md:top-[176px] lg:top-[230px]">
        <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-6">
          <span className="text-text-inverse text-2xl font-medium md:text-4xl lg:text-4xl">
            지금 바로 시작해보세요
          </span>
          <span className="text-text-inverse text-center text-base font-medium md:text-2xl lg:text-2xl">
            팀원 모두와 같은 방향, <br className="md:hidden lg:hidden" />
            같은 속도로 나아가는 가장 쉬운 방법
          </span>
        </div>
      </div>
      <div className="relative flex h-full w-full overflow-hidden">
        <Image
          src={bottomImageSrc}
          alt="랜딩 페이지 하단 이미지"
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </motion.div>
  );
}
