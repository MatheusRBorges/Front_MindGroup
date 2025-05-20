import Navbar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { user } = useAuth();

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Bem-vindo, {user?.name}!</h1>
                <p className="text-gray-600">Você está logado como {user?.email}</p>
            </div>
        </>
    );
}
