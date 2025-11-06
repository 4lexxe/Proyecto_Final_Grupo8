import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar.jsx";
import Error from "./pages/Error.jsx";
import Proyectos from "./pages/Proyectos.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import OtraPagina from "./pages/OtraPagina.jsx";
import Home from "./pages/Home.jsx";
import { Games } from "./pages/Games.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import NoAutorizados from "./pages/NoAutorizados.jsx";
import Proyecto04 from "./pages/Proyecto04.jsx";
import Proyecto05 from "./pages/Proyecto05.jsx";
import Ejercicio1 from './pages/Proyecto_02/ejercicio1/ejercicio1.jsx';
import Ejercicio2 from './pages/Proyecto_02/Ejercicio2/ejercicio2.jsx';
import Ejercicio3 from './pages/Proyecto_02/Ejercicio3/ejercicio3.jsx';
import Ejercicio4 from './pages/Proyecto_02/Ejercicio4/ejercicio4.jsx';
import SimuladorSalario from './pages/Proyecto_02/ejercicio5/SimuladorSalario.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Routes>
        {/* Rutas de autenticación sin Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas con Navbar y protegidas */}
        <Route path="/*" element={
          <ProtectedRoute>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/proyectos" element={<Proyectos />} />
              <Route path="/games" element={<Games />} />
              <Route path="/proyecto04" element={<Proyecto04 />} />
              <Route path="/proyecto05" element={<Proyecto05 />} />
              <Route path="/nosotros" element={<AboutUs />} />
              <Route path="/otraPagina" element={<OtraPagina />} />
              <Route path="/unauthorized" element={<NoAutorizados />} />
              <Route path="/proyecto02/ejercicio1" element={<Ejercicio1 />} />
              <Route path="/proyecto02/ejercicio2" element={<Ejercicio2 />} />
              <Route path="/proyecto02/ejercicio3" element={<Ejercicio3 />} />
              <Route path="/proyecto02/ejercicio4" element={<Ejercicio4 />} />
              <Route path="/proyecto02/ejercicio5" element={<SimuladorSalario />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
