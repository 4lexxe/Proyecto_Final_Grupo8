import { obtenerDatosMascota } from './obtenerDatos.js';
import { validarDatos } from './validar.js';
import { agregarMascota, crearDivM, renderizarMascotas } from './mascotas.js';
import { actualizarResumen } from './resumen.js';
import { buscarPorNombre, crearInputBusqueda } from './busqueda.js';
import { mascotas } from './datos.js';

document.addEventListener('DOMContentLoaded', function() {
    // Crear input de búsqueda
    const resumen = document.getElementById('resumen');
    const inputBusqueda = crearInputBusqueda();
    resumen.parentNode.insertBefore(inputBusqueda, resumen.nextSibling);
    
    // Event listeners para búsqueda
    document.getElementById('buscarBtn').addEventListener('click', function() {
        const nombre = document.getElementById('buscarNombre').value;
        const resultados = buscarPorNombre(mascotas, nombre);
        mostrarResultados(resultados);
    });
    
    document.getElementById('mostrarTodas').addEventListener('click', function() {
        document.getElementById('buscarNombre').value = '';
        renderizarMascotas();
    });
});

function mostrarResultados(resultados) {
    const listaMascotas = document.getElementById('listaMascotas');
    listaMascotas.innerHTML = '<h3>Resultados de Búsqueda</h3>';
    
    if (resultados.length === 0) {
        listaMascotas.innerHTML += '<p>No se encontraron mascotas.</p>';
        return;
    }
    
    const gridContainer = document.createElement("div");
    gridContainer.className = "mascotas-grid";
    
    resultados.forEach(mascota => {
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

        gridContainer.appendChild(card);
    });

    listaMascotas.appendChild(gridContainer);
}

document.getElementById("guardarB").addEventListener("click", function() {
    const mascota = obtenerDatosMascota();
    if (!validarDatos(mascota)) return;

    agregarMascota(mascota);
    crearDivM();
    renderizarMascotas();
    actualizarResumen();

    document.getElementById("informacionMascota").reset();
});
