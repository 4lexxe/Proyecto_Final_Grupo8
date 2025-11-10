import { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Badge } from 'react-bootstrap';
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
            <Container className="home-container">
                <h1 style={{ color: '#ff6b9d', fontWeight: 800 }}>Bienvenido</h1>
                <p style={{ color: '#666' }}>Para iniciar sesión, haz clic en "Iniciar sesión" en el menú superior.</p>
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