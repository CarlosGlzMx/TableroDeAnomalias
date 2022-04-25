import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Form, Button } from "react-bootstrap";

function Upload() {

	const [isValid, setIsValid] = useState();
	const [type, setType] = useState("");


	useEffect(() => {
		if (type !== "") {
			if (type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || type === "text/csv") {
				setIsValid(true);
			}
			else {
				setIsValid(false);
			}
		}
		else {
			setIsValid(undefined);
		}

	}, [type, isValid]);

	return (
		<div className="Upload">
			<div style={ { width: "50%	", height: "80vh", marginLeft: "25%", padding: "35vh 0" } }>
				<Form  validated={isValid} >
					<Form.Group controlId="formFile" className="mb-3">
						<Form.Label>Carga un archivo de tipo .csv o .xlsx</Form.Label>
						<Form.Control isInvalid={ isValid === undefined ? null : !isValid} type="file" onChange={ (e) => setType(e.target.files[0].type)} required />

						<Form.Control.Feedback type="invalid">
							Por favor, elige un archivo que sea .csv o .xlsx
						</Form.Control.Feedback>
					</Form.Group>
				</Form>

				<Button  style={{ backgroundColor: "#ff8300", border: "none" }} size="lg" disabled={ isValid === undefined ? true : !isValid}> 
					Enviar
				</Button>
			</div>
		</div>
	);
}

export default Upload;