export interface HeaderVisibilityConfig {
  showTeamSelector: boolean;
  showFreeBoardLink: boolean;
  showProfile: boolean;
}

const STATIC_HEADER_CONFIG: Record<string, HeaderVisibilityConfig> = {
  '/noteam': {
    // 소속된 팀이 없는 경우
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
  },
  '/boards': {
    // 자유 게시판
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
  },
  '/boards/create': {
    // 자유 게시판 - 게시글 쓰기
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
  },
  '/mypage': {
    // 계정 설정
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
  },
};

const DEFAULT_CONFIG: HeaderVisibilityConfig = {
  showTeamSelector: false,
  showFreeBoardLink: false,
  showProfile: false,
};

export function getHeaderConfig(pathname: string): HeaderVisibilityConfig {
  // 팀페이지 - 수정하기
  if (/^\/\d+\/edit$/.test(pathname)) {
    return {
      showTeamSelector: true,
      showFreeBoardLink: true,
      showProfile: true,
    };
  }

  return STATIC_HEADER_CONFIG[pathname] ?? DEFAULT_CONFIG;
}
