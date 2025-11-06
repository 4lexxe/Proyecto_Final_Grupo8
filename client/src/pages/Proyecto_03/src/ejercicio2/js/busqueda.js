export function buscarPorNombre(mascotas, nombre) {
    if (!nombre.trim()) return mascotas;
    
    return mascotas.filter(mascota => 
        mascota.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
}

export function crearInputBusqueda() {
    const busquedaDiv = document.createElement('div');
    busquedaDiv.id = 'busqueda';
    busquedaDiv.innerHTML = `
        <h3>Buscar Mascota por Nombre</h3>
        <input type="text" id="buscarNombre" placeholder="Nombre de la mascota">
        <button type="button" id="buscarBtn">Buscar</button>
        <button type="button" id="mostrarTodas">Mostrar todas</button>
    `;
    return busquedaDiv;
}
