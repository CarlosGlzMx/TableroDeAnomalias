import React from "react";
import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";
import Logo from "../images/Ternium_Logo.png";

function Header() {
	return (
		<Navbar id = "header" style={ { height: "12vh" } } expand={ false }>
			<Container fluid>
				<Navbar.Brand href="/">
					<img alt="Logo Ternium" src={ Logo } className="d-inline-block align-top" width="100"/>
				</Navbar.Brand>
				<Navbar.Text className="light-text fw-bold fs-5">
					Panel de Anomalías
				</Navbar.Text>
				<Navbar.Toggle aria-controls = "navbar-hidden-menu" />
				<Navbar.Offcanvas
					id = "navbar-hidden-menu"
					aria-labelledby = "navbar-hidden-menu-label"
					placement="end"
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title className = "light-text" id = "navbar-hidden-menu-label">Panel de Anomalias</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<Nav.Link href="/dashboard" className = "light-text menu-route-options">Dashboard</Nav.Link >
							<Nav.Link href="/upload" className = "light-text menu-route-options">Upload</Nav.Link>
							<Nav.Link href="/" className = "light-text menu-route-options">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
									<path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
								</svg> Cerrar sesión
							</Nav.Link>
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar >
	);
}

export default Header;