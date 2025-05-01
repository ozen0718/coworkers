'use client';

import { useEffect, useState, useRef } from 'react';
import LandingHeader from './LandingHeader';
import LandingBody from './LandingBody';
import LandingFooter from './LandingFooter';

export default function Landing() {
  const [topImageSrc, setTopImageSrc] = useState('/images/landing-top-large.png');
  const [bottomImageSrc, setBottomImageSrc] = useState('/images/landing-bottom-large.png');
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    const debouncedResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        handleResize();
      }, 200);
    };

    handleResize();
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="mx-auto flex flex-col items-center">
      <LandingHeader topImageSrc={topImageSrc} />
      <LandingBody />
      <LandingFooter bottomImageSrc={bottomImageSrc} />
    </div>
  );
}
