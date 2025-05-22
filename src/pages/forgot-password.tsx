import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../services/api";

export default function ForgotPassword() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmarSenha, setconfirmarSenha] = useState<string>("");

  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmarSenha) {
      return alert("As senhas não coincidem.");
    }

    try {
      await api.post("/auth/forgot-password", { email, password });
      alert("Senha redefinida com sucesso!");
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.message || "Erro ao redefinir senha");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Esqueci a senha</h2>
          <p className="text-sm text-gray-600 mt-1">
            Sem problemas! Informe seu e-mail e enviaremos um link para redefinir sua senha.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleReset}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Nova senha"
              className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={mostrarConfirmar ? "text" : "password"}
              value={confirmarSenha}
              onChange={(e) => setconfirmarSenha(e.target.value)}
              required
              placeholder="Confirmar nova senha"
              className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {mostrarConfirmar ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-900 transition"
          >
            Alterar
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
