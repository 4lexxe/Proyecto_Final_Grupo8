export function obtenerDatosMascota() {
    return {
        //referencio los formularios del html
        nombre: document.getElementById("nombreMascota").value,
        tipo: document.getElementById("tipoMascota").value,
        edad: document.getElementById("edad").value,
        duenio: document.getElementById("nombreDuenio").value,
        vacunada: document.getElementById("vacunaSi").checked ? true :
                  document.getElementById("vacunaNo").checked ? false : null
    };
}
