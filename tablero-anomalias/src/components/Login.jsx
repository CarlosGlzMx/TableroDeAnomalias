import React from "react";
import { Button } from 'react-bootstrap';

const Login = () => {

	return (
		<>
			<div style={ { width: "100vw", height: "80vh", margin: "0 46vw", padding: "35vh 0" } }>
				<Button size="lg" variant="warning" href="/upload">Ingresar</Button>{ ' ' }
			</div>
		</>
	);
};

export default Login;