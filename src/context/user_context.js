import {useContext, useEffect, useState, createContext} from 'react';
import {useAuth0} from '@auth0/auth0-react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const {user, loginWithRedirect, logout} = useAuth0();

  const [appUser, setAppUser] = useState(null);

  useEffect(() => {
    setAppUser(user);
  }, [user]);

  return (
    <UserContext.Provider value={{loginWithRedirect, logout, appUser}}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
