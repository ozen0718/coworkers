import axiosInstance from './axiosInstance';

export interface CreateTeamResponse {
  id: number;
}

/**
 * 팀 생성
 * POST /groups
 * @param name - 팀 이름
 * @param imageUrl - 업로드된 이미지 URL (선택)
 */
export async function createTeam(name: string, imageUrl?: string): Promise<{ id: string }> {
  const { data } = await axiosInstance.post<CreateTeamResponse>('/groups', {
    name,
    image: imageUrl,
  });
  if (typeof data.id !== 'number') {
    throw new Error('INVALID_RESPONSE');
  }
  return { id: String(data.id) };
}

/**
 * 이미지 업로드 API
 * POST /images/upload
 */
export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append('image', file); // Swagger 문서상 필드명

  const { data } = await axiosInstance.post<{ url: string }>('/images/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  if (!data.url) {
    throw new Error('UPLOAD_FAIL');
  }
  return data.url;
}

/**
 * 초대 수락 (팀 참여)
 * POST /groups/{groupId}/invitations/{invitationId}/accept
 */
export async function acceptInvitation(
  groupId: string,
  invitationId: string
): Promise<{ groupId: string }> {
  const { data } = await axiosInstance.post<{ groupId: number }>(
    `/groups/${groupId}/invitations/${invitationId}/accept`
  );
  if (!data.groupId) throw new Error('INVALID_RESPONSE');
  return { groupId: String(data.groupId) };
}

/**
 * 팀 참여 API
 * POST /groups/join
 */
export async function joinTeam(link: string): Promise<{ id: string }> {
  const { data } = await axiosInstance.post<{ id: number }>('/groups/join', { link });
  if (!data.id) throw new Error('INVALID_RESPONSE');
  return { id: String(data.id) };
}
