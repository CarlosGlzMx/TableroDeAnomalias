import React from "react";
import { Button } from 'react-bootstrap';
import Header from "./Header";
import Footer from "./Footer";

const Login = () => {

	return (
		<>
			<Header></Header>
			<div style={ { width: "100vw", height: "80vh", margin: "0 46vw", padding: "35vh 0" } }>
				<Button size="lg" variant="warning">Ingresar</Button>{ ' ' }
			</div>
			<Footer></Footer>
		</>
	);
};

export default Login;