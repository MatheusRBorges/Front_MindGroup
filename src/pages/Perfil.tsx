import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Perfil() {
  const { token, updateUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [avatar, setAvatar] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(res.data.name);
        setEmail(res.data.email);
        setAvatar(res.data.avatar || "");
      } catch {
        toast.error("Erro ao carregar perfil.");
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password && password !== confirm) {
      return toast.error("As senhas não coincidem.");
    }

    try {
      await api.put(
        "/auth/profile",
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const res = await api.put("/auth/profile/avatar/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        updateUser({ avatar: res.data.user.avatar }); // Atualiza avatar no contexto
      }

      toast.success("Perfil atualizado com sucesso!");
    } catch {
      toast.error("Erro ao atualizar perfil.");
    }
  };

  const avatarSrc = avatarFile
    ? URL.createObjectURL(avatarFile)
    : avatar
    ? avatar.startsWith("http")
      ? avatar
      : `http://localhost:3000/uploads/${avatar}`
    : "/default-avatar.png";

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-black">Editar Perfil</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex justify-center">
          <img
            src={avatarSrc}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block">Nova Imagem de Perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setAvatarFile(file);
              }
            }}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block">Nova Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block">Confirmar Nova Senha</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
