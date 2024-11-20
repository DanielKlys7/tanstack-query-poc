// src/contexts/UserContext.tsx
import { createContext, useContext, ReactNode } from 'react';
import { useObjects } from '../hooks/useObjects';

interface UserContextType {
  objects: Object[];
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: objects = [], isLoading } = useObjects();

  return (
    <UserContext.Provider value={{ objects, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw Error('useUserContext must be used within UserProvider');
  return context;
};
