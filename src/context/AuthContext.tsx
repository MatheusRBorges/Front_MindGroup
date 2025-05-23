import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
  import { useNavigate } from "react-router-dom";
  import api from "../services/api";

  type User = {
    avatar: string;
    id: number;
    name: string;
    email: string;
  };

  type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    isLoading: boolean;
    updateUser: (updatedUser: Partial<User>) => void;
  }

  const AuthContext = createContext<AuthContextType>({} as AuthContextType);

  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const tokenStorage = localStorage.getItem("token");
      const userStorage = localStorage.getItem("user");

      if (tokenStorage && userStorage) {
        setToken(tokenStorage);
        setUser(JSON.parse(userStorage));
        api.defaults.headers.common["Authorization"] = `Bearer ${tokenStorage}`;
      }

      setIsLoading(false);
    }, []);

    const login = (user: User, token: string) => {
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/home");
    };

    const updateUser = (updatedUser: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedUser } : prev));
  };

    const logout = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers.common["Authorization"];
      navigate("/");
    };

    return (
      <AuthContext.Provider value={{ user, token, login, logout, updateUser, isLoading }}>
        {children}
      </AuthContext.Provider>
    );
  };


  export const useAuth = () => useContext(AuthContext);