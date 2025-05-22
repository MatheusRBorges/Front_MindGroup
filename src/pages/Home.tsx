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
  author?: { name: string };
};

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => setPosts(res.data))
      .catch(() => alert("Erro ao carregar artigos."));
  }, []);

  const mainPost = posts[0];
  const featured = posts.slice(1, 4);
  const latest = posts.slice(4, 9);

  console.log(posts);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2">
            {mainPost && (
              <div>
                <img
                  src={`http://localhost:3000/uploads/${mainPost.image}`}
                  alt={mainPost.title}
                  className="w-full h-72 object-cover rounded"
                />
                <h2 className="text-2xl font-bold mt-4">{mainPost.title}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  Por {mainPost.author?.name} -{" "}
                  {new Date(mainPost.publishedAt).toLocaleDateString("pt-BR")}
                </p>
                <Link
                  to={`/artigo/${mainPost.id}`}
                  className="inline-block bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  LER MAIS
                </Link>
              </div>
            )}
          </div>

          <aside className="bg-black text-white p-4 rounded">
            <h3 className="font-bold mb-4">New</h3>
            <ul className="space-y-3 text-sm">
              {latest.map((post) => (
                <li key={post.id}>
                  <Link to={`/artigo/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featured.map((post, index) => (
            <div key={post.id} className="text-center">
              <img
                src={`http://localhost:3000/uploads/${post.image}`}
                alt={post.title}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <p className="text-3xl font-bold">0{index + 1}</p>
              <h3 className="text-sm font-semibold ">{post.title}</h3>
              <p className="text-xs text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
