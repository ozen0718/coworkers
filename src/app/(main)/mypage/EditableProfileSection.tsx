import { EditableProfile } from '@/components/common/Profiles';
import { ProfileProps } from '@/types/profiletypes';

export default function EditableProfileSection({ width }: ProfileProps) {
  return (
    <button className="w-fit">
      <EditableProfile width={width} />
    </button>
  );
}
