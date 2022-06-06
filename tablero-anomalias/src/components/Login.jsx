import { React, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AnomalyBg from "../images/AnomalyBG.png";
import { IdsContext } from "../App";

const Login = () => {
	// Acceso a los identificadores compartidos de la aplicación
	const { ids, setIds } = useContext(IdsContext);
	const navegador = useNavigate();

	// Función placeholder para que Ternium implemente su Login corporativo
	function login() {

		// Si ya existe una sesión activa, no pide completar el Login
		if (ids !== undefined) {
			navegador('/upload', { replace: true })
		}

		// Variable por reemplazar por la respuesta del login
		var validSession = true;
		if (validSession) {
			localStorage.setItem('ids', JSON.stringify({ ...ids, usuario: "Charlie" }));
			setIds({ ...ids, usuario: "Charlie" });
			navegador('/upload', { replace: true });
		}
		else {
			window.alert("Error en el inicio de sesión");
		}
	}

	return (
		<div className="full-center" style={ {
			width: "100vw", height: "82vh",
			backgroundImage: `url(${AnomalyBg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"
		} }>
			<div className="card-dark full-center h-75 w-25 rounded-3 flex-column">
				<div className="light-text h1">Bienvenido</div>
				<Button className="primary-button w-75 mt-4" style={ { fontWeight: "bold" } } size="lg" onClick={ () => login() }>Iniciar sesión</Button>
				<small className="light-text">con credenciales corporativas</small>
				<Button className="primary-button w-75 mt-4" style={ { fontWeight: "bold" } } size="lg" href="https://www.youtube.com/watch?v=8YGlzSl6cxU">Guía de usuario</Button>
				<small className="light-text mb-2">con videos y manuales</small>
			</div>
		</div>
	);
};

export default Login;