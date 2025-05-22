import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

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
        alert("Erro ao carregar o artigo.");
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
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <h1 className="text-3xl font-bold mb-2 text-black">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Por {post.author?.name || "Autor desconhecido"} -{" "}
        {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
      </p>
      <p className="text-gray-800 whitespace-pre-line leading-relaxed">
        {post.content}
      </p>
      <div className="mt-6">
        <Link
          to="/artigos"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Voltar para artigos
        </Link>
      </div>
    </div>
  );
}
