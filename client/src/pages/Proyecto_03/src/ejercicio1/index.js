// Importación de las funciones necesarias desde el módulo operaciones.js.
import {datos, encontrarX, calcularEcuacion, validar} from "./component/operaciones.js"

// Asignación de la función al evento onclick del botón para procesar la suma.
document.getElementById('calcular-btn').onclick = function() {
    let cadenas = datos()
    let datosX = encontrarX(cadenas)
    let cadenasResueltas = calcularEcuacion(cadenas, datosX)
    
    // Evalúa el resultado de la validación y muestra el resultado o error correspondiente.
    switch(validar(cadenas, cadenasResueltas, datosX)){
        case 1:
            document.getElementById('error-message').textContent = "No puedes ingresar valores de la suma vacíos"
            break
        case 2:
            document.getElementById('error-message').textContent = "Solo puedes ingresar números y 'x'"
            break
        case 3:
            document.getElementById('error-message').textContent = "Debes ingresar una sola 'x' como incógnita de un dígito"
            break
        case 4:
            document.getElementById('error-message').textContent = "Los valores de la suma que ingresaste no son correctos"
            break
        case 5:
            let resultadoX = document.getElementById('resultado-x')
            let ecuacion = document.getElementById('ecuacion')
            resultadoX.textContent = "Valor de X: " + cadenasResueltas[datosX.cadConX][datosX.posX];
            ecuacion.textContent = "Ecuacion: " + cadenasResueltas[0].join('') + " + " + cadenasResueltas[1].join('') + " = " + cadenasResueltas[2].join('')
            resultadoX.classList.add('active')
            ecuacion.classList.add('active')
            document.getElementById('error-message').textContent = ""
            break
    }
}