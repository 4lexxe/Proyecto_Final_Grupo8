 
/* //export function guardarInfo(){



//PARTE UNO START guardo los datos y los agrego al areglo push

let mascotas = [];

let mascotaId = 1;

let soloLetras = /^[A-Za-z\s]+$/; //+una o mas RegEx

let soloNumeros = /^[0-9]+$/; //para edad

document.getElementById("guardarB").addEventListener("click", function(){


    //referencio los formularios del html
    let nombreM = document.getElementById("nombreMascota").value;
    let tipoM = document.getElementById("tipoMascota").value;
    let edadM = document.getElementById("edad").value;
    let duenioM = document.getElementById("nombreDuenio").value;
    let vacunaSi = document.getElementById("vacunaSi").value;
    let vacunaNo = document.getElementById("vacunaNo").value;

    // Validar solo letras en nombre y dueño
    if (!soloLetras.test(nombreM) || !soloLetras.test(duenioM)) {
        alert("Los nombres solo pueden contener letras y espacios. No se permiten numeros ni simbolos");
        return; // se detiene todo si falla la validacion
    }

    // Validar solo numeros en edad
    if (!soloNumeros.test(edadM)) {
        alert("La edad solo puede contener numeros");
        return;
    }

    let isVacunada;

    if(document.getElementById("vacunaSi").checked){  //checked dice si un radio/bonton pequeño esta marcado o no
        isVacunada = true;
        console.log("esta vacunada");
    } else if (document.getElementById("vacunaNo").checked){
        isVacunada = false;
        console.log("no esta vacunada");
    } else {
        alert("debes seleccionar si la mascota esta vacuanda")
        return
    }

    let nuevaMascota = {
        id: mascotaId,
        nombre: nombreM,
        tipo: tipoM,
        edad: parseInt(edadM),
        duenio: duenioM,
        vacunada: isVacunada    

    }

    mascotas.push(nuevaMascota);
    mascotaId++;

    crearDivM();
    actualizarResumen();
    renderizarMascotas();

    document.getElementById("informacionMascota").reset();

//PARTE UNO END

function eliminarMascota(id) {
    const indice = mascotas.findIndex(m => m.id === id);
    if (indice !== -1) {
        mascotas.splice(indice, 1); // se borro
        renderizarMascotas();       // repinta la lista
        actualizarResumen();         // actualiza 
    }
}




//PARTE DOS START creo una listas para cada mascota

function crearDivM(){ // si no existe la lista, se crea una vez

        let listaMascotas = document.getElementById("listaMascotas"); //aqui es mentiraaa no hay una lista todavia
        if(!listaMascotas){

        nuevaLista = document.createElement("div"); //crea un div vacio
        nuevaLista.id = "listaMascotas";
        document.body.appendChild(nuevaLista);
        }
    }
    
    
    //listaMascotas.innerHTML = "<h3>Listado de Mascotas</h3>"; //se agrega un encabezado nuevo con los datos ingresados de div



    //recorre la lista y va agregando una mascota   

function renderizarMascotas() {

        let listaMascotas = document.getElementById("listaMascotas");
        listaMascotas.innerHTML = "<h3>Listado de Mascotas</h3>";

    mascotas.forEach(mascotaCopia => {  //-array - repeticion- contenedorCopia y funcion a ejecutar  

        let contenedor = document.createElement("div");

        let info = document.createElement("p"); //crea un parrafo

        info.textContent = //y en ese parrafo coloca los datos el contenido
        `Nombre: ${mascotaCopia.nombre}, 
        Tipo: ${mascotaCopia.tipo}, 
        Edad: ${mascotaCopia.edad}, 
        Dueño: ${mascotaCopia.duenio}, 
        Estado: ${mascotaCopia.vacunada ? "Vacunada" : "No vacunada"}`;  
        //si es true vacunada sino es false no vacunada

        // boton para borrar esta mascota usando su ID
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => eliminarMascota(mascotaCopia.id));

        contenedor.appendChild(info);
        contenedor.appendChild(botonEliminar);

        listaMascotas.appendChild(contenedor); 
        //listaMascotas es el padre y se le agrega un hijo info  
        //que muestra los datos
        //forEach es la version simple del for que recorre arrays
    });

}

//PARTE DOS END

    function actualizarResumen(){
        document.getElementById("totalMascotas").textContent = mascotas.length
        
        
        let resultadoVacSi = mascotas.filter(m => m.vacunada).length; //traeme todos(.length) los indices en donde sea vac sea true
        let resultadoVacNo = mascotas.filter(m => !m.vacunada).length; //aqui los que sean false
        //=> arrow function/funcion flecha version modernda de function
        //ya tiene el return
        //filter recorre todos los indices del array y crea una 
        //nueva array con los indices/elementos que cumplan la condicion
        //m referencia a nuevaMascota
        
        document.getElementById("totalVacunadas").textContent = resultadoVacSi; 
        document.getElementById("totalNoVacunadas").textContent = resultadoVacNo;
    }

    

})

//}  */