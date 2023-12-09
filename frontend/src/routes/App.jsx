import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
//importar informacion del usuraio
import { useAuth } from "../context/AuthContext";

function App() {
  const { user } = useAuth();
  const role = user.roles.name;
  return (
    <>
      {role === 'user' ? (<Container className="mt-5">
      <Row>
        <Col>
          <h1>Bienvenido a la Postulación de Subsidios</h1>
          <p>
            En esta plataforma, puedes realizar la postulación para diferentes subsidios disponibles.
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Subsidio de Vivienda</Card.Title>
              <Card.Text>
                Obtén ayuda para financiar la compra de tu vivienda.
              </Card.Text>
              <Button variant="primary" href="/postular/">Postular</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Subsidio de Gastos basico</Card.Title>
              <Card.Text>
                Apoyo económico para tus Gasto Basicos.
              </Card.Text>
              <Button variant="primary" href="/postular">Postular</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Subsidio de Salud</Card.Title>
              <Card.Text>
                Accede a beneficios para tus gastos médicos.
              </Card.Text>
              <Button variant="primary" href="/postular">Postular</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Otros Subsidios</Card.Title>
              <Card.Text>
                Explora otros subsidios disponibles.
              </Card.Text>
              <Button variant="primary" href="/postular">Postular</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>) : (<Container className="mt-5">
      <Row>
        <Col>
          <h1>Evaluador de Postulaciones</h1>
          <p>
            Bienvenido al sistema de evaluación de postulaciones. Aquí puedes revisar y evaluar las postulaciones
            recibidas para los subsidios.
          </p>
          <Button variant="primary" href="/Postulaciones">
            Ver Postulaciones
          </Button>
        </Col>
      </Row>
    </Container>)}    
    </>
    
  );
}

export default App;

