import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function NavBar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-black shadow-md px-6 py-4 flex items-center justify-between">
      <div className="w-1/3">
        <h1 className="text-xl font-bold text-white">Mind Blog</h1>
      </div>

      <div className="w-1/3 flex justify-center">
        <ul className="flex space-x-6 text-white font-medium">
          <li>
            <Link to="/home" className="hover:text-gray-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/artigos" className="hover:text-gray-300 transition">
              Artigos
            </Link>
          </li>
        </ul>
      </div>

      <div className="w-1/3 flex justify-end items-center space-x-4">
        <Link
          to="/perfil"
          className="text-white font-medium hover:text-gray-300 transition"
        >
          Perfil
        </Link>
        <button
          onClick={logout}
          title="Sair"
          className="text-white hover:text-red-400 transition"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}
