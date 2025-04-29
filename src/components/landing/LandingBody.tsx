'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Folder from '@/assets/icons/Folder';
import Done from '@/assets/icons/Done';
import Message from '@/assets/icons/Message';

export default function LandingBody() {
  return (
    <>
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
    </>
  );
}
