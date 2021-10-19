import netlifyIdentity from 'netlify-identity-widget';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {};

  useEffect(() => {
    // INIT netlify identity connection
    netlifyIdentity.init();
  }, []);

  const context = { user, login, logout };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export default AuthContext;
