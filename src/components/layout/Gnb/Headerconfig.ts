export interface HeaderVisibilityConfig {
  showTeamSelector: boolean;
  showFreeBoardLink: boolean;
  showProfile: boolean;
}

// 로그인한 사용자에게만 보이는 페이지별 헤더 설정
const STATIC_HEADER_CONFIG: Record<string, HeaderVisibilityConfig> = {
  '/noteam': {
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
  },
  '/boards': {
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
  },
  '/boards/best': {
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
  },
  '/boards/create': {
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
  },
  '/mypage': {
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
  },
  '/myhistory': {
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
  },
  '/': {
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
  },
};

// 로그인하지 않은 경우: 모든 요소 숨김
const DEFAULT_CONFIG: HeaderVisibilityConfig = {
  showTeamSelector: false,
  showFreeBoardLink: false,
  showProfile: false,
};

// 현재 경로와 로그인 여부에 따라 헤더 표시 여부 결정
export function getHeaderConfig(pathname: string, isLoggedIn: boolean): HeaderVisibilityConfig {
  // 동적 경로 예외 처리 (예: /13-4/edit)
  const isEditPage = /^\/\d+\/edit$/.test(pathname);
  const isBoardDetailPage = /^\/boards\/\d+$/.test(pathname);
  const isBoardsEditPage = /^\/boards\/\d+\/edit$/.test(pathname);
  const isTaskListPage = /^\/\d+\/tasklist$/.test(pathname);

  if (isEditPage || isBoardDetailPage || isBoardsEditPage || isTaskListPage) {
    return isLoggedIn
      ? {
          showTeamSelector: true,
          showFreeBoardLink: true,
          showProfile: true,
        }
      : DEFAULT_CONFIG;
  }

  if (/^\/\d+$/.test(pathname)) {
    return isLoggedIn
      ? {
          showTeamSelector: true,
          showFreeBoardLink: true,
          showProfile: true,
        }
      : DEFAULT_CONFIG;
  }

  // 정적 경로 설정 가져오기
  const staticConfig = STATIC_HEADER_CONFIG[pathname] ?? DEFAULT_CONFIG;

  // 로그인 안 한 경우 모든 헤더 요소 숨김
  if (!isLoggedIn) {
    return DEFAULT_CONFIG;
  }

  // 로그인한 경우에만 해당 경로 설정 반영
  return staticConfig;
}
