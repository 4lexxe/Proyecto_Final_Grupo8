import { createContext, useState, useMemo, useCallback, useEffect } from "react";

// Crear el contexto - solo contexto

export const AutorizacionesContext = createContext(null);

// Componente proveedor del contexto de Autenticacion - solo componente

export const AutorizacionesProvider = ({ children }) => {
    //controla el estado del usuario
    const [user, setUser] = useState(() => {
        try {                                                             //API navegador
            const storedUser = localStorage.getItem('LOCAL_STORAGE_KEY'); //espacio temporal
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error){
            console.error("Error durante LOCAL_STORAGE_KEY:", error.message);
            localStorage.removeItem('LOCAL_STORAGE_KEY');
            return null;
        }
    }); 


    //const [isLoading, setIsLoading] = useState(false);

    //const [token, setToken] = useState(null);


    const login = useCallback((credentials) => {
        //setIsLoading(true);

        try {
            const usuarioEncontrado = usuariosGuardados.find(    //coincidencia
                (u) => 
                    u.username === credentials.username &&
                    u.password === credentials.password     
            );
        
        if (usuarioEncontrado) { //tipo de usuario
            const { /* password, */ ...userWithoutPassword } = usuarioEncontrado;
            setUser(userWithoutPassword); //quita el password para que no sea visible a los childrens
            //setIsLoading(false);
            return { success: true }; //Retorna exito 
            } else {
                setUser(null);  
                //setIsLoading(false); //Desactivar carga aqui
                return { success: false, message: "Credenciales invalidas" }; //retorna objeto error
            }
        }  catch (error) {
            console.error("Error durante el login:", error.message);
            //setIsLoading(false);
            return { success: false, message: "Error durante el login" };
        }
}, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('LOCAL_STORAGE_KEY', JSON.stringify(user));
        } else {
            localStorage.removeItem('LOCAL_STORAGE_KEY');
        }
    }, [user]);

    const valorDelContexto = useMemo(() => ({
        user,
        isAuthenticated: !!user, //indicacion si esta autenticado
        //isLoading,
        login,
        logout,
    }), [user, /* isLoading */ login, logout]);

    return (
        <AutorizacionesContext.Provider value={valorDelContexto}>
            {children}
        </AutorizacionesContext.Provider>
    );
}