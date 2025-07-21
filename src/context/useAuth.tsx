// context/AuthContext.tsx
import instance from "@/api/axiosInstance";
import type { User } from "@/types/api";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      // You can also call /auth/me to get user info
      const fetchUser = async () => {
        try {
          const res = await instance("/users/me");
          console.log(res);
          setUser(res.data?.data || null);
        } catch (error) {
          console.error("Failed to fetch user", error);
          logout();
        }
      };
      fetchUser();
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
