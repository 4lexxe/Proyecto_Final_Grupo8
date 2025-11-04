import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAutorizacion } from '../hooks/useAutorizacion.js';

function Layout() {
    const { isAuthenticated, user, logout } = useAutorizacion(); //se trae el usuario, el estdo y la funcion logout

    const navigate = useNavigate();

    const manejarLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <Navbar expand="lg" bg="light" variant="light" className="shadow-sm mb-4"> {/* navbar con sombra y margen inferior */}
                <Container>
                    <Navbar.Brand className="fw-bold text-primary">GRUPO 8</Navbar.Brand> {/* marca destacada */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto gap-2"> {/* espacio entre enlaces */}
                            <Nav.Link href="/" className="text-secondary">Home</Nav.Link>
                            <Nav.Link href="/nosotros" className="text-secondary">Nosotros</Nav.Link>

                            {isAuthenticated && user?.rol === 'ADMINISTRATIVO' //si esta autenticado y su rol es ADMINISTRATIVO
                            && (<Nav.Link href="/proyectos" className="text-secondary">Proyectos</Nav.Link>)}

                            {isAuthenticated && user?.rol === 'ALUMNO' //si esta autenticado y su rol es ALUMNO
                            && (<Nav.Link href="/games" className="text-secondary">Games</Nav.Link>)}

                            <Nav.Link href="/otrapagina" className="text-secondary">Otra Pagina</Nav.Link>
                        </Nav>

                        <Nav className="ms-auto"> {/* alinea a la derecha */}
                            {isAuthenticated ?         //aparece el boton CerrasS si esta autenticado y sino IniciarS
                                (<Button variant="outline-danger" onClick={manejarLogout}>Cerrar sesion</Button>) 
                                : (<Nav.Link href="/" className="text-success">Iniciar sesion</Nav.Link>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section className="px-4"> {/* padding horizontal para el contenido */}
                <Outlet></Outlet>
            </section>
        </>
    );
}

export default Layout;

//Layout no es solo un menu ya que indica si el usuario esta logeado o no 
//y muestra diferentes opciones en el menu dependiendo del rol del usuario
