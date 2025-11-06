import { useState, useMemo } from "react";
import { Form, Button } from 'react-bootstrap';
import '../assets/styles/FormJuegos.css';

export const BuscarJuego = ({ juegos }) => {
    const [ingreso, setIngreso] = useState("");
    const [busqueda, setBusqueda] = useState(false);

    const ingresar = (e) => {
        setBusqueda(false);
        setIngreso(parseInt(e.target.value));
    }

   const handleClick = () => {
    setBusqueda(true)
    }

    const resultado = useMemo(() => {
        const newArreglo = juegos.filter((producto) => producto.id === ingreso)
        return newArreglo;
    }, [ingreso, juegos]);

    return (
        <>
            <h1>Buscar Juego por ID</h1>
            <Form.Group className="d-flex gap-2" controlId="buscarId">
                <Form.Control
                    type="number"
                    placeholder="Buscar juego por ID"
                    onChange={ingresar}
                />
                <Button onClick={handleClick}>Buscar</Button>
            </Form.Group>
            {busqueda && resultado.length > 0 ?
                <div className="resultado">
                ID: {resultado[0].id} - 
                Nombre: {resultado[0].nombre} - 
                Precio: ${resultado[0].precio} - 
                Tipo: {resultado[0].tipo}
            </div>
            : (busqueda && <h2>No se encontró ningún juego con ese ID</h2>)
            }
        </>
    )
}
