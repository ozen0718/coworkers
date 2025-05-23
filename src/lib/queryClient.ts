import { QueryClient } from '@tanstack/react-query';

let client: QueryClient | null = null;

export const getQueryClient = () => {
  if (!client) {
    client = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retry: 1,
          staleTime: 1000 * 60,
          gcTime: 1000 * 60 * 5,
        },
        mutations: {
          retry: false,
        },
      },
    });
  }
  return client;
};
