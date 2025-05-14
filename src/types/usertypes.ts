export interface Membership {
  role: 'ADMIN' | 'MEMBER';
  group: {
    teamId: string;
  };
}

export interface UserResponse {
  memberships: Membership[];
}
