'use client';

import { createContext, useContext, useState } from 'react';

const TaskReloadContext = createContext({
  reloadKey: 0,
  triggerReload: () => {},
});

export const useTaskReload = () => useContext(TaskReloadContext);

export const TaskReloadProvider = ({ children }: { children: React.ReactNode }) => {
  const [reloadKey, setReloadKey] = useState(0);
  const triggerReload = () => setReloadKey((prev) => prev + 1);

  return (
    <TaskReloadContext.Provider value={{ reloadKey, triggerReload }}>
      {children}
    </TaskReloadContext.Provider>
  );
};
