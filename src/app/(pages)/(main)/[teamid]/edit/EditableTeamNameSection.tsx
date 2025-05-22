import { TextInput } from '@/components/common/Inputs';

interface EditableTeamNameSectionProps {
  name: string;
  setName: (name: string) => void;
}

export default function EditableTeamNameSection({ name, setName }: EditableTeamNameSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-lg-medium">팀 이름</label>
      <TextInput value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
