import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Voltar() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-sm text-gray-600 hover:text-black mb-4"
    >
      <ArrowLeft className="mr-1" size={18} />
      Voltar
    </button>
  );
}
