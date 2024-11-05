import React, { createContext } from 'react';
import usePersistentState from '../Hooks/usePersistentState';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = usePersistentState('isLoggedIn', false);
  const [authToken, setAuthToken] = usePersistentState('authToken', '');
  const [userData, setUserData] = usePersistentState('userData', {});

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, authToken, setAuthToken, userData, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};
