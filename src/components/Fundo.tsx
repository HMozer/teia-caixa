import {
    Container,
    Navbar
} from 'react-bootstrap';

const Fundo = () =>
{
    return (
        <Navbar expand="lg" className="bg-body-tertiary mt-5 pb-4"  bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>C117334 - Henrique Mozer Nunes</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Container>
        </Navbar>
      );
}

export default Fundo;