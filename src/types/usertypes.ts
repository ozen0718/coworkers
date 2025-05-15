export interface UserInfo {
  role: 'ADMIN' | 'MEMBER';
  userId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  groupId: number;
  group: {
    id: number;
    name: string;
    image: string | null;
    teamId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export type UserRoleInfo = Pick<UserInfo, 'role'>;

export interface Memberships {
  role: 'ADMIN' | 'MEMBER';
  userId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  groupId: number;
  group: {
    id: number;
    name: string;
    image: string | null;
    teamId: string;
    createdAt: string;
    updatedAt: string;
  };
}
