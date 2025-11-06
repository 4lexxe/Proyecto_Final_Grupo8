import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import '../assets/styles/FormJuegos.css';

export const ModificarJuego = ({ juego, funcion_modificar }) => {

    const [juegoModificado, setJuegoModificado] = useState({
        id: '',
        nombre: '',
        precio: 0,
        tipo: '',
        estado: true,
    });

    const cambiarNombre = (event) => { setJuegoModificado({ ...juegoModificado, nombre: event.target.value }); }
    const cambiarPrecio = (event) => { setJuegoModificado({ ...juegoModificado, precio: event.target.value }); }
    const cambiarTipo = (event) => { setJuegoModificado({ ...juegoModificado, tipo: event.target.value }); }

    const juego_modificado = {
        id: juego.id,
        nombre: juegoModificado.nombre === "" ? juego.nombre : juegoModificado.nombre,
        precio: juegoModificado.precio === 0 ? juego.precio : juegoModificado.precio,
        tipo: juegoModificado.tipo === "" ? juego.tipo : juegoModificado.tipo,
        estado: juegoModificado.estado === "" ? juego.estado : juegoModificado.estado,
        modificado: true
    }

    return (
        <>
            <div>
                <div>ID = {juego.id}</div>
                <Form.Group className="mb-2" controlId={`nombre-${juego.id}`}>
                    <Form.Control type="text" placeholder={juego.nombre} onChange={cambiarNombre} />
                </Form.Group>
                <Form.Group className="mb-2" controlId={`precio-${juego.id}`}>
                    <Form.Control type="number" placeholder={juego.precio} onChange={cambiarPrecio} />
                </Form.Group>
                <Form.Group className="mb-2" controlId={`tipo-${juego.id}`}>
                    <Form.Control type="text" placeholder={juego.tipo} onChange={cambiarTipo} />
                </Form.Group>

                <Button onClick={() => funcion_modificar(juego_modificado)}>Guardar Cambios</Button>
            </div>
        </>
    )
}
