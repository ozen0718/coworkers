'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import ActionMenu from '@/components/common/ActionMenu';
import Modal from '@/components/common/Modal';
import { getUserInfo } from '@/api/user';
import { deleteGroup } from '@/api/group.api';
import { useUserStore } from '@/stores/useUserStore';
import { useSelectedTeamStore } from '@/stores/useSelectedTeamStore';
import { TeamHeaderProps } from '@/types/tasktypes';
import { QUERY_KEYS } from '@/constants/queryKeys';

export default function TeamHeader({ title, showGear }: TeamHeaderProps) {
  const router = useRouter();
  const params = useParams();
  const groupId = Number(params.teamid);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const setUserInfo = useUserStore((s) => s.setUserInfo);
  const setSelectedTeam = useSelectedTeamStore((s) => s.setSelectedTeam);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteGroup(groupId),
    onSuccess: async () => {
      toast.success('그룹이 삭제되었습니다.');

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.me });

      const updatedUserInfo = await getUserInfo();

      setUserInfo({
        nickname: updatedUserInfo.nickname,
        profileImage: updatedUserInfo.profileImage,
        teams: updatedUserInfo.teams,
      });

      const firstGroup = updatedUserInfo.teams[0] ?? null;
      setSelectedTeam(firstGroup);

      router.push(firstGroup ? `/${firstGroup.id}` : '/noteam');
    },
    onError: () => {
      toast.error('그룹 삭제에 실패했습니다.');
    },
  });

  return (
    <div>
      <div
        className="bg-gray100/10 border-gray100/10 flex h-16 w-full items-center justify-between rounded-xl border bg-[url('/icons/teamheader_decoration.svg')] bg-no-repeat px-6"
        style={{ backgroundPosition: 'calc(100% - 80px) center' }}
      >
        <h2 className="text-xl-bold">{title}</h2>

        {showGear && (
          <ActionMenu
            trigger={<Image src="/icons/gear.svg" width={24} height={24} alt="팀 설정" />}
            onEdit={() => router.push(`/${groupId}/edit`)}
            onDelete={() => setDeleteModalOpen(true)}
          />
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        padding="danger"
        closeIcon
        header={{
          headerIcon: <Image src="/icons/alert.svg" width={24} height={24} alt="경고" />,
          title: '팀을 삭제하시겠어요?',
          description: '팀과 팀의 모든 할 일 목록이 삭제됩니다.',
        }}
        cancelButton={{ label: '닫기', variant: 'secondary' }}
        submitButton={{ label: '삭제하기', variant: 'danger' }}
        onSubmit={() => {
          deleteMutation.mutate();
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
}
