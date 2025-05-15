export interface UserInfo {
  role: 'ADMIN' | 'MEMBER';
}

export interface UserResponse {
  memberships: UserInfo[];
}
