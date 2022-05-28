import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import AnomalyBg from "../components/images/AnomalyBG.png";
import BoardRow from "../components/BoardRow";
import { getDatosDisponibles } from "../api/requests";
import { IdsContext } from "../App";

function Upload() {
	// Identificadores globales de usuarios, ids y cargas
	const { ids } = useContext(IdsContext);

	// Archivo .csv o .xlsx y validacion de tipo
	const [file, setFile] = useState();
	const [isValid, setIsValid] = useState();
	const [type, setType] = useState("");

	// Listas de cargas y tableros disponibles para el usuario
	const [listaCargas, setCargas] = useState(undefined);
	const [listaTableros, setTableros] = useState(undefined);

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
			const datosDisponibles = await getDatosDisponibles(ids["usuario"]);
			setCargas(datosDisponibles.cargas);
			setTableros(datosDisponibles.tableros);
		}

		if (listaCargas === undefined || listaTableros === undefined) handleRequest();

		if (type !== "") {
			setIsValid(type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || type === "text/csv");
		}
		else {
			setIsValid(undefined);
		}
	}, [type, isValid, file, listaCargas, listaTableros]);

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
							isInvalid={ isValid === undefined ? null : !isValid }
							accept = ".csv, .xlsx"
							type = "file"
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
					to= "/selectColumn"
					state= { { file, type } }>
					<Button
						style={ { backgroundColor: "#ff8300", border: "none" } }
						size = "sm"
						disabled={ isValid === undefined ? true : !isValid } >
						Seleccionar Columnas
					</Button>
				</Link>
			</div>
			<div style={ { width: "40%", height: "66vh", margin: "8vh", border: "0.3rem dashed #ff8300",
				borderRadius: "0.5rem", backgroundColor: "white" } }>
				<div className="w-100 h-50 p-4">
					<div className="h4">Cargas disponibles</div>
					<ul style={ {
						overflow: 'scroll',
						maxHeight: '25vh',
						overflowX: 'hidden'
					} }>
						{ listaCargas === undefined ?
							<Loading />
							:
							listaCargas.map((carga) => {
								return <BoardRow key={ carga.id } name={ carga.nombre } type={ "Carga" }></BoardRow>
							})

						}
					</ul>
				</div>
				<div className="w-100 h-50 p-4">
					<div className="h4">Tableros guardados</div>
					<ul style={ { overflow: 'scroll', maxHeight: '20vh', overflowX: 'hidden' } }>
						{ listaTableros === undefined ?
							<Loading />
							:
							listaTableros.map((tablero) => {
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