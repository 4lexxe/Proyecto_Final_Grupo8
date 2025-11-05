import { useState } from "react";
import "../Styles/Saludo.css";

function Saludo() {
  const [nombres, setNombres] = useState([]);
  const [nombreActual, setNombreActual] = useState("");

  const handleInputChange = (e) => {
    setNombreActual(e.target.value);
  };

  const handleAgregarNombre = () => {
    if (nombreActual.trim() !== "") {
      setNombres([...nombres, nombreActual.trim()]);
      setNombreActual("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAgregarNombre();
    }
  };
  return (
    <div className="saludo-container">
      <h1>Saludo 👋</h1>
      <input
        className="input-nombre"
        type="text"
        value={nombreActual}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Ingresa un nombre"
      />
      <button onClick={handleAgregarNombre}>Agregar</button>
      {nombres.map((n, i) => (
        <h2 key={i}>Hola React, soy {n}</h2>
      ))}
    </div>
  );
}

export default Saludo;