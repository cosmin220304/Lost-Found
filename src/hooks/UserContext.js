import React, { useEffect, useState } from 'react';

const UserContext = React.createContext();

//todo: uncomment and delete test
const UserContextWrapper = ({ children }) => {
  const [user, setUser] = useState('test');

  useEffect(() => {
    // setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  useEffect(() => {
    if (user) {
      // localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextWrapper, UserContext };
