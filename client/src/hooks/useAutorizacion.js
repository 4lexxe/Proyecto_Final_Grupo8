//gestiona el null del contexto de AutorizacionContext

import { useContext } from "react";
import { AutorizacionesContext } from "../context/AutorizacionContext.jsx";

export function useAutorizacion() {
    const context = useContext(AutorizacionesContext); //se consume AutorizacionesContext

    if (context === null) { //revisar si es nulo
        throw new Error("useAutorizacion debe usarse dentro de AutorizacionesProvider");
    }

    return context;
}

