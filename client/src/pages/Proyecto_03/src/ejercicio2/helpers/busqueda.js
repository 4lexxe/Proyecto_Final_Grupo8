export function buscarPorNombre(mascotas, nombre) {
  if (!nombre.trim()) return mascotas;
  return mascotas.filter((m) =>
    m.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
}
