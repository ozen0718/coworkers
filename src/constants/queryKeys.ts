export const QUERY_KEYS = {
  // User
  user: {
    me: ['user'],
    groups: ['user', 'groups'],
    memberships: ['user', 'memberships'],
    history: ['user', 'history'],
  },

  // TaskList
  taskList: {
    detail: (groupId: string, taskListId: string, date?: string) =>
      date ? ['taskList', groupId, taskListId, date] : ['taskList', groupId, taskListId],
  },

  // Task
  tasks: {
    list: (groupId: string, taskListId: string) => ['tasks', groupId, taskListId],
    detail: (groupId: string, taskId: string) => ['task', groupId, taskId],
  },

  // Group
  team: {
    detail: (groupId: string) => ['team', groupId],
    member: (groupId: string, memberUserId: string) => ['team', groupId, 'member', memberUserId],
    invitations: (groupId: string) => ['team', groupId, 'invitations'],
    tasks: (groupId: string) => ['team', groupId, 'tasks'],
  },

  // Comment
  comments: (taskId: string) => ['comments', taskId],

  // Article
  articles: ['articles'],
  article: (articleId: string) => ['article', articleId],
  articleComments: (articleId: string) => ['article', articleId, 'comments'],
  generalPosts: (keyword?: string, orderBy?: string) => [
    'generalPosts',
    keyword ?? '',
    orderBy ?? 'recent',
  ],
  bestPosts: (keyword?: string) => ['bestPosts', keyword],
};
