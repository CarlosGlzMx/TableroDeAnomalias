import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import AnomalyBg from "../components/images/AnomalyBG.png";
import BoardRow from "../components/BoardRow";
import { getDatosDisponibles } from "../api/requests";
import { DataContext } from "../App";

function Upload() {
	// Archivo .csv o .xlsx y validacion de tipo
	const [file, setFile] = useState();
	const [isValid, setIsValid] = useState();
	const [type, setType] = useState("");

	//User id
	const { user } = useContext(DataContext);

	// Cargas y tableros
	const [cargas, setCargas] = useState(undefined);
	const [tableros, setTableros] = useState(undefined);

	const Loading = () => {
		return (
			<div
				style={ {
					marginLeft: '40vw',
					maxWidth: '20vw',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'

				} }>
				<Spinner animation="border" role="status" />
				<h4>Cargando...</h4>
			</div>
		);
	}


	useEffect(() => {

		async function handleRequest() {
			const datosDisponibles = await getDatosDisponibles(user);
			setCargas(datosDisponibles.cargas);
			setTableros(datosDisponibles.tableros);
		}

		if (cargas === undefined || tableros === undefined) {
			handleRequest();
		}

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
	}, [type, isValid, file, cargas, tableros, user]);

	return (
		<div className="Upload" style={ { display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: `url(${AnomalyBg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" } }>
			<div className="p-4" style={ {
				width: "40%", height: "66vh", margin: "8vh", border: "0.3rem dashed #6C757D",
				borderRadius: "0.5rem", backgroundColor: "#EEEEEE"
			} }>
				<Form validated={ isValid } >
					<Form.Group controlId="formFile" className="mb-3">
						<Form.Label>Carga un archivo de tipo .csv o .xlsx</Form.Label>

						<Form.Control
							isInvalid={
								isValid === undefined ? null : !isValid
							}
							accept=".csv, .xlsx"
							type="file"
							onChange={ (e) => {
								setType(e.target.files[0].type);
								setFile(e.target.files[0]);
							} } required />

						<Form.Control.Feedback type="invalid">
							Por favor, elige un archivo que sea .csv o .xlsx
						</Form.Control.Feedback>
					</Form.Group>
				</Form>
				<Link
					to="/selectColumn"
					state={ {
						file,
						type
					} }>
					<Button
						style={ {
							backgroundColor: "#ff8300",
							border: "none"
						} }
						size="sm"
						disabled={ isValid === undefined ? true : !isValid } >
						Seleccionar Columnas
					</Button>
				</Link>
			</div>
			<div style={ {
				width: "40%",
				height: "66vh",
				margin: "8vh",
				border: "0.3rem dashed #ff8300",
				borderRadius: "0.5rem",
				backgroundColor: "white"
			} }>
				<div className="w-100 h-50 p-4">
					<div className="h4">Cargas disponibles</div>
					<ul style={ {
						overflow: 'scroll',
						maxHeight: '25vh',
						overflowX: 'hidden'
					} }>
						{ cargas === undefined ?
							<Loading />
							:
							cargas.map((carga) => {
								return <BoardRow key={ carga.id } name={ carga.nombre } type={ "Carga" }></BoardRow>
							})

						}
					</ul>
				</div>
				<div className="w-100 h-50 p-4">
					<div className="h4">Tableros guardados</div>
					<ul style={ {
						overflow: 'scroll',
						maxHeight: '20vh',
						overflowX: 'hidden'
					} }>
						{ tableros === undefined ?
							<Loading />
							:
							tableros.map((tablero) => {
								return <BoardRow key={ tablero.id } name={ tablero.nombre } type={ "Tablero" }></BoardRow>
							})

						}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Upload;