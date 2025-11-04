//aqui se hace la proteccion de rutas

import { Navigate } from 'react-router-dom';
import { useAutorizacion } from '../hooks/useAutorizacion';
import { Spinner, Container, Alert } from 'react-bootstrap';

const ProtectorRutas = ({ allowedRoles, children }) => {
    const { isAuthenticated, user } = useAutorizacion(); 
    //se trae al hook personalizado
    //con los 3 estados

    //1-Si no esta autenticado lo manda al login
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    //2-Si llegan roles definidos y el rol del usuario no esta en la lista
    if (allowedRoles && !allowedRoles.includes(user?.rol)) {   //si user existe
        return <Navigate to="/unauthorized" replace />;        //lo lleva a la pagina no autorizado
    }

    //3-Si esta autenticado y tiene rol permitido muestra children que seria la pagina protegida
    return children;
};

export default ProtectorRutas;
