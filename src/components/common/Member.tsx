'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteMember } from '@/api/group.api';
import ActionMenu from '@/components/common/ActionMenu';
import DeleteConfirmModal from '@/components/common/Modal/DeleteConfirmModal';
import { Profile } from '@/components/common/Profiles';
import { MemberProps } from '@/types/teampagetypes';

export default function Member({
  profileUrl,
  name,
  email,
  onClick,
  userId,
  isCurrentUserAdmin,
  isTargetAdmin,
}: MemberProps) {
  const { teamid } = useParams() as { teamid: string };
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: () => deleteMember(Number(teamid), userId),
    onSuccess: () => {
      toast.success('멤버가 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['groupDetail', Number(teamid)] });
    },
    onError: () => {
      toast.error('삭제에 실패했습니다.');
    },
  });

  return (
    <div className="bg-bg200 flex h-18 w-full items-center justify-between gap-1.5 rounded-2xl pr-6">
      <button className="w-full pl-6" onClick={onClick}>
        <div className="grid grid-cols-[min-content_1fr] grid-rows-[auto_auto] gap-x-3">
          <div className="col-span-1 row-span-1 flex min-w-0 flex-col items-start justify-center sm:row-span-2 sm:items-center">
            <Profile width={32} profileUrl={profileUrl} />
          </div>
          <p className="text-md-medium col-span-1 col-start-2 row-span-1 row-start-1 self-center text-left">
            {name}
          </p>
          <p className="text-xs-regular text-gray300 col-span-2 col-start-1 row-span-1 row-start-2 mt-0.5 text-left break-all whitespace-normal sm:col-span-1 sm:col-start-2">
            {email}
          </p>
        </div>
      </button>

      {isCurrentUserAdmin ? (
        isTargetAdmin ? (
          <Image src="/icons/crown.svg" alt="관리자" width={16} height={16} />
        ) : (
          <ActionMenu
            trigger={<Image src="/icons/kebab.svg" alt="멤버 메뉴" width={16} height={16} />}
            onDelete={() => setDeleteModalOpen(true)}
          />
        )
      ) : isTargetAdmin ? (
        <Image src="/icons/crown.svg" alt="관리자" width={16} height={16} />
      ) : null}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          mutation.mutate();
          setDeleteModalOpen(false);
        }}
        title="멤버를 삭제하시겠어요?"
        description="이 멤버는 현재 팀에서 제외됩니다."
      />
    </div>
  );
}
