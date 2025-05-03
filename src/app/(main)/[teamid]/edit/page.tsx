import Button from '@/components/common/Button/Button';
import { TextInput } from '@/components/common/Inputs';
import { EditableTeamProfile } from '@/components/common/Profiles';

export default function TeamEditPage() {
  return (
    <div className="mx-auto flex w-[460px] flex-col justify-center py-[140px]">
      <h2 className="text-4xl-medium">팀 수정하기</h2>

      <div className="mt-20 flex flex-col gap-6">
        <div className='flex flex-col gap-3'>
          <h3 className="text-lg-medium">팀 프로필</h3>
          <EditableTeamProfile width={64} />
        </div>
        <div className='flex flex-col gap-3'>
          <label className="text-lg-medium mb-3">팀 이름</label>
          {/* TODO: name input으로 교체 예정 */}
          <TextInput />
        </div>
      </div>

      <Button fullWidth className='mt-10 mb-6'>수정하기</Button>
      <p>팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.</p>
    </div>
  );
}
