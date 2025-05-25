import { useState, useRef, useEffect } from 'react';
import { EditableTeamProfile } from '@/components/common/Profiles';

export interface EditableTeamProfileSectionProps {
  teamProfileUrl: string | null;
  onImageChange: (imageUrl: string | null, file: File | null) => void;
}

export default function EditableTeamProfileSection({
  teamProfileUrl,
  onImageChange,
}: EditableTeamProfileSectionProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(teamProfileUrl);

  useEffect(() => {
    setPreviewUrl(teamProfileUrl);
  }, [teamProfileUrl]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      setPreviewUrl(imageUrl);
      onImageChange(imageUrl, file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg-medium">팀 프로필</h3>
      <div className="w-fit cursor-pointer" onClick={handleClick}>
        <EditableTeamProfile width={64} teamProfileUrl={previewUrl} />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
