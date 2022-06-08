import React, { useState, useEffect, useRef, useContext } from "react";
import Papa from "papaparse";
import { useLocation, useNavigate } from "react-router-dom";
import Column from './Column';
import Loading from "./Loading";
import { Form, Button, Modal } from 'react-bootstrap';
import { postCarga, getCarga } from "../../api/requests";
import { parseFilters } from "./parseFilters";
import * as XLSX from "xlsx";
import { IdsContext } from "../../App";


function SelectColumn() {

	const location = useLocation();

	// Archivo .csv o .xlsx
	const fileData = location.state?.file;
	const fileType = location.state?.type;

	//User id
	const { ids, setIds } = useContext(IdsContext);

	//State to store table Column name
	const [tableRows, setTableRows] = useState([]);

	//State to set loading
	const [loading, setLoading] = useState(false);

	//State to set error message
	const [show, setShow] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const handleShow = () => setShow(true);
	const handleClose = () => {
		setShow(false);
		navegador("/upload", { replace: true });
	}

	const [saveData, setSaveData] = useState(false);

	const navegador = useNavigate();

	const refForm = useRef();

	useEffect(() => {
		if (fileData !== undefined) {
			if (fileType === "text/csv") {
				// Passing file data (event.target.files[0]) to parse using Papa.parse
				Papa.parse(fileData, {
					header: true,
					skipEmptyLines: true,
					complete: function (results) {
						const rowsArray = [];
						const valuesArray = [];

						// Iterating fileData to get column name and their values
						results.data.forEach((d) => {
							rowsArray.push(Object.keys(d));
							valuesArray.push(Object.values(d));
						});

						// Filtered Column Names
						setTableRows(rowsArray[0]);
					},
				});
			}
			if (fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
				const reader = new FileReader();

				reader.onload = (evt) => {
					const bstr = evt.target.result;
					const wb = XLSX.read(bstr, { type: "binary", sheetRows: 1 });
					const wsname = wb.SheetNames[0];
					const ws = wb.Sheets[wsname];
					const f = XLSX.utils.sheet_to_json(ws, { header: 1 });
					setTableRows(f[0]);
				};
				reader.readAsBinaryString(fileData);
			}
		}

		if (saveData && (ids.carga !== undefined || ids.tablero !== undefined)) {
			navegador("/dashboard", { replace: true });
		}
	}, [fileData, fileType, ids, saveData, navegador]);


	async function submitHandler(event) {
		event.preventDefault();

		// Guardamos la info en columnas para después se envíe
		let columnas = [];
		for (let index = 0; index < tableRows.length; index++) {
			columnas.push({
				[tableRows[index]]: {
					column_type: event.target[index * 3].value,
					ia: event.target[(index * 3) + 1].value,
					date: event.target[(index * 3) + 2].value
				}
			})
		}

		setLoading(true);
		const response = await postCarga(fileData, columnas, ids["usuario"])
		const solvedPromise = await response[0];
		const id = parseInt(await response[2]);

		if (response[1] === 200) {
			const responseGet = await getCarga(ids.usuario, id);
			const carga = await responseGet[0];
			if (responseGet[1] === 200) {
				const filters = parseFilters(responseGet[2]);
				setIds({ ...ids, carga: id });
				sessionStorage.setItem("anomalyData", JSON.stringify(carga));
				sessionStorage.setItem("config", JSON.stringify(filters));
				sessionStorage.setItem("ids", JSON.stringify({ ...ids, carga: id }));
				setSaveData(true);
			} else {
				handleShow();
				setErrorMessage(carga);
			}
		} else {
			handleShow();
			setErrorMessage(solvedPromise);
		}
	}

	const onChangeValue = (event) => {
		event.preventDefault();

		setTimeout(() => {
			if (event.target.value && event.target.type === "checkbox") {
				for (let index = 0; index < tableRows.length; index++) {
					if (refForm.current[(index * 3) + 2].value && refForm.current[(index * 3) + 2].id !== event.target.id) {
						refForm.current[(index * 3) + 2].value = false;
						refForm.current[(index * 3) + 2].checked = false;
					}
				}
			}
		}, 100)
	}

	return (
		<div className="SelectColumn" style={ { minHeight: "82vh" } }>
			<div style={ { height: "20vh", padding: "5vh 0", textAlign: "center" } }>
				<h2>{ (loading || saveData) ? "Aplicando Inteligencia Artificial" : "Define los actores para entrenar el modelo" }</h2>
			</div>
			{ (tableRows.length !== 0 && !loading && !saveData) ?
				<Form
					ref={ refForm }
					onSubmit={ submitHandler }
					onChange={ onChangeValue } >
					<div>
						<div className="mb-4 d-flex justify-content-between ms-5">
							<div style={ { width: '36vw' } }>
								<h6>Nombre</h6>
							</div>
							<div className="d-flex flex-row justify-content-between" style={ { width: '15vw' } } >
								<h6>Tipo de columna</h6>
							</div>
							<div className="d-flex flex-row" style={ { width: '13vw' } } >
								<h6>Inteligencia artificial</h6>
							</div>
							<div className="d-flex flex-row pe-5">
								<h6>Fecha Principal</h6>
							</div>
						</div >
						{
							tableRows.map((rows, index) => {
								return <Column key={ index } index={ index + 1 } name={ rows }></Column>
							})
						}
					</div>
					<div className="mb-4 d-flex justify-content-center">
						<Button className="primary-button mx-auto"
							type={ 'submit' }
							size="lg">
							Seleccionar Columnas
						</Button>
					</div>
				</Form>
				:
				<Loading message={ "Procesando Información..." } />
			}
			<Modal
				show={ show }
				backdrop="static"
				keyboard={ false }
			>
				<Modal.Header closeButton>
					<Modal.Title>Error de carga</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{ errorMessage }. Volver a la pantalla de upload para intentarlo de nuevo.
				</Modal.Body>
				<Modal.Footer>
					<Button className="primary-button" onClick={ handleClose }>Volver a Upload</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default SelectColumn;