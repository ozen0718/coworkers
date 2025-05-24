'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/common/Button/Button';
import { patchGroup } from '@/api/group.api';
import { getUserInfo } from '@/api/user';
import { useUserStore } from '@/stores/useUserStore';
import { toast } from 'react-toastify';
import { QUERY_KEYS } from '@/constants/queryKeys';

interface EditButtonProps {
  name: string;
  onSuccess?: () => void;
}

export default function EditButton({ name, onSuccess }: EditButtonProps) {
  const { teamid } = useParams() as { teamid: string };
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUserInfo = useUserStore((s) => s.setUserInfo);

  const mutation = useMutation({
    mutationFn: () =>
      patchGroup(Number(teamid), {
        name,
        image: null,
      }),

    onSuccess: async () => {
      const updatedUserInfo = await getUserInfo();

      setUserInfo({
        nickname: updatedUserInfo.nickname,
        profileImage: updatedUserInfo.profileImage,
        teams: updatedUserInfo.teams,
      });

      // 모든 관련 쿼리 invalidate
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.me });
      await queryClient.invalidateQueries({ queryKey: ['groupPageInfo', teamid] });
      await queryClient.invalidateQueries({ queryKey: ['groupDetail', Number(teamid)] });

      toast.success('팀 이름이 수정되었습니다.');

      onSuccess?.(); //selectedTeam 업데이트 처리

      setTimeout(() => {
        router.push(`/${teamid}`);
      }, 100);
    },

    onError: () => {
      toast.error('수정에 실패했습니다.');
    },
  });

  return (
    <Button fullWidth className="mt-10 mb-6" onClick={() => mutation.mutate()}>
      수정하기
    </Button>
  );
}
