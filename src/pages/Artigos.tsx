import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
  publishedAt: string;
  author?: {
    id: number;
    name: string;
  };
};

export default function Artigos() {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch {
        alert("Erro ao carregar artigos.");
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja mesmo excluir este artigo?")) return;

    try {
      await api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch {
      alert("Erro ao excluir artigo.");
    }
  };

  console.log('posts', posts);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Artigos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-md overflow-hidden flex flex-col"
            >
              {post.image && (
                <img
                  src={`http://localhost:3000/uploads/${post.image}`}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-black">{post.title}</h2>
                  <p className="text-sm text-gray-700 mt-1 line-clamp-3">
                    {post.content}
                  </p>
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  Por {post.author?.name} -{" "}
                  {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-red-500 text-sm">❤️ 12</span>

                  {post && (
                    <div className="space-x-4 text-sm">
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
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
