'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Folder from '@/assets/icons/Folder';
import Done from '@/assets/icons/Done';
import Message from '@/assets/icons/Message';
import Repair from '@/assets/icons/Repair';

export default function Home() {
  const [topImageSrc, setTopImageSrc] = useState('/images/landing-top-large.png');
  const [bottomImageSrc, setBottomImageSrc] = useState('/images/landing-bottom-large.png');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setTopImageSrc('/images/landing-top-small.png');
        setBottomImageSrc('/images/landing-bottom-small.png');
      } else if (width <= 1024) {
        setTopImageSrc('/images/landing-top-medium.png');
        setBottomImageSrc('/images/landing-bottom-medium.png');
      } else {
        setTopImageSrc('/images/landing-top-large.png');
        setBottomImageSrc('/images/landing-bottom-large.png');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="mx-auto flex flex-col items-center">
      {/* 상단 영역 */}
      <div className="relative flex h-[640px] w-full flex-col items-center overflow-hidden md:h-[940px] lg:h-[1080px]">
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={topImageSrc}
            alt="랜딩 페이지 상단 이미지"
            fill
            className="object-cover"
            quality={100}
          />
        </div>

        {/* ✅ 텍스트 영역 등장 애니메이션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-[55px] flex flex-col items-center gap-3 md:mt-[100px] lg:mt-[84px]"
        >
          <div className="flex items-center gap-1">
            <span className="text-text-primary text-2xl font-semibold md:text-4xl md:font-medium lg:text-5xl">
              함께 만들어가는 투두 리스트
            </span>
            <div className="h-[24px] w-[24px] md:h-[48px] md:w-[48px]">
              <Repair />
            </div>
          </div>
          <span className="bg-gradient-primary bg-clip-text text-3xl font-semibold text-transparent md:text-5xl lg:text-6xl">
            Coworkers
          </span>
        </motion.div>

        {/* ✅ 버튼은 motion 없이 그대로 */}
        <button className="bg-gradient-primary text-text-inverse absolute bottom-[48px] h-[45px] w-[343px] rounded-[32px] text-lg font-bold md:bottom-[119px] md:w-[373px] lg:bottom-[120px] lg:w-[373px]">
          지금 시작하기
        </button>
      </div>

      {/* 기능 카드 1 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-primary mx-4 mb-6 h-[467px] w-[343px] rounded-[40px] p-[1px] md:mx-6 md:h-[354px] md:w-[696px] lg:mt-[60px] lg:mb-20 lg:h-[419px] lg:w-[996px]"
      >
        <div className="bg-bg300 relative h-full w-full rounded-[40px]">
          <div className="absolute bottom-[312px] left-[54px] flex flex-col gap-3 md:bottom-[120px] md:left-[450px] lg:bottom-[152px] lg:left-[600px]">
            <div className="bg-bg200 border-border flex h-[48px] w-[48px] items-center justify-center rounded-[12px] border">
              <Folder />
            </div>
            <span className="text-text-inverse text-lg font-medium md:text-2xl">
              그룹으로
              <br />할 일을 관리해요
            </span>
          </div>
          <Image
            src="/images/landing-section1.png"
            alt="랜딩 섹션 1"
            width={235}
            height={273}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-[200px] lg:left-[300px] lg:h-[338px] lg:w-[291px]"
          />
        </div>
      </motion.div>

      {/* 기능 카드 2 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="bg-bg200 relative mx-4 mb-6 h-[467px] w-[343px] rounded-[40px] md:mx-6 md:h-[354px] md:w-[696px] lg:mb-20 lg:h-[419px] lg:w-[996px]"
      >
        <Image
          src="/images/landing-section2.png"
          alt="랜딩 섹션 2"
          width={235}
          height={273}
          className="absolute top-0 left-1/2 -translate-x-1/2 md:top-0 md:left-[480px] lg:left-[680px] lg:h-[338px] lg:w-[291px]"
        />
        <div className="absolute bottom-[52px] left-[54px] flex flex-col gap-3 md:bottom-[120px] md:left-[121px] md:items-end lg:bottom-[152px] lg:left-[165px]">
          <div className="bg-bg200 border-border flex h-[48px] w-[48px] items-center justify-center rounded-[12px] border">
            <Message />
          </div>
          <div className="md:text-right lg:text-right">
            <span className="text-text-inverse text-lg font-medium md:text-2xl">
              간단하게 멤버들을
              <br />
              초대해요
            </span>
          </div>
        </div>
      </motion.div>

      {/* 기능 카드 3 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="bg-bg400 relative mx-4 h-[467px] w-[343px] rounded-[40px] md:mx-6 md:h-[354px] md:w-[696px] lg:h-[419px] lg:w-[996px]"
      >
        <Image
          src="/images/landing-section3.png"
          alt="랜딩 섹션 3"
          width={235}
          height={274}
          className="absolute top-0 left-1/2 -translate-x-1/2 md:left-[200px] lg:top-0 lg:left-[300px] lg:h-[338px] lg:w-[291px]"
        />
        <div className="absolute bottom-[52px] left-[54px] flex flex-col gap-3 md:bottom-[120px] md:left-[450px] lg:bottom-[152px] lg:left-[600px]">
          <div className="bg-bg200 border-border flex h-[48px] w-[48px] items-center justify-center rounded-[12px] border">
            <Done />
          </div>
          <div>
            <span className="text-text-inverse text-lg font-medium lg:text-2xl">
              할 일도 간편하게
              <br />
              체크해요
            </span>
          </div>
        </div>
      </motion.div>

      {/* 하단 영역 */}
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
    </div>
  );
}
