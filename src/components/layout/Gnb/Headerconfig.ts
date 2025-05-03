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
  // '/$teamid/edit': {
  //   //팀 수정하기 페이지
  //   showTeamSelector: true,
  //   showFreeBoardLink: true,
  //   showProfile: true,
  // },
  '/noteam': {
    //No-team 페이지
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
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
  '/mypage': {
    //계정 설정 페이지
    showTeamSelector: true,
    showFreeBoardLink: true,
    showProfile: true,
  },
};
