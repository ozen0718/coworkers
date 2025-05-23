import { TaskList } from '@/types/tasklisttypes';

export interface Group {
  id: number;
  name: string;
  image: string | null;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  members: GroupMember[];
  taskLists: TaskList[];
}

export interface GroupMember {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: 'ADMIN' | 'MEMBER';
}
