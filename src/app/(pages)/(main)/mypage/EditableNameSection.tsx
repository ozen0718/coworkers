import { CurrentName } from '@/components/common/Inputs';
import { UserProps } from './types';

export default function EditableNameSection({ name }: UserProps) {
  return (
    <div className="flex flex-col gap-3">
      <label>이름</label>
      <CurrentName name={name} />
    </div>
  );
}
