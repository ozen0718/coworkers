import { TextInput } from '@/components/common/Inputs';

export default function EditableNameSection() {
  return (
    <div className="flex flex-col gap-3">
      {/* TODO: 이름 변경 방식 - 버튼&모달 */}
      {/* TODO: name prop 전달달 */}
      <label>이름</label>
      <TextInput />
    </div>
  );
}
