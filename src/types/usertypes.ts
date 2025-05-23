export interface User {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  memberships: Membership[];
}

export interface Membership {
  userId: number;
  userEmail: string;
  userName: string;
  userImage: string | null;
  groupId: number;
  role: 'ADMIN' | 'MEMBER';
  group: {
    id: number;
    name: string;
    image: string | null;
    teamId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Team {
  id: string;
  name: string;
  image?: string | null;
}
