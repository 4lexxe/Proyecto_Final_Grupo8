function   ControlarBotones({cantidadBotones, setCantidadBotones}) {
    return(
        <div className="botones-container">
            <button
                onClick={() => setCantidadBotones(cantidadBotones + 1)}
                >
                Agregar Boton
            </button>
            <button
                onClick={() => cantidadBotones > 2 ? setCantidadBotones(cantidadBotones - 1) : null}
                >
                Quitar Boton
            </button>
        </div>
    )
}

export default ControlarBotones;