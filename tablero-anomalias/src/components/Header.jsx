import React from "react";
import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";
import Logo from "./Ternium_Logo.png";

function Header() {
	return (
		<Navbar style={ {
			backgroundColor: "#ff8300",
		} } expand={ false }>
			<Container fluid>
				<Navbar.Brand href="/">
					<img
						alt="Logo Ternium"
						src={ Logo }
						width="150"
						className="d-inline-block align-top"
					/>
				</Navbar.Brand>
				<Navbar.Text>
					Panel de Anomalias
				</Navbar.Text>
				<Navbar.Toggle aria-controls="offcanvasNavbar" />
				<Navbar.Offcanvas
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
					placement="end"
					style={ {
						backgroundColor: "#ff8300",
					} }
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title id="offcanvasNavbarLabel">Panel de Anomalias</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<Nav.Link href="/" style={ { color: "#000000" } }>Dashboard</Nav.Link >
							<Nav.Link href="/upload" style={ { color: "#000000" } }>Upload</Nav.Link>
							<Nav.Link style={ { color: "#000000" } }>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
									<path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
									<path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
								</svg> Log Out</Nav.Link>
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar >
	);
}

export default Header;