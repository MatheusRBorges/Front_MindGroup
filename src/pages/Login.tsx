import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Digite um e-mail válido.");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      toast.success("Login realizado com sucesso!");
      navigate("/home");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erro ao fazer login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 text-left">Login</h2>
          <p className="text-sm text-gray-600 mt-1">
            Acesse sua conta para publicar artigos, seguir autores e interagir com a comunidade.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-gray-500 hover:underline">
              Esqueci minha senha
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-900 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-700">
          Novo usuário?{" "}
          <Link to="/registro" className="text-black font-medium hover:underline">
            Clique aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
