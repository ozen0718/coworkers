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
  '/boards': {
    //자유 게시판 페이지
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
  },
  '/boards/create': {
    //자유 게시판 - 게시글 쓰기 페이지
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
  },
};
