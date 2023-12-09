import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { logout } from '../services/auth.service';



function NavbarEvaluador({navigate} ) {
  const [currentSection, setCurrentSection] = useState();
  const handleNavItemClick = (e,section) => {
    e.preventDefault();
    setCurrentSection(section);
    navigate('/'+section);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  const getLinkStyle = (section) => ({
    backgroundColor: currentSection === section ? '#ffd700' : '',
    color: currentSection === section ? 'black' : ''
  });

  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentSection = currentPath.substring(1);
    setCurrentSection(currentSection);
  })

  return (
    <Navbar bg="dark" data-bs-theme="dark"  className='py-0 px-2'  expand="lg">
      <Navbar.Brand href="/">Aplicación de Subsidios</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            href="/"
            onClick={(e) => handleNavItemClick(e,'')}
            style={getLinkStyle('')}
          >
            Inicio
          </Nav.Link>
          <Nav.Link
            href="/Subsidios"
            onClick={(e) => handleNavItemClick(e,'Subsidios')}
            style={getLinkStyle('Subsidios')}
          >
            Subsidios
          </Nav.Link>
          <Nav.Link
            href="/categorias"
            onClick={(e) => handleNavItemClick(e,'Categorias')}
            style={getLinkStyle('Categorias')}
          >
            Categorias
          </Nav.Link>
          <Nav.Link
            href="/Postulaciones"
            onClick={(e) => handleNavItemClick(e,'Postulaciones')}
            style={getLinkStyle('Postulaciones')}
          >
            Postulaciones
          </Nav.Link>
          <Nav.Link
            href="/Evaluaciones"
            onClick={(e) => handleNavItemClick(e,'Evaluaciones')}
            style={getLinkStyle('Evaluaciones')}
          >
            Evaluaciones
          </Nav.Link>
          <Nav.Link
            href="/Motivo"
            onClick={(e) => handleNavItemClick(e,'Motivo')}
            style={getLinkStyle('Motivo')}
          >
            Motivo de rechazo
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end py-0">
          <Navbar.Text className='mx-2 my-0'>
            Registrado como: Evaluador 
          </Navbar.Text>
          <Navbar.Text className="py-0">
            <Button onClick={handleLogout}>Cerrar sesion</Button>
          </Navbar.Text>
        </Navbar.Collapse>
        
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarEvaluador;
