// Función que obtiene los valores de los inputs y los convierte en arrays de caracteres.
export function datos(){
    // Obtiene el valor de los 3 input como una cadena.
    let input1 = document.getElementById("sumando1").value
    let input2 = document.getElementById("sumando2").value
    let input3= document.getElementById("resultado").value

    // Crea un array con los valores divididos en caracteres individuales.
    let cadenas = [input1.split(''), input2.split(''), input3.split('')]
    return cadenas
}

// Función que encuentra la posición y el índice de 'x' en las cadenas proporcionadas.
export function encontrarX(cadenas){
    // Variable para almacenar los indices de la posicion respectiva de 'x'.
    let cadConX
    let posX
    let contX = 0

    // Objeto que almacenará los datos relacionados con la posición de 'x'.
    let datosX = {cadConX, posX, contX}
    
    // Itera sobre cada cadena en el array para buscar 'x'.
    for (let i = 0; i < cadenas.length; i++) {
        // Verifica si la cadena actual contiene 'x'.
        if (cadenas[i].includes('x')) {
            datosX.cadConX = i; 
            // Itera sobre cada carácter de la cadena que contiene 'x'.
            for (let j = 0; j < cadenas[i].length; j++) {
                // Verifica si el carácter actual es 'x'.
                if (cadenas[i][j] === 'x') {
                    datosX.posX = j; 
                    datosX.contX++
                }
            }
        }
    }
    return datosX
}

// Función que calcula el valor de 'x' y actualiza las cadenas con los resultados.
export function calcularEcuacion(cadenas, datosX){
    // Crea una copia de las cadenas para no modificar las originales.
    let cadenasCopia = [...cadenas]
    // Calcula los sumandos y resultado si no contiene 'x', de lo contrario null.
    let sum1 = datosX.cadConX !== 0 ? parseInt(cadenasCopia[0].join('')) : null
    let sum2 = datosX.cadConX !== 1 ? parseInt(cadenasCopia[1].join('')) : null
    let resu = datosX.cadConX !== 2 ? parseInt(cadenasCopia[2].join('')) : null

    // Determina qué valor calcular según la posición de 'x'.
    switch (datosX.cadConX) {
        case 0:
            sum1 = resu - sum2
            cadenasCopia[0] = sum1.toString().split('')
            break
        case 1:
            sum2 = resu - sum1
            cadenasCopia[1] = sum2.toString().split('')
            break
        case 2:
            resu = sum1 + sum2
            cadenasCopia[2] = resu.toString().split('')
            break
    }

    return cadenasCopia
}

// Función que valida las cadenas originales contra las resueltas y devuelve un código de estado.
export function validar(cadOriginal, cadResuelta, datosX){
    // Verifica si alguna de las cadenas originales está vacía.
    if (cadOriginal[0].length === 0 || cadOriginal[1].length === 0 || cadOriginal[2].length === 0) {
    return 1 
    }

    // Combina las cadenas y valida que solo contengan dígitos o 'x'.
    let valid = /^[0-9x]+$/.test(cadOriginal[0].join('') + cadOriginal[1].join('') + cadOriginal[2].join(''))
    if (!valid) {
        return 2
    }

    // Verifica que haya exactamente una 'x' en las cadenas.
    if (datosX.contX !== 1) {
        return 3
    }

    // Itera sobre los caracteres de la cadena que contiene 'x' para validar congruencia.
    for (let i = 0; i < cadOriginal[datosX.cadConX].length; i++) {
        if (cadResuelta[datosX.cadConX][i] !== cadOriginal[datosX.cadConX][i] && i !== datosX.posX || cadOriginal[datosX.cadConX].length !== cadResuelta[datosX.cadConX].length) {
            return 4
        }
    }

    return 5
}