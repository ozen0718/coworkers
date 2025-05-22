import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Button from '@/components/common/Button/Button';
import { patchGroup } from '@/api/group.api';
import { useQueryClient } from '@tanstack/react-query';
import { getUserInfo } from '@/api/user';
import { useUserStore } from '@/stores/useUserStore';

interface EditButtonProps {
  name: string;
}

export default function EditButton({ name }: EditButtonProps) {
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

      await queryClient.invalidateQueries({ queryKey: ['groupPageInfo', teamid] });
      await queryClient.invalidateQueries({ queryKey: ['groupDetail', Number(teamid)] });

      setTimeout(() => {
        router.push(`/${teamid}`);
      }, 100);
    },

    onError: () => {
      alert('수정에 실패했습니다.');
    },
  });

  return (
    <Button fullWidth className="mt-10 mb-6" onClick={() => mutation.mutate()}>
      수정하기
    </Button>
  );
}
