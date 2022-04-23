import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Form } from "react-bootstrap";

function Upload() {

	const [isValid, setIsValid] = useState();
	const [type, setType] = useState("");


	useEffect(() => {
		console.log(type);
		if (type !== "") {
			if (type === "application/pdf") {
				console.log("es de tipo pdf");
				setIsValid(true);
			}
			else {
				console.log("no es del tipo valido")
				setIsValid(false);
			}
		}
		else {
			console.log("no hay archivo");
			setIsValid(undefined);
		}

		console.log(isValid);

	}, [type, isValid]);

	return (
		<div className="Upload">
			<div style={ { width: "50%	", height: "80vh", marginLeft: "25%", padding: "35vh 0" } }>
				<Form  validated={isValid} >
					<Form.Group controlId="formFile" className="mb-3">
						<Form.Label>Carga un archivo de tipo .csv o .xlsx</Form.Label>
						<Form.Control isInvalid={ isValid === undefined ? null : !isValid} type="file" onChange={ (e) => setType(e.target.files[0].type)} required />

						<Form.Control.Feedback type="invalid">
							Por favor, elige un archivo que sea .pdf
						</Form.Control.Feedback>
					</Form.Group>
				</Form>
			</div>
		</div>
	);
}

export default Upload;