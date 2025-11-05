import "./ejercicio2.css";
import "./ejercicio2.js"; // importamos el script externo

function Ejercicio2() {
  return (
    <div className="contenedor-principal">
      <section className="seccion">
        <h2>Calcular Promedio</h2>
        <p>Haz clic en el botón para ingresar 3 números</p>
        <button id="calcular">Calcular Promedio</button>
        <p id="resultado"></p>
      </section>
    </div>
  );
}

export default Ejercicio2;