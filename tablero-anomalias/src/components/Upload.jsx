import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";


function Upload(user) {
	const [isValid, setIsValid] = useState();
	const [type, setType] = useState("");

	// Archivo .csv o .xlsx
	const [data, setData] = useState();


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
	}, [type, isValid, data]);

	return (
		<div className="Upload">
			<div
				style={ {
					width: "50%",
					height: "82vh",
					marginLeft: "25%",
					padding: "25vh 0"
				} }>
				<Form validated={ isValid } >
					<Form.Group controlId="formFile" className="mb-3">
						<Form.Label>Carga un archivo de tipo .csv o .xlsx</Form.Label>

						<Form.Control
							isInvalid={
								isValid === undefined ? null : !isValid
							}
							type="file"
							onChange={ (e) => {
								setType(e.target.files[0].type);
								setData(e.target.files[0]);
							} } required />

						<Form.Control.Feedback type="invalid">
							Por favor, elige un archivo que sea .csv o .xlsx
						</Form.Control.Feedback>
					</Form.Group>
				</Form>

				<Link
					to="/selectColumn"
					state={{
						data,
						type
					}}>
					<Button
						style={ {
							backgroundColor: "#ff8300",
							border: "none"
						} }
						size="sm"
						disabled={isValid === undefined ? true : !isValid} >
						Seleccionar Columnas
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default Upload;