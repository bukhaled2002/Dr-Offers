import instance from "@/api/axiosInstance";
import type { User } from "@/types/api";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  login: (access: string, refresh: string) => void;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(!!token);

  const isAuthenticated = !!token && !!user;

  const login = (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    setToken(access);
    instance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setUser(null);
    delete instance.defaults.headers.common["Authorization"];
  };

  // Refresh token function to call manually or from interceptor
  const refreshToken = useCallback(async (): Promise<boolean> => {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) {
      logout();
      return false;
    }
    try {
      const res = await instance.post("/auth/refresh", {
        refreshToken: refresh,
      });
      // NOTE: Check your backend response shape here; adjust if needed
      const data = res.data?.data || res.data;

      const newAccessToken = data.access_token || data.accessToken;
      const newRefreshToken = data.refresh_token || data.refreshToken;

      if (newAccessToken && newRefreshToken) {
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        setToken(newAccessToken);
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        return true;
      }

      logout();
      return false;
    } catch (err) {
      console.error("Refresh failed", err);
      logout();
      return false;
    }
  }, []);

  // On mount, if no token, try refresh (optional)
  useEffect(() => {
    if (!token) {
      refreshToken();
    }
  }, [token, refreshToken]);

  // Fetch user when token changes
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        setIsLoadingUser(true);
        const res = await instance.get("/users/me");
        console.log(res.data.data);
        setUser(res.data?.data || res.data || null);
        console.log(user, "User fetched successfully");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error?.response?.status === 401) {
          const refreshed = await refreshToken();
          if (refreshed) {
            try {
              const retryRes = await instance.get("/users/me");
              setUser(retryRes.data?.data || retryRes.data || null);
            } catch {
              logout();
            }
          } else {
            logout();
          }
        } else {
          console.error("Failed to fetch user", error);
          logout();
        }
      } finally {
        setIsLoadingUser(false);
      }
    };
    fetchUser();
  }, [token, refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoadingUser,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
