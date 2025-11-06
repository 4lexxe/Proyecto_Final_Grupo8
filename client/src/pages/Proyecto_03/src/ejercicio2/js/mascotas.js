import { mascotas, getNuevoId } from './datos.js';
import { actualizarResumen } from './resumen.js';

export function agregarMascota(mascota) {
    mascota.id = getNuevoId();
    mascota.edad = parseInt(mascota.edad);
    mascotas.push(mascota); // se agrega una nueva mascota a la lista
}

export function eliminarMascota(id) {
    const indice = mascotas.findIndex(m => m.id === id);
    if (indice !== -1) {
        mascotas.splice(indice, 1); // se borra
        renderizarMascotas();       // reseta la lista
        actualizarResumen();        // actualiza 
    }
}

export function crearDivM() {  // crea la lista
    if (!document.getElementById("listaMascotas")) {
        const nuevaLista = document.createElement("div"); //crea un div vacio
        nuevaLista.id = "listaMascotas";
        document.body.appendChild(nuevaLista);
    }
}

export function renderizarMascotas() {
    const listaMascotas = document.getElementById("listaMascotas");
    listaMascotas.innerHTML = "<h3>Listado de Mascotas</h3>";

    const gridContainer = document.createElement("div");
    gridContainer.className = "mascotas-grid";

    mascotas.forEach(mascota => {
        const card = document.createElement("div");
        card.className = "mascota-card";

        // Determinar la imagen según el tipo de mascota
        let imagenSrc = "../imagenes/";
        switch(mascota.tipo.toLowerCase()) {
            case 'perro':
                imagenSrc += "perro.png";
                break;
            case 'gato':
                imagenSrc += "gato.png";
                break;
            case 'conejo':
                imagenSrc += "conejo.png";
                break;
            case 'pajaro':
                imagenSrc += "pajaro.png";
                break;
            default:
                imagenSrc += "otro.png";
        }

        card.innerHTML = `
            <img src="${imagenSrc}" alt="${mascota.tipo}" class="mascota-image">
            <div class="mascota-info">
                <strong>${mascota.nombre}</strong><br>
                ${mascota.tipo} - ${mascota.edad} años<br>
                Dueño: ${mascota.duenio}<br>
                ${mascota.vacunada ? "Vacunada" : "No vacunada"}
            </div>
        `;

        // Agregar botón de eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "mascota-eliminar";
        botonEliminar.addEventListener("click", () => eliminarMascota(mascota.id));
        card.appendChild(botonEliminar);

        gridContainer.appendChild(card);
    });

    listaMascotas.appendChild(gridContainer);
}
