import instance from "@/api/axiosInstance";
import type { User, Brand } from "@/types/api"; // ⬅️ using your Brand type
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type AuthContextType = {
  user: User | null;
  brands: Brand[];
  token: string | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  login: (access: string, refresh: string) => void;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  role: "visitor" | "owner" | null;
  verifyEmail: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [role, setRole] = useState<"visitor" | "owner" | null>(null);
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
    setBrands([]);
    delete instance.defaults.headers.common["Authorization"];
  };

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
  const verifyEmail = () => {
    if (!user) return;
    setUser({ ...user, is_email_verified: true });
  };
  useEffect(() => {
    if (!token) {
      refreshToken();
    }
  }, [token, refreshToken]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        setIsLoadingUser(true);
        const res = await instance.get("/users/me");
        const data = res.data?.data || res.data || null;
        console.log(data);
        setUser(data);
        setRole(data?.role || null);
        setBrands(data?.brands || []); // ⬅️ store separately
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error?.response?.status === 401) {
          const refreshed = await refreshToken();
          if (refreshed) {
            try {
              const retryRes = await instance.get("/users/me");
              const retryData = retryRes.data?.data || retryRes.data || null;

              setUser(retryData);
              setRole(retryData?.role || null);
              setBrands(retryData?.brands || []);
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
        brands,
        token,
        isAuthenticated,
        isLoadingUser,
        role,
        login,
        logout,
        refreshToken,
        verifyEmail,
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
