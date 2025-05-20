import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [mostarSenha, setmostarSenha] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 text-left">Login</h2>
          <p className="text-sm text-gray-600 mt-1">
            Acesse sua conta para publicar artigos, seguir autores e interagir
            com a comunidade.
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              required
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="relative">
            <input
              type={mostarSenha ? "text" : "password"}
              id="password"
              required
              placeholder="Senha"
              className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={() => setmostarSenha(!mostarSenha)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none">
              {mostarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="text-right">
            <Link
              to="/senha_esquecida"
              className="text-sm text-gray-500 hover:underline">
              Esqueci minha senha
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-900 transition">
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-700">
          Novo usuário?{" "}
          <Link
            to="/registro"
            className="text-black font-medium hover:underline">
            Clique aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
