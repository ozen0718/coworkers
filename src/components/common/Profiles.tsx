'use client';

import Image from 'next/image';
import { BaseProfileProps, ProfileProps, TeamProfileProps } from '@/types/inputtypes';

function BaseProfile({ imageUrl, width, showEditIcon }: BaseProfileProps) {
  const border = Math.floor(width / 32);
  const innerWidth = width - border * 2;
  const editIconWidth = Math.floor(width / 3.6);
  const editIconBorderWidth = border;

  return (
    <div className="relative" style={{ width: `${width}px`, height: `${width}px` }}>
      <div
        className="flex flex-shrink-0 items-center justify-center rounded-full bg-[#475365]"
        style={{ width: `${width}px`, height: `${width}px` }}
      >
        <div
          className="bg-bg100 relative overflow-hidden rounded-full"
          style={{ width: `${innerWidth}px`, height: `${innerWidth}px` }}
        >
          <Image src={imageUrl} alt="프로필 이미지" fill style={{ objectFit: 'cover' }} />
        </div>
      </div>

      {showEditIcon && (
        <div
          className="border-bg300 bg-bg100 absolute right-0 bottom-0 rounded-full border"
          style={{
            width: `${editIconWidth}px`,
            height: `${editIconWidth}px`,
            borderWidth: `${editIconBorderWidth}px`,
          }}
        >
          <Image src="/icons/pencil.svg" alt="프로필 바꾸기" fill style={{ objectFit: 'cover' }} />
        </div>
      )}
    </div>
  );
}

export function Profile({ profileUrl, width }: ProfileProps) {
  return <BaseProfile imageUrl={profileUrl || '/icons/initialprofile.svg'} width={width} />;
}

export function EditableProfile({ profileUrl, width }: ProfileProps) {
  return (
    <BaseProfile imageUrl={profileUrl || '/icons/initialprofile.svg'} width={width} showEditIcon />
  );
}

export function TeamProfile({ teamProfileUrl, width }: TeamProfileProps) {
  return <BaseProfile imageUrl={teamProfileUrl || '/icons/initialteamprofile.svg'} width={width} />;
}

export function EditableTeamProfile({ teamProfileUrl, width }: TeamProfileProps) {
  return (
    <BaseProfile
      imageUrl={teamProfileUrl || '/icons/initialteamprofile.svg'}
      width={width}
      showEditIcon
    />
  );
}
