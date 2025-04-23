import Link from 'next/link';

const PROFILE_DROPDOWN_LIST = [
  { text: '마이 히스토리', src: '/myhistory' },
  { text: '계정 설정', src: '/mypage' },
  { text: '팀 참여', src: '/join-team' },
  { text: '로그아웃', src: '' },
];

const DropDownProfileItemList = PROFILE_DROPDOWN_LIST.map((list, index) => {
  const isLast = index === PROFILE_DROPDOWN_LIST.length - 1;

  const handleClickLogOut = () => {};

  return isLast ? (
    <div onClick={handleClickLogOut} key={list.text} className="text-md-regular text-gray100">
      {list.text}
    </div>
  ) : (
    <Link href={list.src} key={list.text} className="text-md-regular text-gray100">
      {list.text}
    </Link>
  );
});

export default DropDownProfileItemList;
