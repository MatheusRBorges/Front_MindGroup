  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import api from "../services/api";
  import { useAuth } from "../context/AuthContext";

  export default function CriarArtigo() {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!title || !content) {
        return alert("Preencha todos os campos obrigatórios.");
      }

      try {
        console.log(title, content, image);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) {
          formData.append("image", image);
        }

        console.log(formData);

        await api.post("/posts", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Artigo criado com sucesso!");
        navigate("/artigos");
      } catch (error) {
        console.error(error);
        alert("Erro ao criar artigo.");
      }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-black">Criar novo Artigo</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-1 text-gray-700">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700">Conteúdo</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border rounded-md h-48 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700">Imagem</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Pré-visualização:</p>
                <img
                  src={imagePreview}
                  alt="Pré-visualização"
                  className="max-h-64 object-contain border rounded-md"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900"
          >
            Publicar
          </button>
        </form>
      </div>
    );
  }
