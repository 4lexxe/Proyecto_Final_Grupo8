function ColoresBotones({ colorBotones, maneharClick }) {
    return(
        <div className="color-buttones-container">
            {colorBotones.map((c, i) => (
              <button
                key={i}
                className="color-button"
                onClick={maneharClick}
                style={{ backgroundColor: c }}> 
                    Boton {i + 1}            
                </button>
                ))
            }
        </div>
    )
}

export default ColoresBotones;