import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormJuegos from './proyecto_05/src/components/FormJuegos.jsx';
import AtrapaEstrellas from './proyecto_05/src/components/AtrapaEstrellas.jsx';
import './proyecto_05/src/assets/styles/FormJuegos.css';
import './proyecto_05/src/assets/styles/AtrapaEstrellas.css';

function Proyecto05() {
  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Proyecto 05 - React Avanzado</h1>
      
      <Row className="g-4">
        <Col xs={12} lg={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">Gestión de Juegos</h5>
            </Card.Header>
            <Card.Body>
              <FormJuegos />
            </Card.Body>
          </Card>
        </Col>
        
        <Col xs={12} lg={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-warning text-dark">
              <h5 className="mb-0">Atrapa las Estrellas</h5>
            </Card.Header>
            <Card.Body className="d-flex align-items-center justify-content-center">
              <AtrapaEstrellas />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Proyecto05;
