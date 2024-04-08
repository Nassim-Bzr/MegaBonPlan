import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simule le chargement du statut de connexion et des données utilisateur
  useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (userName) {
      setUser({ name: userName });
    }
  }, []);

  const login = (userName) => {
    localStorage.setItem('userName', userName);
    setUser({ name: userName });
  };

  const logout = () => {
    localStorage.removeItem('userName');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
