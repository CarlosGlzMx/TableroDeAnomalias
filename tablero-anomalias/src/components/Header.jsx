import React, { useState } from "react";
import { Navbar, Container, Offcanvas, Nav, Button, Modal } from "react-bootstrap";
import Logo from "../images/Ternium_Logo.png";
import { useNavigate } from "react-router-dom"

function Header() {

	const [show, setShow] = useState(false);
	const [message, setMessage] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => { setMenuOpen(!menuOpen) };
	const handleCloseMenu = () => setMenuOpen(false)

	const navegador = useNavigate();

	function handleClickLogOut() {
		sessionStorage.clear();
	}

	function handleClick(item) {
		if (!sessionStorage.getItem("ids")) {
			setMessage("No se ha inciado sesión.");
			handleShow();
		} else if (!sessionStorage.getItem("anomalyData") && item === "/TableroDeAnomalias/dashboard") {
			setMessage("No se han cargado datos.");
			handleShow();
		} else {
			handleCloseMenu();
			navegador(item, { replace: false });
		}
	}

	return (
		<>
			<Navbar id="header" expand={ false } >
				<Container fluid>
					<Navbar.Brand>
						<img alt="Logo Ternium" src={ Logo } className="d-inline-block align-top" id="main-logo" width="100" />
					</Navbar.Brand>
					<Navbar.Text className="light-text fw-bold fs-5">
						Panel de Anomalías
					</Navbar.Text>
					<Navbar.Toggle aria-controls="navbar-hidden-menu" onClick={ toggleMenu } />
					<Navbar.Offcanvas
						id="navbar-hidden-menu"
						aria-labelledby="navbar-hidden-menu-label"
						placement="end"
						restoreFocus={ false }
						show={ menuOpen }
						onHide={ handleCloseMenu }
					>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title className="light-text" id="navbar-hidden-menu-label">Panel de Anomalias</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className="justify-content-end flex-grow-1 pe-3 align-items-start">
								<Button as={ Nav.Link } variant="link" className="light-text menu-route-options" onClick={ () => handleClick("/dashboard") }>Dashboard</Button >
								<Button as={ Nav.Link } variant="link" className="light-text menu-route-options" onClick={ () => handleClick("/upload") }>Upload</Button>
								<Button as={ Nav.Link } variant="link" href="/TableroDeAnomalias/" className="light-text menu-route-options" onClick={ handleClickLogOut }>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
										<path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
										<path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
									</svg> Cerrar sesión
								</Button>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar >


			<Modal
				show={ show }
				onHide={ handleClose }
				backdrop="static"
				keyboard={ false }
			>
				<Modal.Header closeButton>
					<Modal.Title>Error</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{ message }
				</Modal.Body>
				<Modal.Footer>
					<Button className="secondary-button" onClick={ handleClose }>
						Cancelar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Header;