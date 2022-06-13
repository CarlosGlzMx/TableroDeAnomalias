import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCarga, deleteTablero, getCarga, getTablero } from '../../api/requests';
import { IdsContext } from "../../App";
import { AvailableDataContext } from './Upload';
import { parseFilters } from "./parseFilters";

function BoardRow(props) {

	const { ids, setIds } = useContext(IdsContext);
	const { setCargas, setTableros, setError } = useContext(AvailableDataContext);

	const [saveData, setSaveData] = useState(false);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const navegador = useNavigate();

	useEffect(() => {
		if (saveData) {
			navegador("/dashboard", { replace: true });
		}
	}, [ids, navegador, saveData]);

	async function handleClickDelete(e) {
		e.preventDefault();

		let response = undefined;
		if (props.type === "carga") {
			response = await deleteCarga(ids.usuario, props.id);
		} else if (props.type === "tablero") {
			response = await deleteTablero(ids.usuario, props.id);
		}

		errorHandler(response, "delete");

		handleClose();
	}

	async function handleClickAccess(e) {
		e.preventDefault();
		let response = undefined;

		if (props.type === "carga") {
			response = await getCarga(ids.usuario, props.id);
		} else if (props.type === "tablero") {
			response = await getTablero(ids.usuario, props.id);
		}

		errorHandler(response, "get");
	}

	async function errorHandler(response, requestType) {
		const solvedPromise = await response[0];
		if (response[1] === 200) {
			if (requestType === "delete") {
				if (props.id === ids.carga || props.id === ids.tablero) {
					sessionStorage.setItem("ids", JSON.stringify({ usuario: ids.usuario }));
					sessionStorage.removeItem("anomalyData");
					sessionStorage.removeItem("config");
					setIds(undefined);
				}
				setCargas(undefined);
				setTableros(undefined);
			} else if (requestType === "get") {
				const filters = parseFilters(response[2]);
				sessionStorage.setItem("anomalyData", JSON.stringify(solvedPromise));
				sessionStorage.setItem("config", JSON.stringify(filters));
				sessionStorage.setItem("ids", JSON.stringify(props.type === "carga" ?
					{ ...ids, carga: props.id, tablero: undefined } : { ...ids, tablero: props.id, carga: undefined }
				));
				setIds(undefined);
				setSaveData(true);
			}
		} else {
			setError(true);
			setCargas(solvedPromise + ". Cargue la pagina de nuevo.");
			setTableros(solvedPromise + ". Cargue la pagina de nuevo.");
		}
	}

	return (
		<>
			<li
				className="h6 d-flex justify-content-between align-items baseline"
				style={ { paddingRight: '10px' } }>
				{ props.name }
				<div>
					<Button
						size="sm"
						className="icon-dark"
						onClick={ handleClickAccess }>
						<VisibilityIcon fontSize="small" />
					</Button>
					<Button
						size="sm"
						className="icon-dark"
						onClick={ handleShow }>
						<DeleteIcon fontSize="small" />
					</Button>
				</div>
			</li>
			<Modal
				show={ show }
				onHide={ handleClose }
				backdrop="static"
				keyboard={ false }
			>
				<Modal.Header closeButton>
					<Modal.Title>Eliminar { props.type }</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					¿Seguro que quieres eliminar este elemento?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={ handleClose }>
						Cancelar
					</Button>
					<Button className='primary-button' onClick={ handleClickDelete }>Eliminar</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default BoardRow;