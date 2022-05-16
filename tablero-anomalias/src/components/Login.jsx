import React from "react";
import { Button } from 'react-bootstrap';
import AnomalyBg from "../components/images/AnomalyBG.png";

const Login = () => {

	return (
		<div style = {{ width: "100vw", height: "82vh", display: "flex", justifyContent: "center", alignItems: "center",
			backgroundImage: `url(${AnomalyBg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>	
			<div className="h-75 w-25 rounded-3 align-center d-flex flex-column bg-secondary justify-content-center align-items-center">
				<div className="text-light h1">Bienvenido</div>
				<Button className="w-75 mt-4" style={{backgroundColor:"#ff8300", border:"none", fontWeight:"bold"}} size="lg" href="/upload">Iniciar sesión</Button>
				<small className="text-light">con credenciales corporativas</small>
				<Button className="w-75 mt-4" style={{backgroundColor:"#ff8300", border:"none", fontWeight:"bold"}} size="lg" href="https://www.youtube.com/watch?v=8YGlzSl6cxU">Guía de usuario</Button>
				<small className="text-light mb-2">con videos y manuales</small>
			</div>
		</div>
	);
};

export default Login;