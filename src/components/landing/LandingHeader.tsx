'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Repair from '@/assets/icons/Repair';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

interface LandingHeaderProps {
  topImageSrc: string;
}

export default function LandingHeader({ topImageSrc }: LandingHeaderProps) {
  const router = useRouter();
  const { isLoggedIn, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  const handleStartClick = () => {
    if (isLoggedIn) {
      router.push('/team');
    } else {
      router.push('/login');
    }
  };

  return (
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

      <button
        onClick={handleStartClick}
        className="bg-gradient-primary text-text-inverse absolute bottom-[48px] h-[45px] w-[343px] rounded-[32px] text-lg font-bold md:bottom-[119px] md:w-[373px] lg:bottom-[120px] lg:w-[373px]"
      >
        지금 시작하기
      </button>
    </div>
  );
}
