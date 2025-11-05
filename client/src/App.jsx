import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Error from "./pages/Error.jsx";
import Proyectos from "./pages/Proyectos.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import OtraPagina from "./pages/OtraPagina.jsx";
import Home from "./pages/Home.jsx";
import { Games } from "./pages/Games.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import ProtectorRutas from "./components/ProtectorRutas.jsx";
import NoAutorizados from "./pages/NoAutorizados.jsx";
import Proyecto04 from "./pages/Proyecto04.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      {/* Rutas de autenticación sin Layout (pantalla completa) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas con Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/games" element={<Games />} />
        <Route path="/proyecto04" element={<Proyecto04 />} />
        <Route path="/nosotros" element={<AboutUs />} />
        <Route path="/otraPagina" element={<OtraPagina />} />
        <Route path="/unauthorized" element={<NoAutorizados />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
