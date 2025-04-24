'use client';

import Image from 'next/image';
import { ProfileProps, TeamProfileProps } from '@/types/inputtypes';

export function Profile({ profileUrl, width }: ProfileProps) {
  const fractionForInnerWidth = Math.floor(width / 32);
  const innerWidth = width - fractionForInnerWidth * 2;

  return (
    <div
      className="flex flex-shrink-0 items-center justify-center rounded-full bg-[#475365]"
      style={{ width: `${width}px`, height: `${width}px` }}
    >
      <div
        className="bg-bg100 relative overflow-hidden rounded-full"
        style={{ width: `${innerWidth}px`, height: `${innerWidth}px` }}
      >
        <Image
          src={profileUrl || '/icons/initialprofile.svg'}
          alt="프로필 이미지"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}

export function EditableProfile({ profileUrl, width }: ProfileProps) {
  const fractionForInnerWidth = Math.floor(width / 32);
  const innerWidth = width - fractionForInnerWidth * 2;
  const editIconWidth = Math.floor(width / 3.6);
  const editIconBorder = width - innerWidth;
  const editIconBorderWidth = editIconBorder / 2;

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
          <Image
            src={profileUrl || '/icons/initialprofile.svg'}
            alt="프로필 이미지"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
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
    </div>
  );
}

export function TeamProfile({ teamProfileUrl, width }: TeamProfileProps) {
  const fractionForInnerWidth = Math.floor(width / 32);
  const innerWidth = width - fractionForInnerWidth * 2;

  return (
    <div
      className="flex flex-shrink-0 items-center justify-center rounded-full bg-[#475365]"
      style={{ width: `${width}px`, height: `${width}px` }}
    >
      <div
        className="bg-bg100 relative overflow-hidden rounded-full"
        style={{ width: `${innerWidth}px`, height: `${innerWidth}px` }}
      >
        <Image
          src={teamProfileUrl || '/icons/initialteamprofile.svg'}
          alt="프로필 이미지"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}

export function EditableTeamProfile({ teamProfileUrl, width }: TeamProfileProps) {
  const fractionForInnerWidth = Math.floor(width / 32);
  const innerWidth = width - fractionForInnerWidth * 2;
  const editIconWidth = Math.floor(width / 3.6);
  const editIconBorder = width - innerWidth;
  const editIconBorderWidth = editIconBorder / 2;

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
          <Image
            src={teamProfileUrl || '/icons/initialteamprofile.svg'}
            alt="프로필 이미지"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
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
    </div>
  );
}
