import { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import '../assets/css/home.css';

function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const u = authService.getCurrentUser();
        setUser(u);
    }, []);
    
    if (!user) {
        return (
            <Container className="home-container" style={{ textAlign: 'center' }}>
                <h1 style={{ color: '#ff6b9d', fontWeight: 800 }}>Bienvenido</h1>
                <p style={{ color: '#666' }}>Para acceder a los minijuegos necesitas iniciar sesión.</p>
                <div style={{ marginTop: 20 }}>
                    <Button as={Link} to="/login" className="btn-custom-outline" style={{ marginRight: 10 }}>Iniciar sesión</Button>
                    <Button as={Link} to="/register" className="btn-custom-primary">Registrarse</Button>
                </div>
            </Container>
        );
    }

    return (
        <Container className="home-container">
            <Card className="home-card" style={{ maxWidth: 760, margin: '0 auto' }}>
                <Card.Header as="h5">Bienvenido, {user.username || user.nombres || 'Usuario'}</Card.Header>
                <Card.Body>
                    <Card.Title className="card-title">Tu perfil</Card.Title>
                    <ListGroup variant="flush" className="home-list">
                        <ListGroup.Item><span className="label">Nombre:</span><span className="value">{user.nombres || '-'} {user.apellidos || ''}</span></ListGroup.Item>
                        <ListGroup.Item><span className="label">Usuario:</span><span className="value">{user.username || '-'}</span></ListGroup.Item>
                        <ListGroup.Item><span className="label">Email:</span><span className="value">{user.email || '-'}</span></ListGroup.Item>
                        <ListGroup.Item><span className="label">Nivel de inglés:</span><span className="value">{user.nivelIngles || '-'}</span></ListGroup.Item>
                        <ListGroup.Item><span className="label">Motivación:</span><span className="value">{user.motivaciones || '-'}</span></ListGroup.Item>
                        <ListGroup.Item><span className="label">Horas/semana:</span><span className="value">{user.horasSemanales || '-'}</span></ListGroup.Item>
                        <ListGroup.Item>
                            <span className="label">Mejor puntuación:</span>
                            <span className="value"><Badge className="home-badge">{typeof user.maxPuntos === 'number' ? user.maxPuntos : 0}</Badge></span>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Home;