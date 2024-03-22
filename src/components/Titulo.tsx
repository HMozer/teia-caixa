import {
    Container,
    Navbar
} from 'react-bootstrap';

const Titulo = () =>
{
    return (
        <Navbar expand="lg" className="bg-body-tertiary mb-5"  bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Teia Caixa</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Container>
        </Navbar>
      );
}

export default Titulo;