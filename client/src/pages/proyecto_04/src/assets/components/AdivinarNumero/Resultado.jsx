function Resultado({ mensaje, error }) {
if (error) {
  return <p className="resultado" style={{ color: "red" }}>{error}</p>;
}
return <p className="resultado">{mensaje}</p>;
}

export default Resultado;