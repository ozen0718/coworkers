'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { patchGroup } from '@/api/group.api';
import { uploadImage } from '@/api/uploadImage.api';
import { getUserInfo } from '@/api/user';
import Button from '@/components/common/Button/Button';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useUserStore } from '@/stores/useUserStore';

interface EditButtonProps {
  name: string;
  image: string | null;
  imageFile: File | null;
  onSuccess?: () => void;
}

export default function EditButton({ name, image, imageFile, onSuccess }: EditButtonProps) {
  const { teamid } = useParams() as { teamid: string };
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUserInfo = useUserStore((s) => s.setUserInfo);

  const mutation = useMutation({
    mutationFn: async () => {
      let imageUrl = image;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await patchGroup(Number(teamid), {
        name,
        image: imageUrl,
      });
    },

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

      toast.success('팀 정보가 수정되었습니다.');

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
