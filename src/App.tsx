import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import "./App.css";
import SenhaEsquecida from "./pages/SenhaEsquecida";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/senha_esquecida" element={<SenhaEsquecida />} />
    </Routes>
  );
}

export default App;
