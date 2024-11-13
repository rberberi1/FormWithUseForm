import { createContext, useContext, useState, ReactNode, FunctionComponent} from 'react';
import { FormValues } from './FormComponent'; 

interface UsersContextType {
  users: FormValues[];
  setUsers: (users: FormValues[]) => void;
  saveUsersToLocalStorage: (users: FormValues[]) => void; 
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

interface UsersProviderProps {
  children: ReactNode; 
}

export const UsersProvider : FunctionComponent<UsersProviderProps> =({ children}) => {
  const [users, setUsers] = useState<FormValues[]>(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const saveUsersToLocalStorage = (users: FormValues[]) => {
    localStorage.setItem('users', JSON.stringify(users)); 
  };


  return (
    <UsersContext.Provider value={{ users, setUsers, saveUsersToLocalStorage }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);


  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }

  return context;
};

