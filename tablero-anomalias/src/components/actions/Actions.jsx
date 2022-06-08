import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { IdsContext } from "../../App";
import { ConfigContext } from "../dashboard/Dashboard";
import Slider from "./Slider";
import Dates from "./Dates";

import { deleteCarga, deleteTablero, postTablero } from "../../api/requests";
import { printPdf } from "./pdfGenerator"


function Actions() {

	const { ids, setIds } = useContext(IdsContext);
	const { config, setConfig } = useContext(ConfigContext);

	// Manejo de errores
	const [error, setError] = useState(undefined);

	// Manejo del Modal
	const [type, setType] = useState("");
	const [show, setShow] = useState(false);
	const handleClose = (e) => {
		e.preventDefault();
		setNombre("");
		setShow(false);
		setError(undefined);
	};

	const handleShow = (type) => {
		if (type === "delete") {
			setType("delete");
		} else if (type === "post") {
			setType("post");
		}
		setShow(true);
	}

	const [nombre, setNombre] = useState("");
	const [deleted, setDeleted] = useState(false);

	const navegador = useNavigate();

	useEffect(() => {
		if (deleted === true) {
			navegador("/upload", { replace: true });
		}
	}, [deleted, navegador]);

	// Elimina la carga o tablero de la base de datos
	async function handleClickDelete(e) {
		e.preventDefault();
		let response = undefined;
		if (ids.tablero === undefined && ids.carga !== undefined) {
			response = await deleteCarga(ids.usuario, ids.carga);
		} else if (ids.tablero !== undefined && ids.carga !== undefined) {
			//Revisar que funcione
			response = await deleteTablero(ids.usuario, ids.tablero);
		}

		errorHandler(response);

		if (response[1] === 200) {
			handleClose();
		}
	}

	async function errorHandler(response) {
		const solvedPromise = await response[0];
		if (response[1] === 200) {
			sessionStorage.removeItem("anomalyData");
			sessionStorage.setItem("ids", JSON.stringify({ usuario: ids.usuario }));
			setIds(undefined);
			setDeleted(true);
		} else {
			setError(solvedPromise + ". Intente de nuevo o recargue la pagina.");
		}
	}

	async function handleClickPost(e) {
		e.preventDefault();

		// console.log(config);
		// config.forEach(element => {
		// 	if (element === undefined) {
		// 		setError("Por favor seleccione una opción en cada filtro.");
		// 		return;
		// 	}
		// });

		const response = await postTablero(ids.usuario, ids.carga, nombre, config);
		const solvedPromise = await response[0];
		const id = parseInt(await response[2]);

		if (response[1] === 200) {
			setNombre("");
			handleClose();
			sessionStorage.setItem("config", JSON.stringify(config));
			sessionStorage.setItem("ids", JSON.stringify({ ...ids, tablero: id }));
			setIds(undefined);
		} else {
			setError(solvedPromise + ". Intente de nuevo o recargue la pagina.");
		}
	}

	function newTab() {
		window.open("http://localhost:3000/").focus()
	}

	return (
		<div className="d-flex justify-content-between">
			<div className="action-left">
				<Slider />
			</div>

			<div className="action-center">
				<Dates />
			</div>

			<div className="action-right">
				<button className="btn btn-default" onClick={ () => handleShow("delete") }>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="6vh"
						fill="currentColor"
						className="bi bi-trash"
						viewBox="0 0 16 16"
					>
						<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
						<path
							fillRule="evenodd"
							d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
						/>
					</svg>
				</button>

				<button className="btn btn-default" onClick={ () => printPdf() }>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="6vh"
						fill="currentColor"
						className="bi bi-file-earmark-bar-graph"
						viewBox="0 0 16 16"
					>
						<path d="M10 13.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v6zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z" />
						<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
					</svg>
				</button>

				<button
					className="btn btn-default"
					onClick={ () => (window.location.href = "/upload") }
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="6vh"
						fill="currentColor"
						className="bi bi-upload"
						viewBox="0 0 16 16"
					>
						<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
						<path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
					</svg>
				</button>

				<button className="btn btn-default" onClick={ () => handleShow("post") }>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="6vh"
						fill="currentColor"
						className="bi bi-download"
						viewBox="0 0 16 16"
					>
						<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
						<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
					</svg>
				</button>

				<button className="btn btn-default" onClick={ newTab }>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="6vh"
						fill="currentColor"
						className="bi bi-plus-lg"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
						/>
					</svg>
				</button>
			</div>
			<Modal
				show={ show }
				onHide={ handleClose }
				backdrop="static"
				keyboard={ false }
			>
				<Modal.Header>
					<Modal.Title>{ type === "delete" ? "Eliminar datos" : "Guardar un tablero" }</Modal.Title>
				</Modal.Header>
				<Form>
					<Modal.Body>
						{ type === "delete" ?
							error === undefined ? "¿Seguro que quieres eliminar este elemento?" : error
							:
							error === undefined ?
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
									<Form.Label>Ingrese un nombre para el tablero</Form.Label>
									<Form.Control
										type="text"
										placeholder="Nombre"
										autoFocus
										onChange={ (e) => setNombre(e.target.value) }
									/>
								</Form.Group>
								:
								error
						}
					</Modal.Body>
					<Modal.Footer>
						<Button className="secondary-button" onClick={ handleClose }>
							Cancelar
						</Button>
						{ error === undefined ?
							<Button type="submit" disabled={ (type === "post" && nombre === "") ? true : false } className="primary-button" onClick={ type === "delete" ? handleClickDelete : handleClickPost }>{ type === "delete" ? "Eliminar" : "Guardar" }</Button>
							:
							<></>
						}
					</Modal.Footer>
				</Form>
			</Modal>
		</div >
	);
}

export default Actions;
