import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

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

type PostWithLike = Post & {
  liked: boolean;
  likeCount: number;
};

export default function Artigos() {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState<PostWithLike[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        const posts: Post[] = res.data;

        const updatedPosts = await Promise.all(
          posts.map(async (post) => {
            const [likeRes, likedRes] = await Promise.all([
              api.get(`/posts/${post.id}/likes`),
              api.get(`/posts/${post.id}/liked`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
            ]);

            return {
              ...post,
              likeCount: likeRes.data.count,
              liked: likedRes.data.liked,
            };
          })
        );

        setPosts(updatedPosts);
      } catch {
        toast.error("Erro ao carregar artigos.");
      }
    };

    fetchPosts();
  }, [token]);

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

  const toggleLike = async (id: number) => {
    try {
      const res = await api.post(`/posts/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? {
                ...post,
                liked: res.data.liked,
                likeCount: res.data.liked ? post.likeCount + 1 : post.likeCount - 1,
              }
            : post
        )
      );
    } catch {
      alert("Erro ao curtir/descurtir artigo.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Artigos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/artigo/${post.id}`)}
              className="bg-white shadow-md rounded-md overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition"
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
                  <h2 className="text-lg font-bold text-black break-words">{post.title}</h2>
                  <p className="text-sm text-gray-700 mt-1 break-words line-clamp-3">
                    {post.content}
                  </p>
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  Por {post.author?.name} - {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(post.id);
                    }}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500"
                  >
                    <Heart
                      size={18}
                      className={post.liked ? "text-red-500 fill-red-500" : "text-gray-600"}
                    />
                    {post.likeCount}
                  </button>
                  {user?.id === post.author?.id && (
                    <div className="space-x-4 text-sm">
                      <Link
                        to={`/editar-artigo/${post.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-600 hover:underline"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(post.id);
                        }}
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
