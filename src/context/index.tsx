// context_provider/index.tsx


import { createContext, useContext, useMemo, ReactNode } from 'react';
import { useAccount } from './hooks/access';


type AuthContextData = {
  isLogged: boolean;
  check: () => Promise<void>;
  userLogout: () => Promise<void>;
};

const UseContextData = createContext<AuthContextData>({} as AuthContextData);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const { check, userLogout, isLogged } = useAccount();

  const value = useMemo(
    () => ({
      check,
      userLogout,
      isLogged,
    }),
    [
      check,
      userLogout,
      isLogged,
    ]
  );

  return <UseContextData.Provider value={value}>{children}</UseContextData.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(UseContextData);
  if (!context) {
    throw new Error('useAuthContext must be used within a ContextProvider');
  }
  return context;
};

export default UseContextData;
