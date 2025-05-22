import axiosInstance from '@/api/axiosInstance';
import { Group } from '@/types/grouptypes';

export const getGroupDetail = async (groupId: number): Promise<Group> => {
  const response = await axiosInstance.get(`/groups/${groupId}`);
  return response.data;
};

export const getInvitationToken = async (groupId: number): Promise<string> => {
  const response = await axiosInstance.get(`/groups/${groupId}/invitation`);
  return typeof response.data === 'string' ? response.data : '';
};

export const acceptGroupInvitation = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}): Promise<{ groupId: number }> => {
  const response = await axiosInstance.post('/groups/accept-invitation', {
    userEmail: email,
    token,
  });
  return response.data;
};

export const deleteGroup = async (groupId: number): Promise<void> => {
  await axiosInstance.delete(`/groups/${groupId}`);
};

export const patchGroup = async (
  groupId: number,
  body: { name: string; image: string | null }
): Promise<void> => {
  await axiosInstance.patch(`/groups/${groupId}`, body);
};
