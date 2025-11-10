import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaHome, FaFolderOpen, FaGamepad, FaUsers, FaRocket } from 'react-icons/fa';
import { authService } from '../services/authService';
import './Navbar.css';

function NavigationBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar usuario al montar
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    // Escuchar el evento userLoggedIn
    const handleUserLoggedIn = () => {
      setTimeout(() => {
        const updatedUser = authService.getCurrentUser();
        setUser(updatedUser);
      }, 100);
    };

    window.addEventListener('userLoggedIn', handleUserLoggedIn);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLoggedIn);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  return (
    <Navbar className="custom-navbar" expand="xxl" sticky="top">
      <Container >
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaRocket className="me-2" />
          <span>Proyecto Grupo 8</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              <FaHome className="me-2" />
              Home
            </Link>
            <Link to="/proyectos" className="nav-link">
              <FaFolderOpen className="me-2" />
              Proyectos
            </Link>
            <Link to="/games" className="nav-link">
              <FaGamepad className="me-2" />
              Juegos
            </Link>
            <Link to="/nosotros" className="nav-link">
              <FaUsers className="me-2" />
              Nosotros
            </Link>
          </Nav>
          
          <Nav className="align-items-center">
            <span className="user-greeting me-3">
              Hola, <strong>{user ? user.nombres : 'Invitado'}</strong>
            </span>
            
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle className="dropdown-toggle-custom" id="dropdown-user">
                  <FaUser className="me-2" />
                  {user.nombres || user.username}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-custom">
                  <Dropdown.ItemText className="user-info">
                    <div className="user-avatar">
                      <FaUser size={24} />
                    </div>
                    <strong>{user.nombres} {user.apellidos}</strong>
                    <br />
                    <small className="text-muted">{user.email}</small>
                    <br />
                    <small className="text-muted">Max Puntos: {user.maxPuntos || 0}</small>
                  </Dropdown.ItemText>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="logout-item">
                    <FaSignOutAlt className="me-2" />
                    Cerrar Sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button 
                  className="btn-custom-outline me-2"
                  onClick={() => navigate('/login')}
                >
                  <FaUser className="me-2" />
                  Iniciar Sesión
                </Button>
                <Button 
                  className="btn-custom-primary"
                  onClick={() => navigate('/register')}
                >
                  <FaRocket className="me-2" />
                  Registrarse
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
