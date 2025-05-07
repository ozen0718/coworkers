import { EditableTeamProfile } from '@/components/common/Profiles';

export interface EditableTeamProfileSectionProps {
  teamProfileUrl: string;
}

export default function EditableTeamProfileSection({
  teamProfileUrl,
}: EditableTeamProfileSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg-medium">팀 프로필</h3>
      <EditableTeamProfile width={64} teamProfileUrl={teamProfileUrl} />
    </div>
  );
}
