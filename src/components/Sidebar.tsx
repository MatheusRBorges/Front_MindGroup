
import { Link } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={onClose} className="text-gray-600">
          <X size={20} />
        </button>
      </div>

      <nav className="flex flex-col space-y-4 text-gray-800">
        <Link to="/perfil" onClick={onClose}>👤 Perfil</Link>
        <Link to="/meus-artigos" onClick={onClose}>📄 Meus Artigos</Link>
        <Link to="/criar-artigo" onClick={onClose}>✍️ Criar Novo Artigo</Link>
        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="text-red-600 flex items-center space-x-1 mt-6"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </nav>
    </div>
  );
}
