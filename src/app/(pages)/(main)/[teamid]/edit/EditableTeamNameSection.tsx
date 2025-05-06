import { TextInput } from '@/components/common/Inputs';

// export interface EditableTeamNameSectionProps {
//   teamName: string;
// }

export default function EditableTeamNameSection() {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-lg-medium">팀 이름</label>
      {/* TODO: name input으로 교체 & {name} 추가 */}
      <TextInput />
    </div>
  );
}
