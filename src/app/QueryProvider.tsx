'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ReactNode, useState } from 'react';

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // UX 안정성 확보
            refetchOnReconnect: false, // 모바일 환경에서 자동 요청 방지
            retry: 1, // 일시적 네트워크 오류 대비
            staleTime: 1000 * 60, // 1분 → 기본적으로 최신 상태 유지
            gcTime: 1000 * 60 * 5, // 5분 → 캐시 정리 주기
          },
          mutations: {
            retry: false, // POST/PUT 등은 중복 요청 방지
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
