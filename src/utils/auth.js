import React from 'react';

const AuthContext = React.createContext({
  user: null,
  setUser: () => {},
  auth: null,
});

export { AuthContext };
