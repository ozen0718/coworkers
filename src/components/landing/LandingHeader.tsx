'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Repair from '@/assets/icons/Repair';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';

interface LandingHeaderProps {
  topImageSrc: string;
}

export default function LandingHeader({ topImageSrc }: LandingHeaderProps) {
  const router = useRouter();
  const { isLoggedIn, initializeAuth } = useAuthStore();
  const { teams } = useUserStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  const handleStartClick = () => {
    const teamId = teams.length > 0 ? teams[0].id : null;

    if (isLoggedIn) {
      router.push(`/${teamId}`);
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
        className={`bg-gradient-primary text-text-inverse fixed bottom-4 left-1/2 z-50 h-[45px] w-[343px] -translate-x-1/2 rounded-[32px] text-lg font-bold transition-shadow transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl sm:absolute sm:bottom-[119px] sm:left-auto sm:translate-x-0 md:w-[373px] lg:bottom-[120px]`}
      >
        지금 시작하기
      </button>
    </div>
  );
}
