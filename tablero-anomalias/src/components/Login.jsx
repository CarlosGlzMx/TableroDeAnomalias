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
		if (ids["usuario"]) { navegador('/upload', {replace: true}) }

		// Variable por reemplazar por la respuesta del login
		var validSession = true;
		if (validSession) {
			setIds({...ids, usuario : "Charlie"});
			navegador('/upload', {replace: true});
		}
		else {
			window.alert("Error en el inicio de sesión");
		}
	}

	return (
		<div style = {{ width: "100vw", height: "82vh", display: "flex", justifyContent: "center", alignItems: "center",
			backgroundImage: `url(${AnomalyBg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>	
			<div className="h-75 w-25 rounded-3 align-center d-flex flex-column bg-secondary justify-content-center align-items-center">
				<div className="text-light h1">Bienvenido</div>
				<Button className="w-75 mt-4" style={{backgroundColor:"#485458", border:"none", fontWeight:"bold"}} size="lg" onClick={() => login()}>Iniciar sesión</Button>
				<small className="text-light">con credenciales corporativas</small>
				<Button className="w-75 mt-4" style={{backgroundColor:"#485458", border:"none", fontWeight:"bold"}} size="lg" href="https://www.youtube.com/watch?v=8YGlzSl6cxU">Guía de usuario</Button>
				<small className="text-light mb-2">con videos y manuales</small>
			</div>
		</div>
	);
};

export default Login;