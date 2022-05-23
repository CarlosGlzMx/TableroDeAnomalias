import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useLocation, Link } from "react-router-dom";
import Column from './Column';
import { Form, Button, Spinner } from 'react-bootstrap';
import { postCarga } from "../api/requests"
// import readXlsxFile from 'read-excel-file';
import * as XLSX from "xlsx";

const SelectColumn = (user) => {

	const location = useLocation();

	// Archivo .csv o .xlsx
	const data = location.state?.data;

	const type = location.state?.type;

	//State to store table Column name
	const [tableRows, setTableRows] = useState([]);

	//State to store processed data. Update when API sends response
	const [processedData, setProcessedData] = useState(undefined);

	// useEffect(() => {
	// 	if (processedData) {
	// 		console.log("Works");
	// 		console.log(processedData);
	// 	} else {
	// 		console.log("Does not work");
	// 	}
	// }, [processedData]);

	useEffect(() => {
		if (data !== undefined) {
			if (type === "text/csv") {
				// Passing file data (event.target.files[0]) to parse using Papa.parse
				Papa.parse(data, {
					header: true,
					skipEmptyLines: true,
					complete: function (results) {
						const rowsArray = [];
						const valuesArray = [];

						// Iterating data to get column name and their values
						results.data.map((d) => {
							rowsArray.push(Object.keys(d));
							valuesArray.push(Object.values(d));
						});

						// Filtered Column Names
						setTableRows(rowsArray[0]);
					},
				});
			}
			if (type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
				const reader = new FileReader();

				reader.onload = (evt) => {
					const bstr = evt.target.result;
					const wb = XLSX.read(bstr, { type: "binary", sheetRows: 1 });
					const wsname = wb.SheetNames[0];
					const ws = wb.Sheets[wsname];
					const f = XLSX.utils.sheet_to_json(ws, { header: 1 });
					setTableRows(f[0]);
					console.log(tableRows);
				};
				reader.readAsBinaryString(data);
			}
		}
	}, []);


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


		setProcessedData(await postCarga(data, columnas, user));
	}

	return (
		<div className="SelectColumn" style={ { minHeight: "82vh" } }>
			<div
				style={ {
					height: "20vh",
					marginLeft: "25%",
					padding: "5vh 0"
				} }>
				<h2>Define los actores para entrenar el modelo</h2>
			</div>
			{ tableRows.length !== 0 ?
				<Form onSubmit={ submitHandler }>
					<div className="">
						<div className="mb-4 d-flex justify-content-between ms-5">
							<div className="" style={ { width: '36vw' } }>
								<h6>Nombre</h6>
							</div>
							<div className="d-flex flex-row justify-content-between" style={ { width: '15vw' } } >
								<h6>Tipo de columna</h6>
							</div>
							<div className="d-flex flex-row" style={ { width: '13vw' } } >
								<h6>Intelingecia artificial</h6>
							</div>
							<div className="d-flex flex-row pe-5">
								<h6>Fecha Principal</h6>
							</div>
						</div >
						{
							tableRows.map((rows, index) => {
								return <Column key={ index } index={ index + 1 } name={ rows } ></Column>
							})
						}


					</div>
					<div className="mb-4 d-flex justify-content-center">
						{ processedData === undefined ?
							<Button
								// as={ Link }
								// to="/dashboard"
								// state={ { proccessedData: processedData } }
								style={ {
									backgroundColor: "#ff8300",
									border: "none"
								} }
								className="mx-auto"
								type={ 'submit' }
								size="lg">
								Seleccionar Columnas
							</Button>
							:
							<Button
								as={ Link }
								to="/dashboard"
								state={ { proccessedData: processedData } }
								style={ {
									backgroundColor: "#ff8300",
									border: "none"
								} }
								className="mx-auto"
								size="lg">
								Continuar a Dashboard
							</Button> }
					</div>
				</Form>
				:
				<div
					style={ {
						marginLeft: '40vw',
						maxWidth: '20vw',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'

					} }>
					<Spinner animation="border" role="status" />
					<h4>Leyendo Columnas...</h4>
				</div>
			}
		</div>
	);
};

export default SelectColumn;