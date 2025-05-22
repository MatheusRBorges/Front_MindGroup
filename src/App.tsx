import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import "./App.css";
import ForgotPassword from "./pages/forgot-password";
import PrivateRoute from "./routes/RotasPrivadas";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import MeusArtigos from "./pages/MeusArtigos";
import EditarArtigo from "./pages/EditarArtigo";
import CriarArtigo from "./pages/CriarArtigo";
import VisualizarArtigo from "./pages/VisualizarArtigo";
import Artigos from "./pages/Artigos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/artigos" element={<PrivateRoute><Artigos /></PrivateRoute>} />
      <Route path="/criar-artigo" element={<PrivateRoute><CriarArtigo /></PrivateRoute>} />
      <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
      <Route path="/meus-artigos" element={<PrivateRoute><MeusArtigos /></PrivateRoute>} />
      <Route path="/editar-artigo/:id" element={<PrivateRoute><EditarArtigo /></PrivateRoute>} />
      <Route path="/artigo/:id" element={<VisualizarArtigo />} />
    </Routes>
  );
}

export default App;
