import Saludo from "./proyecto_04/src/assets/components/Saludo";
import AdivinarNumero from "./proyecto_04/src/assets/components/AdivinarNumero/AdivinarNumero";
import JuegoColores from "./proyecto_04/src/assets/components/JuegoColores/JuegoColores";
import "./proyecto_04/src/App.css";

function Proyecto04() {
  return (
    <div className="app-container">
      <div className="content-column">
        <div className="box" id="saludo">
          <Saludo />
        </div>
        <div className="box" id="adivinar-numero">
          <AdivinarNumero />
        </div>
        <div className="box" id="juego-colores">
          <JuegoColores />
        </div>
      </div>
    </div>
  );
}

export default Proyecto04;
