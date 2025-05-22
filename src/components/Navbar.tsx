import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center border-b px-6 py-4">
      <h1 className="text-2xl font-bold">M.</h1>

      <ul className="flex items-center gap-6 text-sm">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/artigos">Artigos</Link></li>

        {!user ? (
          <>
            <li><Link to="/">Entrar</Link></li>
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
            <li><Link to="/criar-artigo">Publicar</Link></li>
            <li><Link to="/perfil">Perfil</Link></li>
            <li>
              <button
                onClick={logout}
                className="text-red-600 hover:underline"
              >
                Sair
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
