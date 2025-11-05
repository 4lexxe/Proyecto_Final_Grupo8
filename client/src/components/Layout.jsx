import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAutorizacion } from '../hooks/useAutorizacion.js';
import { FaHome, FaUsers, FaFolderOpen, FaGamepad, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

function Layout() {
    const { isAuthenticated, logout } = useAutorizacion();
    const navigate = useNavigate();

    const manejarLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <Navbar expand="lg" bg="light" variant="light" className="shadow-sm mb-4">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold text-primary mx-auto mx-lg-0">
                        GRUPO 8
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                        <Nav className="gap-3 align-items-center">
                            <Nav.Link as={Link} to="/" className="text-secondary d-flex align-items-center gap-2">
                                <FaHome /> Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/nosotros" className="text-secondary d-flex align-items-center gap-2">
                                <FaUsers /> Nosotros
                            </Nav.Link>

                            <Nav.Link as={Link} to="/proyectos" className="text-secondary d-flex align-items-center gap-2">
                                <FaFolderOpen /> Proyectos
                            </Nav.Link>

                            <Nav.Link as={Link} to="/games" className="text-secondary d-flex align-items-center gap-2">
                                <FaGamepad /> Games
                            </Nav.Link>

                            <div className="vr d-none d-lg-block" style={{ height: '30px' }}></div>

                            {isAuthenticated ? (
                                <Button 
                                    variant="outline-danger" 
                                    onClick={manejarLogout}
                                    className="d-flex align-items-center gap-2"
                                >
                                    <FaSignOutAlt /> Cerrar sesión
                                </Button>
                            ) : (
                                <Nav.Link 
                                    as={Link}
                                    to="/login" 
                                    className="text-success d-flex align-items-center gap-2 fw-bold"
                                >
                                    <FaSignInAlt /> Iniciar sesión
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section className="px-4">
                <Outlet></Outlet>
            </section>
        </>
    );
}

export default Layout;
