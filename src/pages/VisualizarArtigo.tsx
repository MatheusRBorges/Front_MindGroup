import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
  author?: {
    name: string;
  };
  publishedAt: string;
};

export default function VisualizarArtigo() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch {
        toast.error("Erro ao carregar o artigo.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (!post) return <p className="text-center mt-10">Artigo não encontrado.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {post.image && (
        <img
          src={`http://localhost:3000/uploads/${post.image}`}
          alt={`Imagem do artigo ${post.title}`}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-2 text-black break-words">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Por {post.author?.name || "Autor desconhecido"} -{" "}
        {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
      </p>
      <p className="text-gray-800 whitespace-pre-line leading-relaxed break-words mb-6">
        {post.content}
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/home"
          className="text-sm text-white bg-black hover:bg-gray-800 px-4 py-2 rounded transition"
        >
          ← Voltar para Home
        </Link>
        <Link
          to="/artigos"
          className="text-sm text-white bg-black hover:bg-gray-800 px-4 py-2 rounded transition"
        >
          Ir para Artigos →
        </Link>
      </div>
    </div>
  );
}
