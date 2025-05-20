import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import "./App.css";
import ForgotPassword from "./pages/forgot-password";
import PrivateRoute from "./routes/RotasPrivadas";
import Home from "./pages/Home";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
