import React, { useState, useEffect, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import AnomalyBg from "../../images/AnomalyBG.png";
import BoardRow from "./BoardRow";
import Loading from "./Loading";
import { getDatosDisponibles } from "../../api/requests";
import { IdsContext } from "../../App";

export const AvailableDataContext = createContext([[], () => { }]);

function Upload() {
	// Identificadores globales de usuarios, ids y cargas
	const { ids } = useContext(IdsContext);

	// Archivo .csv o .xlsx y validacion de tipo
	const [file, setFile] = useState();
	const [isValid, setIsValid] = useState();
	const [type, setType] = useState("");

	// Listas de listaCargas y tableros disponibles para el usuario
	const [listaCargas, setCargas] = useState(undefined);
	const [listaTableros, setTableros] = useState(undefined);

	// Error handler
	const [error, setError] = useState(false);

	useEffect(() => {

		async function handleRequest() {
			const datosDisponibles = await getDatosDisponibles(ids["usuario"]);
			const solvedPromise = await datosDisponibles[0]
			if (datosDisponibles[1] === 200) {
				setCargas(solvedPromise.cargas);
				setTableros(solvedPromise.tableros);
			} else {
				setCargas(solvedPromise);
				setTableros(solvedPromise);
				setError(true);
			}
		}

		if (listaCargas === undefined || listaTableros === undefined) handleRequest();

		if (type !== "") {
			setIsValid(type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || type === "text/csv");
		}
		else {
			setIsValid(undefined);
		}
	}, [type, isValid, file, listaCargas, listaTableros, ids, error]);

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
					state={ { file, type } }>
					<Button
						style={ { backgroundColor: "#ff8300", border: "none" } }
						size="sm"
						disabled={ isValid === undefined ? true : !isValid } >
						Seleccionar Columnas
					</Button>
				</Link>
			</div>
			<AvailableDataContext.Provider value={ { setCargas, listaTableros, setTableros, setError } }>
				<div style={ {
					width: "40%",
					height: "66vh",
					margin: "8vh",
					border: "0.3rem dashed #ff8300",
					borderRadius: "0.5rem",
					backgroundColor: "white"
				} }>
					<div className="w-100 h-50 p-4">
						<div data-testid = "titulo-cargas" className="h4">Cargas disponibles</div>
						<ul style={ {
							overflow: 'scroll',
							maxHeight: '22vh',
							overflowX: 'hidden'
						} }>
							{ (listaCargas === undefined || error) ?
								error ?
									<h5>{ "Error: " + listaCargas }</h5>
									:
									<Loading message={ "Cargando..." } />
								:
								listaCargas.map((carga) => {
									return <BoardRow key={ carga.id } name={ carga.nombre } type={ "carga" } id={ carga.id }></BoardRow>
								})
							}
						</ul>
					</div>
					<div className="w-100 h-50 p-4">
						<div className="h4">Tableros guardados</div>
						<ul style={ {
							overflow: 'scroll',
							maxHeight: '22vh',
							overflowX: 'hidden'
						} }>
							{ (listaTableros === undefined || error) ?
								error ?
									<h5>{ "Error: " + listaTableros }</h5>
									:
									<Loading message={ "Cargando..." } />
								:
								listaTableros.map((tableros) => {
									return <BoardRow key={ tableros.id } name={ tableros.nombre } type={ "tablero" } id={ tableros.id }></BoardRow>
								})
							}
						</ul>
					</div>
				</div>
			</AvailableDataContext.Provider >
		</div >
	);
}

export default Upload;