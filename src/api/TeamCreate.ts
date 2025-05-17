import axiosInstance from '@/api/axiosInstance';

/**
 * 이미지 업로드 API
 */
export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);

  const res = await axiosInstance.post('/api/images/upload', form);
  if (!res.data?.url) throw new Error('UPLOAD_FAIL');
  return res.data.url as string;
}

/**
 * 팀 생성
 * POST /groups
 */
export async function createTeam(name: string, imageUrl?: string): Promise<{ id: string }> {
  const res = await axiosInstance.post('/groups', {
    name,
    image: imageUrl,
  });
  if (!res.data?.id) throw new Error('INVALID_RESPONSE');
  return { id: String(res.data.id) };
}

/**
 * 초대 수락 (팀 참여)
 * POST /groups/{groupId}/invitations/{invitationId}/accept
 */
export async function acceptInvitation(
  groupId: string,
  invitationId: string
): Promise<{ groupId: string }> {
  const res = await axiosInstance.post(`/groups/${groupId}/invitations/${invitationId}/accept`);
  if (!res.data?.groupId) throw new Error('INVALID_RESPONSE');
  return { groupId: String(res.data.groupId) };
}

/**
 * 팀 참여 API
 */
export async function joinTeam(link: string): Promise<{ id: string }> {
  const res = await axiosInstance.post('/api/teams/join', { link });
  if (!res.data?.id) throw new Error('INVALID_RESPONSE');
  return { id: String(res.data.id) };
}
