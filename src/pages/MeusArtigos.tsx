import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
  publishedAt: string;
};

export default function MeusArtigos() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await api.get("/posts/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch {
        alert("Erro ao carregar seus artigos.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [token]);

  const handleDelete = async (id: number) => {
    const confirmar = window.confirm("Deseja realmente excluir este artigo?");
    if (!confirmar) return;

    try {
      await api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch {
      alert("Erro ao excluir artigo.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-black">Meus Artigos</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : posts.length === 0 ? (
        <p>Você ainda não publicou nenhum artigo.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="border p-4 rounded-md shadow-sm bg-white">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <h2 className="text-xl font-semibold text-black">{post.title}</h2>
              <p className="text-gray-700">{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Publicado em {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
              </p>
              <div className="mt-4 flex space-x-4">
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
        </div>
      )}
    </div>
  );
}
