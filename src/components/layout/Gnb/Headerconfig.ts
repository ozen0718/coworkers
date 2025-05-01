export const HEADER_VISIBILITY_CONFIG: Record<
  string,
  { showTeamSelector?: boolean; showFreeBoardLink?: boolean; showProfile?: boolean }
> = {
  '/': {
    //랜딩 페이지
    showTeamSelector: false,
    showFreeBoardLink: false,
    showProfile: false,
  },
  '/login': {
    //로그인 페이지
    showTeamSelector: false,
    showFreeBoardLink: false,
    showProfile: false,
  },
};
