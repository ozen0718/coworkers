'use client';

import ProfileItem from './ProfileItem';

const PROFILE_DROPDOWN_LIST = [
  { text: '마이 히스토리', href: '/myhistory' },
  { text: '계정 설정', href: '/mypage' },
  { text: '팀 참여', href: '/join-team' },
  { text: '로그아웃', onClick: () => console.log('Logout clicked') },
];

const DropDownProfileItemList = PROFILE_DROPDOWN_LIST.map((item) => (
  <ProfileItem key={item.text} text={item.text} href={item.href} onClick={item.onClick} />
));

export default DropDownProfileItemList;
