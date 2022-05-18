import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import AnomalyBg from "../components/images/AnomalyBG.png";

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
		<div className="Upload" style={{display:"flex", alignItems:"center", justifyContent:"center", backgroundImage: `url(${AnomalyBg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
			<div className="p-4" style={{ width: "40%", height: "66vh", margin: "8vh", border:"0.3rem dashed #6C757D",
					borderRadius: "0.5rem", backgroundColor: "#EEEEEE"}}>
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
			<div style={{ width: "40%", height: "66vh", margin: "8vh", border:"0.3rem dashed #ff8300", borderRadius: "0.5rem", backgroundColor:"white"}}>
				<div className="w-100 h-50 p-4">
					<div className="h4">Cargas disponibles</div>
					<ul>
						<div className="h6">Carga 1 - 17/10/2001</div>
						<div className="h6">Carga 2 - 18/10/2001</div>
						<div className="h6">Carga 3 - 19/10/2001</div>
					</ul>
				</div>
				<div className="w-100 h-50 p-4">
					<div className="h4">Tableros guardados</div>
					<ul>
						<div className="h6">Tablero 1 - 17/10/2001</div>
						<div className="h6">Tablero 2 - 18/10/2001</div>
						<div className="h6">Tablero 3 - 19/10/2001</div>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Upload;