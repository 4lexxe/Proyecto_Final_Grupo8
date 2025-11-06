function EntradaNumero({numeroIngresado, setNumeroIngresado, juegoTerminado, manejarVerificar}) {
  // Actualiza el valor del input en el padre
  const manejarCambio = (e) => {
    setNumeroIngresado(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      manejarVerificar();
    }
  }

  return (
    <div className="entrada-numero">
      <input
        id="entrada-numero"
        type="number"
        step="1"
        min="1"
        max="100"
        value={numeroIngresado}
        onChange={manejarCambio}
        disabled={juegoTerminado}
        onKeyDown={handleKeyDown}
        placeholder="Ej: 42"
      />
    </div>
  );
}

export default EntradaNumero;
