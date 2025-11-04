import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Error from "./pages/Error.jsx";
import Proyectos from "./pages/Proyectos.jsx";
import { AboutUs } from "./pages/AboutUs.jsx";
import OtraPagina from "./pages/OtraPagina.jsx";
import Home from "./pages/Home.jsx";
import { Games } from "./pages/Games.jsx";
import Login from "./pages/login/Login.jsx";
import ProtectorRutas from "./components/ProtectorRutas.jsx";
import NoAutorizados from "./pages/NoAutorizados.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      {/* Ruta de login sin Layout (pantalla completa) */}
      <Route path="/login" element={<Login />} />

      {/* Rutas con Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/proyectos"
          element={
            <ProtectorRutas allowedRoles={["ADMINISTRATIVO"]}>
              <Proyectos />
            </ProtectorRutas>
          }
        />
        <Route path="/games" element={<Games />} />
        <Route path="/nosotros" element={<AboutUs />} />
        <Route path="/otraPagina" element={<OtraPagina />} />
        <Route path="/unauthorized" element={<NoAutorizados />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
