import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { clearSession } from "../services/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .me()
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        clearSession();
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function login(credentials) {
    const data = await authService.login(credentials);

    setUser(data.user);

    return data;
  }

  async function register(payload) {
    const data = await authService.register(payload);

    setUser(data.user);

    return data;
  }

  async function logout() {
    await authService.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}