import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCarga, deleteTablero, getCarga } from '../api/requests';
import { IdsContext, DataContext } from "../App";
import { AvailableDataContext } from './Upload';

function BoardRow(props) {

	const { ids, setIds } = useContext(IdsContext);
	const { setCargas, listaTableros, setTableros, setError } = useContext(AvailableDataContext);
	const { anomalyData, setAnomalyData } = useContext(DataContext);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const navegador = useNavigate();

	useEffect(() => {
		if (anomalyData !== undefined) {
			navegador("/dashboard", { replace: true });
		}
	}, [anomalyData, ids]);

	async function handleClickDelete(e) {
		e.preventDefault();
		if (props.type === "carga") {
			const response = await deleteCarga(ids["usuario"], props.id);
			const solvedPromise = await response[0];
			if (response[1] === 200) {
				setCargas(undefined);
			} else {
				setError(true);
				setCargas(solvedPromise + ". Cargue la pagina de nuevo.");
				setTableros(solvedPromise + ". Cargue la pagina de nuevo.");
			}
		} else if (props.type === "tablero") {
			const response = await deleteTablero(ids["usuario"], props.id);
			const solvedPromise = await response[0];
			if (response[1] === 200) {
				setTableros(listaTableros.filter(tablero => tablero.id !== props.id));
			} else {
				setError(true);
				setCargas(solvedPromise + ". Cargue la pagina de nuevo.");
				setTableros(solvedPromise + ". Cargue la pagina de nuevo.");
			}
		}

		handleClose();
	}

	async function handleClickAccess(e) {
		e.preventDefault();
		setAnomalyData(await getCarga(ids["usuario"], props.id));
		setIds({ ...ids, carga: props.id });
		console.log(ids);
	}

	return (
		<>
			<li
				className="h6"
				style={ {
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
					paddingRight: '10px'
				} }>
				{ props.name }
				<div>
					<Button
						size="sm"
						style={ {
							color: 'black',
							borderColor: 'transparent',
							backgroundColor: 'transparent'
						} }
						onClick={ handleClickAccess }>
						<VisibilityIcon fontSize="small" />
					</Button>
					<Button
						size="sm"
						style={ {
							color: 'black',
							borderColor: 'transparent',
							backgroundColor: 'transparent'
						} }
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
					<Button style={ { backgroundColor: "#ff8300", border: "none" } } onClick={ handleClickDelete }>Eliminar</Button>
				</Modal.Footer>
			</Modal>
		</>
	);

}

export default BoardRow;