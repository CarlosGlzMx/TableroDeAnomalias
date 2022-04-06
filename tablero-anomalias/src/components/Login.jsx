import React from "react";
import { Container, Navbar, Button } from 'react-bootstrap';

const Login = () => {

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home">Ternium</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Portal de Detección de Anomalías
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        
            <div style={{width: "100vw", height: "80vh", margin: "0 46vw", padding: "35vh 0"}}>
                <Button size="lg" variant="warning">Ingresar</Button>{' '}
            </div>

            <footer id="sticky-footer" className="flex-shrink-0 py-4 bg-light text-white-50">
                <div className="container text-center">
                    <small className="text-dark">Copyright &copy; Ternium</small>
                </div>
            </footer>
        </>
    );
};

export default Login;