import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaFolder, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Proyectos = () => {
    const proyectos = [
        {
            numero: 2,
            titulo: 'Proyecto 2 - JavaScript Básico',
            descripcion: 'Ejercicios de JavaScript: cálculos, promedios, cadenas y formularios',
            ejercicios: [
                { nombre: 'Ejercicio 1 - Comparar Números', path: '/proyectos/2/ejercicio1' },
                { nombre: 'Ejercicio 2 - Calcular Promedio', path: '/proyectos/2/ejercicio2' },
                { nombre: 'Ejercicio 3 - Procesamiento de Cadenas', path: '/proyectos/2/ejercicio3' },
                { nombre: 'Ejercicio 4 - Formulario Estudiante', path: '/proyectos/2/ejercicio4' },
                { nombre: 'Ejercicio 5 - Simulador de Salario', path: '/proyectos/2/ejercicio5' }
            ]
        },
        {
            numero: 3,
            titulo: 'Proyecto 3',
            descripcion: 'Próximamente...',
            ejercicios: []
        },
        {
            numero: 4,
            titulo: 'Proyecto 4 - React Interactivo',
            descripcion: 'Juegos interactivos: Adivina el Número y Juego de Colores',
            ejercicios: [
                { nombre: 'Ver Proyecto 4 - Juegos React', path: '/proyecto04' }
            ]
        },
        {
            numero: 5,
            titulo: 'Proyecto 5 - React Avanzado',
            descripcion: 'Gestión de juegos y el juego Atrapa las Estrellas',
            ejercicios: [
                { nombre: 'Ver Proyecto 5 - Formularios y Juegos', path: '/proyecto05' }
            ]
        }
    ];

    return (
        <Container className="py-4">
            <h1 className="mb-4 text-center">
                <FaFolder className="me-2" />
                Proyectos del Grupo 8
            </h1>
            
            <Row className="g-4">
                {proyectos.map((proyecto) => (
                    <Col key={proyecto.numero} xs={12} md={6} lg={6}>
                        <Card className="h-100 shadow-sm">
                            <Card.Header className="bg-primary text-white">
                                <h5 className="mb-0">
                                    <FaFolder className="me-2" />
                                    {proyecto.titulo}
                                </h5>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text className="text-muted mb-3">
                                    {proyecto.descripcion}
                                </Card.Text>
                                
                                {proyecto.ejercicios.length > 0 ? (
                                    <div>
                                        <h6 className="mb-3">Ejercicios disponibles:</h6>
                                        <div className="d-flex flex-column gap-2">
                                            {proyecto.ejercicios.map((ejercicio, idx) => (
                                                <Link
                                                    key={idx}
                                                    to={ejercicio.path}
                                                    className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-between text-decoration-none"
                                                >
                                                    <span>{ejercicio.nombre}</span>
                                                    <FaArrowRight size={12} />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-muted py-3">
                                        <p>Sin ejercicios disponibles aún</p>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Proyectos;