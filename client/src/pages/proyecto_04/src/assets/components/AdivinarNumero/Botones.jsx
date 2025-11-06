function Botones({ rendirse, juegoTerminado, manejarVerificar, reiniciarJuego }) {
  return (
    <div className="botones-row">
  <button
    type="button"
    onClick={manejarVerificar}
    disabled={juegoTerminado}
  >
    Verificar
  </button>
  { !juegoTerminado ? (
      <button onClick={rendirse}>Me rindo</button>
    ) : (
      <button onClick={reiniciarJuego}>Reiniciar</button>
    )
  }
</div>
  );
}


export default Botones;