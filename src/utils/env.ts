/**
 * 환경 관련 여부 체크 Utils
 * - window, NODE_ENV 기반 런타임 조건 분기용
 */

// 클라이언트 환경인지 (브라우저인지)
export const isBrowser = typeof window !== 'undefined';

// 서버 환경인지 (SSR)
export const isServer = typeof window === 'undefined';

// 개발 환경 여부
export const isDev = process.env.NODE_ENV === 'development';

// 프로덕션 환경 여부
export const isProd = process.env.NODE_ENV === 'production';