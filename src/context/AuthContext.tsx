import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // LOGIN
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      setUser(res.data.user);
      setToken(res.data.token);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!");
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  // REGISTER
  const register = async (data: any) => {
    try {
      await axiosInstance.post("/auth/register", data);
      toast.success("Registration successful! Please login.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axiosInstance.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully!");
  };

  // UPDATE USER
  const updateUser = (updatedUser: any) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
