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

  const logout = () => {
    netlifyIdentity.logout();
  };

  useEffect(() => {
    netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
    });

    netlifyIdentity.on('logout', (user) => {
      setUser(null);
    });

    netlifyIdentity.on('init', (user) => {
      setUser(user);
      setAuthReady(true);
    });

    // INIT netlify identity connection
    netlifyIdentity.init();

    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    };
  }, []);

  const context = { user, login, logout, authReady };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export default AuthContext;
