
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/");
  };

  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 z-50 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
          <X size={24} />
        </button>
      </div>

      <button
        onClick={() => {
          navigate("/perfil");
          onClose();
        }}
        className="text-left mb-4 text-black hover:underline"
      >
        Perfil
      </button>

      <button
        onClick={handleLogout}
        className="text-left text-black hover:underline"
      >
        Logout
      </button>
    </div>
  );
}
