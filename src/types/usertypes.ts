export interface UserInfo {
  role: 'ADMIN' | 'MEMBER';
  group: {
    teamId: string;
  };
}

export interface UserResponse {
  memberships: UserInfo[];
}
