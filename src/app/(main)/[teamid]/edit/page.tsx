import Button from '@/components/common/Button/Button';
import { TextInput } from '@/components/common/Inputs';
import { EditableTeamProfile } from '@/components/common/Profiles';

export default function TeamEditPage() {
  return (
    <div className="mx-auto flex w-[375px] flex-col justify-center px-4 py-14 md:w-[460px] md:py-25">
      <h2 className="text-center text-2xl leading-[28px] font-medium lg:text-[40px] lg:leading-[48px]">
        팀 수정하기
      </h2>

      <div className="mt-6 flex flex-col gap-6 md:mt-20">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg-medium">팀 프로필</h3>
          <EditableTeamProfile width={64} />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-lg-medium">팀 이름</label>
          {/* TODO: name input으로 교체 예정 */}
          <TextInput />
        </div>
      </div>

      <Button fullWidth className="mt-10 mb-6">
        수정하기
      </Button>
      <p className="text-center text-sm md:text-base">
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
      </p>
    </div>
  );
}
