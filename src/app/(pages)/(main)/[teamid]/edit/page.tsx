'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import clsx from 'clsx';
import EditableTeamProfileSection from './EditableTeamProfileSection';
import EditableTeamNameSection from './EditableTeamNameSection';
import EditButton from './EditButton';
import { AuthPagesLayout, PageTitleStyle } from '@/styles/pageStyle';
import { useGroupPageInfo } from '@/hooks/useGroupPageInfo';
import { useGroupDetail } from '@/hooks/useGroupDetail';
import { useSelectedTeamStore } from '@/stores/useSelectedTeamStore';

export default function TeamEditPage() {
  const [teamName, setTeamName] = useState('');
  const [teamImage, setTeamImage] = useState<string | null>(null);
  const [teamImageFile, setTeamImageFile] = useState<File | null>(null);

  const { teamid } = useParams() as { teamid: string };

  const { data: userData } = useGroupPageInfo(teamid);
  const { data: groupDetail } = useGroupDetail(userData?.group.id);

  const { setSelectedTeam } = useSelectedTeamStore();

  useEffect(() => {
    if (!groupDetail) return;
    setTeamName(groupDetail.name);
    setTeamImage(groupDetail.image ?? null);
  }, [groupDetail]);

  if (!userData || !groupDetail) return null;

  const handleSuccess = () => {
    setSelectedTeam({
      id: `${userData.group.id}`,
      name: teamName,
      image: groupDetail.image ?? null,
    });
  };

  if (!userData || !groupDetail) return null;

  const imageUrl = groupDetail.image ?? null;

  return (
    <div className={clsx(AuthPagesLayout, 'mt-14')}>
      <h2 className={PageTitleStyle}>팀 수정하기</h2>

      <div className="mt-6 flex flex-col gap-6 md:mt-20">
        <EditableTeamProfileSection
          teamProfileUrl={imageUrl}
          onImageChange={(url, file) => {
            setTeamImage(url);
            setTeamImageFile(file);
          }}
        />
        <EditableTeamNameSection name={teamName} setName={setTeamName} />
      </div>

      <EditButton
        name={teamName}
        image={teamImage}
        imageFile={teamImageFile}
        onSuccess={handleSuccess}
      />

      <p className="text-center text-sm md:text-base">
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
      </p>
    </div>
  );
}
