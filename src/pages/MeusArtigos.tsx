import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function MeusArtigos() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      toast.error("Erro ao carregar seus artigos.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este artigo?")) return;

    try {
      await api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((post) => post.id !== id));
      toast.success("Artigo deletado com sucesso!");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Erro ao deletar o artigo.";
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-black">Meus Artigos</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded p-4 shadow-sm overflow-hidden"
          >
            {post.image && (
              <img
                src={`http://localhost:3000/uploads/${post.image}`}
                alt={post.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h2 className="font-semibold text-lg break-words">{post.title}</h2>
            <p className="text-sm text-gray-600 break-words">{post.content}</p>
            <p className="text-xs text-gray-400 mt-1">
              Publicado em{" "}
              {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
            </p>
            <div className="mt-2 space-x-4">
              <Link
                to={`/editar-artigo/${post.id}`}
                className="text-blue-600 hover:underline"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-600 hover:underline"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}

        <div className="flex flex-wrap gap-4">
          <Link
            to="/home"
            className="text-sm text-white bg-black hover:bg-gray-800 px-4 py-2 rounded transition"
          >
            ← Voltar para Home
          </Link>
        </div>
      </div>
    </div>
  );
}
