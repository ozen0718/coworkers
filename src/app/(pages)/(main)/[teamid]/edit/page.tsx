'use client';

import EditableTeamProfileSection from './EditableTeamProfileSection';
import EditableTeamNameSection from './EditableTeamNameSection';
import EditButton from './EditButton';
import clsx from 'clsx';
import { AuthPagesLayout, PageTitleStyle } from '@/styles/pageStyle';
import { useState } from 'react';

export default function TeamEditPage() {
  const [teamName, setTeamName] = useState('');

  return (
    <div className={clsx(AuthPagesLayout, 'mt-14')}>
      <h2 className={PageTitleStyle}>팀 수정하기</h2>

      <div className="mt-6 flex flex-col gap-6 md:mt-20">
        <EditableTeamProfileSection teamProfileUrl={null} />
        <EditableTeamNameSection name={teamName} setName={setTeamName} />
      </div>

      <EditButton name={teamName} />
      <p className="text-center text-sm md:text-base">
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
      </p>
    </div>
  );
}
