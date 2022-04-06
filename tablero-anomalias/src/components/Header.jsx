import React from "react";
import { Navbar, Container } from "react-bootstrap";

function Header() {
	return (
		<Navbar>
			<Container>
				<Navbar.Brand href="/">Ternium</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						Portal de Detección de Anomalías
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;