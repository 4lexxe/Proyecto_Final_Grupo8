import { useState } from "react";
import { validarDatos } from "./helpers/validar";
import { buscarPorNombre } from "./helpers/busqueda";
import "./styles/Styles.css";

function Ejercicio2() {
  const [mascotas, setMascotas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("Perro");
  const [edad, setEdad] = useState("");
  const [duenio, setDuenio] = useState("");
  const [vacunada, setVacunada] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  // --- Calcular totales para el resumen ---
  const total = mascotas.length;
  const vacunadas = mascotas.filter((m) => m.vacunada).length;
  const noVacunadas = mascotas.filter((m) => !m.vacunada).length;

  // --- Guardar mascota ---
  const guardarMascota = () => {
    const nuevaMascota = { nombre, tipo, edad, duenio, vacunada };
    if (!validarDatos(nuevaMascota)) return;

    setMascotas([...mascotas, { ...nuevaMascota, id: Date.now() }]);
    setNombre("");
    setTipo("Perro");
    setEdad("");
    setDuenio("");
    setVacunada(null);
  };

  // --- Eliminar mascota ---
  const eliminarMascota = (id) => {
    setMascotas(mascotas.filter((m) => m.id !== id));
  };

  // --- Filtrado por nombre ---
  const resultados = busqueda.trim()
    ? buscarPorNombre(mascotas, busqueda)
    : mascotas;

  return (
    <div className="container">
      <h1>Registro de Mascotas</h1>
      <h2>Control de vacunación</h2>

      {/* FORMULARIO */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          guardarMascota();
        }}
        id="informacionMascota"
      >
        <label>
          Nombre de la mascota:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        <label>
          Tipo de mascota:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option>Perro</option>
            <option>Gato</option>
            <option>Conejo</option>
            <option>Pajaro</option>
            <option>Otro</option>
          </select>
        </label>

        <label>
          Edad:
          <input
            type="text"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </label>

        <label>
          Nombre del dueño:
          <input
            type="text"
            value={duenio}
            onChange={(e) => setDuenio(e.target.value)}
            required
          />
        </label>

        <div>
          <span>¿Está vacunada?</span>
          <label>
            <input
              type="radio"
              checked={vacunada === true}
              onChange={() => setVacunada(true)}
            />{" "}
            Sí
          </label>
          <label>
            <input
              type="radio"
              checked={vacunada === false}
              onChange={() => setVacunada(false)}
            />{" "}
            No
          </label>
        </div>

        <button type="submit">Guardar datos</button>
      </form>

      {/* RESUMEN */}
      <div id="resumen">
        <p>Total de mascotas: <span>{total}</span></p>
        <p>Mascotas vacunadas: <span>{vacunadas}</span></p>
        <p>Mascotas no vacunadas: <span>{noVacunadas}</span></p>
      </div>

      {/* BUSCADOR */}
      <div id="busqueda">
        <h3>Buscar Mascota por Nombre</h3>
        <input
          type="text"
          placeholder="Nombre de la mascota"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button type="button" onClick={() => setBusqueda("")}>
          Mostrar todas
        </button>
      </div>

      {/* LISTA DE MASCOTAS */}
      <div id="listaMascotas">
        <h3>Listado de Mascotas</h3>
        <div className="mascotas-grid">
          {resultados.length === 0 ? (
            <p>No se encontraron mascotas.</p>
          ) : (
            resultados.map((m) => (
              <div key={m.id} className="mascota-card">
                <img
                  src={`./imagenes/${m.tipo.toLowerCase()}.png`}
                  alt={m.tipo}
                  className="mascota-image"
                  onError={(e) => (e.target.src = "./imagenes/otro.png")}
                />
                <div className="mascota-info">
                  <strong>{m.nombre}</strong>
                  <br />
                  {m.tipo} - {m.edad} años
                  <br />
                  Dueño: {m.duenio}
                  <br />
                  {m.vacunada ? "Vacunada" : "No vacunada"}
                </div>
                <button
                  className="mascota-eliminar"
                  onClick={() => eliminarMascota(m.id)}
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Ejercicio2;
