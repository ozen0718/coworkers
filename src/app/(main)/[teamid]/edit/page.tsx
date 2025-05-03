import EditableTeamProfileSection from './EditableTeamProfileSection';
import EditableTeamNameSection from './EditableTeamNameSection';
import EditButton from './EditButton';

export default function TeamEditPage() {
  const mockTeamData = {
    name: '경영관리',
    image: '/img_team.png',
  };

  return (
    <div className="mx-auto flex w-[375px] flex-col justify-center px-4 py-14 md:w-[460px] md:py-25">
      <h2 className="text-center text-2xl leading-[28px] font-medium lg:text-[40px] lg:leading-[48px]">
        팀 수정하기
      </h2>

      <div className="mt-6 flex flex-col gap-6 md:mt-20">
        <EditableTeamProfileSection teamProfileUrl={mockTeamData.image} />
        {/* TODO: Input 교체 후 {mockTeamData.name} 추가 */}
        <EditableTeamNameSection/>
      </div>

      <EditButton />
      <p className="text-center text-sm md:text-base">
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
      </p>
    </div>
  );
}
