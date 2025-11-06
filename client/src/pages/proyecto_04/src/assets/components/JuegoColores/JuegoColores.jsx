import { useState, useEffect } from "react";
import ControlarBotones from "./ControlarBotones";
import ColoresBotones from "./ColoresBotones";
import "../../Styles/JuegoColores.css"

const colores = [
  "#ff1500ff",
  "#0099ffff", 
  "#09ff00ff", 
  "#fbff00ff", 
  "#ff00ffff", 
  "#b1086bff", 
  "#0609aaff", 
  "#0e7500ff", 
  "#ff8800ff",
  "#a0a0a0ff"  
];

function JuegoColores (){
    const [cantidadBotones, setCantidadBotones] = useState(2);
    const [colorBotones, setColorBotones] = useState(Array.from({ length: cantidadBotones }, () => colores[Math.floor(Math.random() * colores.length)]));    
    const [intentos, setIntentos] = useState(0)
    const [mensaje, setMensaje] = useState("")
    const [juegoTerminado, setJuegoTerminado] = useState(false)
    const [reiniciar, setReiniciar] = useState(false)

    const maneharClick = () => {
        if (juegoTerminado) return;
        const nuevosColores = colorBotones.map(() => {
            const indiceAleatorio = Math.floor(Math.random() * colores.length);
            return colores[indiceAleatorio];
        })
        setColorBotones(nuevosColores)
        setIntentos(intentos + 1)

    }

    useEffect(() => {
        const todosIguales = colorBotones.every(c => c === colorBotones[0]);
        if (todosIguales && intentos > 0) {
            setMensaje(`¡Ganaste en ${intentos} intentos!`);
            setJuegoTerminado(true);
        } else if (!juegoTerminado) {
            setMensaje(`Intentos = ${intentos}`);
        }
    }, [intentos, colorBotones, juegoTerminado]);

    useEffect(() => {
        setColorBotones(Array.from({ length: cantidadBotones }, () => colores[Math.floor(Math.random() * colores.length)]));    
        setIntentos(0);
        setMensaje("");
        setJuegoTerminado(false);
        setReiniciar(false);
    }, [cantidadBotones, reiniciar]);



    return(
        <div className="juegoColores-container">
            <h1 > Juego de colores</h1>
                <ControlarBotones cantidadBotones={cantidadBotones} setCantidadBotones={setCantidadBotones}/>
                <ColoresBotones colorBotones={colorBotones} maneharClick={maneharClick}/>
                <h2>{mensaje}</h2>
                {juegoTerminado ? 
                    <button 
                        className="boton-reiniciar"
                        onClick={() => setReiniciar(true)}
                        >Reiniciar Juego
                    </button> : null}        
            </div>
    )
}

export default JuegoColores