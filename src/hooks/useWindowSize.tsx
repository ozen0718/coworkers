import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize); // 브라우저 창 크기 변할 때마다 실행
    handleResize();

    return () => window.removeEventListener('resize', handleResize); // 언마운트 때 이벤트 제거
  }, []);

  return windowWidth;
}
