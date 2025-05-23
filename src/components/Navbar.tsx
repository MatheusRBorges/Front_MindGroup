import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLLIElement>(null);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  const getAvatarUrl = () => {
    if (!user?.avatar) return "/default-avatar.png";
    return user.avatar.startsWith("http")
      ? user.avatar
      : `http://localhost:3000/uploads/${user.avatar}`;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center border-b px-6 py-4 bg-white shadow-sm relative">
      <h1 className="text-2xl font-bold">
        <Link to="/">M.</Link>
      </h1>

      <ul className="flex items-center gap-6 text-sm">
        {user && (
          <>
            <li className="hidden md:block"><Link to="/">Home</Link></li>
            <li className="hidden md:block"><Link to="/artigos">Artigos</Link></li>
            <li className="hidden md:block"><Link to="/criar-artigo">Publicar</Link></li>
          </>
        )}

        {!user ? (
          <>
            <li><Link to="/login">Entrar</Link></li>
            <li>
              <Link
                to="/registro"
                className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
              >
                Registrar
              </Link>
            </li>
          </>
        ) : (
          <>
    
            <li className="block md:hidden">
              <button
                onClick={() => setShowSidebar(true)}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              >
                <Menu size={20} />
              </button>
            </li>

            <li className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="focus:outline-none focus:ring-2 focus:ring-black rounded-full"
              >
                <img
                  src={getAvatarUrl()}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border object-cover"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded p-2 z-50">
                  <button
                    onClick={() => {
                      navigate("/perfil");
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded"
                  >
                    Perfil
                  </button>
                  <button
                    onClick={() => {
                      navigate("/meus-artigos");
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded"
                  >
                    Meus Artigos
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-600 hover:bg-gray-100 px-2 py-1 rounded"
                  >
                    Desconectar
                  </button>
                </div>
              )}
            </li>
          </>
        )}
      </ul>

      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
    </nav>
  );
}
