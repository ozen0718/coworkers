// landing/index.tsx
'use client';

import { useEffect, useState } from 'react';
import LandingHeader from './LandingHeader';
import LandingBody from './LandingBody';
import LandingFooter from './LandingFooter';

export default function Landing() {
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
      <LandingHeader topImageSrc={topImageSrc} />
      <LandingBody />
      <LandingFooter bottomImageSrc={bottomImageSrc} />
    </div>
  );
}

// 각각의 컴포넌트들은 props를 통해 이미지를 받도록 구현됨
