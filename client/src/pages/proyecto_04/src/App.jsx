import Saludo from './assets/components/Saludo'
import AdivinarNumero from './assets/components/AdivinarNumero/AdivinarNumero';
import JuegoColores from './assets/components/JuegoColores/JuegoColores';
import './App.css'

function App() {
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

export default App;