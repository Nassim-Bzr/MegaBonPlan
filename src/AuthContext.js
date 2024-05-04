import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const token = localStorage.getItem('token');  // Ajoutez ceci si vous stockez le token séparément
    if (userData && token) {
      setUser(JSON.parse(userData));  // Assurez-vous que l'utilisateur est mis à jour avec les données stockées
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', token);  // Stockez le token dans localStorage
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');  // Assurez-vous de retirer le token
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
