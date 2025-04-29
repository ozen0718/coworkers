'use client';

import { motion } from 'framer-motion';

export default function LandingFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
      className="bg-landing-bottom-small tablet:h-[940px] tablet:bg-landing-bottom-medium xl:bg-landing-bottom-large flex h-[640px] w-full flex-col items-center bg-center bg-no-repeat xl:h-[1080px]"
    >
      <div className="tablet:mt-[176px] tablet:gap-[24px] mt-[123px] flex flex-col items-center gap-[16px] xl:mt-[130px]">
        <div className="flex gap-[24px]">
          <span className="text-2xl-semibold tablet:text-4xl text-[var(--color-gray100)]">
            지금 바로 시작해보세요
          </span>
        </div>
        <div className="text-md-medium tablet:text-2xl-medium text-center text-[var(--color-gray100)]">
          팀원 모두와 같은 방향,
          <span className="tablet:inline block" />
          같은 속도로 나아가는 가장 쉬운 방법
        </div>
      </div>
    </motion.div>
  );
}
