import { useState, useCallback } from "react";
import { ModificarJuego } from "./ModificarJuego.jsx";
import { BuscarJuego } from "./BuscarJuego.jsx";
import { Form, Button } from 'react-bootstrap';
import '../assets/styles/FormJuegos.css';

function FormJuegos() {

    const [juegos, setJuegos] = useState([])

    const [formulario, setFormulario] = useState({
        id: '',
        nombre: '',
        precio: '',
        tipo: '',
        estado: true,
        modificado: true
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormulario({ ...formulario, [name]: value })
    }

    const agregarJuego = (e) => {
        e.preventDefault()
        const nuevoJuego = {
            ...formulario,
            id: Date.now(),
            nombre: formulario.nombre,
            precio: parseFloat(formulario.precio),
            tipo: formulario.tipo,
        }

        setJuegos([...juegos, nuevoJuego])
        setFormulario({
            id: '',
            nombre: '',
            precio: '',
            tipo: '',
            estado: true,
            modificado: true
        })
    }

    const agregar_modificado = (juego_modificado) => {
        const nuevo_arreglo = juegos.map(j => {
            if (j.id === juego_modificado.id) {
                return juego_modificado;
            }
            return j;
        }
        )
        setJuegos(nuevo_arreglo)
    }

    const modificar = useCallback((j) => {
        setJuegos(prevJuegos => prevJuegos.map(a =>
            a.id === j.id ? { ...a, modificado: !a.modificado } : a
        ))
    }, [])

    return (
        <div className="form-juegos-container">
            <div className="form-juegos-header">
              <h1>Cargar Juegos</h1>
            </div>
            <Form onSubmit={agregarJuego}>
                <Form.Group className="mb-2" controlId="nombre">
                    <Form.Control
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-2" controlId="precio">
                    <Form.Control
                        min="0"
                        type="number"
                        name="precio"
                        placeholder="Precio Unitario"
                        value={formulario.precio}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-2" controlId="tipo">
                    <Form.Control
                        type="text"
                        name="tipo"
                        placeholder="Tipo"
                        value={formulario.tipo}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button type="submit">Agregar Juego</Button>
            </Form>

            {juegos.length > 0 && <h2>Lista de Juegos</h2>}
            <ul className="lista-juegos">
                {juegos.map((j) => (
                    <li key={j.id}>
                        {j.modificado === false ? (
                            <ModificarJuego juego={j} funcion_modificar={agregar_modificado} modificar={modificar} />
                        ) : (
                            <div className="juego-detalle">
                                ID: {j.id} -
                                Nombre: {j.nombre} -
                                Precio: ${j.precio} -
                                Tipo: {j.tipo}
                            </div>
                        )}
                        <div className="lista-actions">
                          <Button variant="secondary" size="sm" onClick={() => modificar(j)}>
                              Modificar
                          </Button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="buscar-juego">
              <BuscarJuego juegos={juegos}>Texto</BuscarJuego>
            </div>
        </div>
    )
}

export default FormJuegos;