import { React, useContext, useState, useEffect } from "react";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	ZAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Label
} from 'recharts';
import { DataContext, ConfigContext } from "./Dashboard";
import { dateInRange } from "./auxMethods";
import BubblesTooltip from "./BubblesTooltip";
import { Modal, Button } from "react-bootstrap";
import ChartHelp from "./Popover";

const [grisNormal, naranjaAnomalia] = ['#485458', '#FF9900'];

function Chart6() {
	// Contextos necesarios para las gráficas
	const { anomalyData } = useContext(DataContext);
	const { config, setConfig } = useContext(ConfigContext);

	// Datos necesarios para la lista de opciones en el filtro
	const [dropDownData, setDropDownData] = useState([]);
	const [regularBubbles, setRegularBubbles] = useState([]);
	const [anomalyBubbles, setAnomalyBubbles] = useState([]);
	const [graphDomains, setGraphDomains] = useState([]);

	// Variable para poder abrir y cerrar los modales
	const [viewModal, setViewModal] = useState(false);

	// Actualiza las opciones de los filtros ante el cambio de datos cargados
	useEffect(() => {
		var variableNames = [];
		for (const column_name of Object.keys(anomalyData)) {
			if (!(["fecha", "Fecha", "scores", "id"].includes(column_name))) {
				variableNames.push(column_name);
			}
		}
		setDropDownData(variableNames);
	}, [anomalyData]);

	// Actualización de los datos que alimentan a la gráfica de barras
	useEffect(() => {
		// Depende de que haya selecciones en los filtros
		if (!config["filtro_g6_1"] || !config["filtro_g6_2"]) return;

		// Contadores por valor único de la variable elegida
		// Se acorta Regular Bubbles a RB y Anomaly Bubbles a AB
		let groupedRB = {}, groupedAB = {};
		let listedRB = [], listedAB = [];
		let encodedX = {}, encodedY = {};

		for (var i = 0, ix = 0, iy = 0; i < Object.keys(anomalyData.scores).length; i++) {
			// Filtra por el rango de fechas
			if (dateInRange(anomalyData["fecha"][i], config["fecha_inicio"], config["fecha_fin"])) {
				// Variables para reducir el tamaño del código
				const v1 = anomalyData[config["filtro_g6_1"]][i];
				const v2 = anomalyData[config["filtro_g6_2"]][i];

				// Incrementa por uno según si es o no una anomalía para la variable elegida
				if (anomalyData.scores[i] <= config["umbral_anomalia"]) {
					if (!groupedAB[v1]) groupedAB[v1] = {};
					groupedAB[v1][v2] = groupedAB[v1][v2] + 1 || 1;
				}
				else {
					if (!groupedRB[v1]) groupedRB[v1] = {};
					groupedRB[v1][v2] = groupedRB[v1][v2] + 1 || 1;
				}

				// Se genera un diccionario de texto a numero
				if (!encodedX[v1]) encodedX[v1] = ix++;
				if (!encodedY[v2]) encodedY[v2] = iy++;
			}
		}

		// Genera la lista de objetos que acepta la gráfica de dispersión (Regulares)
		for (const [keyX, subObject] of Object.entries(groupedRB)) {
			for (const [keyY, count] of Object.entries(subObject)) {
				listedRB.push({
					"tipo": "Datos regulares",
					"x": encodedX[keyX], "y": encodedY[keyY], "count": count,
					"v1": keyX, "v2": keyY
				});
			}
		}

		// Genera la lista de objetos que acepta la gráfica de dispersión (Anomalías)
		for (const [keyX, subObject] of Object.entries(groupedAB)) {
			for (const [keyY, count] of Object.entries(subObject)) {
				listedAB.push({
					"tipo": "Anomalías",
					"x": encodedX[keyX], "y": encodedY[keyY], "count": count,
					"v1": keyX, "v2": keyY
				})
			}
		}

		// Actualiza los datos de estado para recargar las gráficas
		setRegularBubbles(listedRB);
		setAnomalyBubbles(listedAB);
		setGraphDomains({ "x": [0, Object.keys(encodedX).length + 1], "y": [0, Object.keys(encodedY).length + 1] });
	}, [anomalyData, config]);

	function bubblesChart() {
		return (
			<ResponsiveContainer width={ "100%" } aspect={ viewModal ? undefined : 1 }>
				<ScatterChart onClick={ () => { if (!viewModal) setViewModal(true) } }
					margin={ {
						top: 30,
						right: 20,
						bottom: 0,
						left: 0,
					} }
				>
					<XAxis type="number" dataKey="x" tick={ false } domain={ graphDomains["x"] }>
						<Label value={ config["filtro_g6_1"] }></Label>
					</XAxis>
					<YAxis type="number" dataKey="y" tick={ false } domain={ graphDomains["y"] }>
						<Label value={ config["filtro_g6_2"] } angle={ -90 }></Label>
					</YAxis>
					<ZAxis type="number" dataKey="count" range={ [20, 400] } />
					<Tooltip cursor={ { strokeDasharray: '3 3' } } content={ <BubblesTooltip /> } />

					<Scatter dataKey="Datos regulares" fill={ grisNormal } stackId="stack" data={ regularBubbles } shape="circle" />
					<Scatter dataKey="Anomalías" fill={ naranjaAnomalia } stackId="stack" data={ anomalyBubbles } shape="cross" />
					<Legend payload={ [{ value: "Anomalías", type: "circle", id: "1", color: naranjaAnomalia },
					{ value: "Datos regulares", type: "circle", id: "2", color: grisNormal }] } />
				</ScatterChart>
			</ResponsiveContainer>
		);
	}


	return (
		<div className="chart c6 d-flex flex-column justify-content-start">
			<div className="chart_title">
				Dispersión de anomalías <ChartHelp number={6}/>
			</div>
			<div className="d-flex">
				<select className="form-select m-2" aria-label="Default select example" defaultValue={ config["filtro_g6_1"] }
					onChange={ (e) => setConfig({ ...config, filtro_g6_1: e.target.value }) }>
					<option value="" disabled hidden>Variable filtro 1</option>
					{
						dropDownData.map(variable => {
							if (variable !== config["filtro_g6_2"]) {
								return <option key={ variable + "filer6-1" } value={ variable }>{ variable }</option>
							}
							return null;
						})
					}
				</select>
				<select className="form-select m-2" aria-label="Default select example" defaultValue={ config["filtro_g6_2"] }
					onChange={ (e) => setConfig({ ...config, filtro_g6_2: e.target.value }) }>
					<option value="" disabled hidden>Variable filtro 2</option>
					{
						dropDownData.map(variable => {
							if (variable !== config["filtro_g6_1"]) {
								return <option key={ variable + "filer6-2" } value={ variable }>{ variable }</option>
							}
							return null;
						})
					}
				</select>
			</div>
			{
				(regularBubbles.length || anomalyBubbles.length) ? (
					<>
						{ bubblesChart() }
						<Modal fullscreen={ true } show={ viewModal } onHide={ () => setViewModal(false) }>
							<Modal.Header className="full-screen-chart-header d-flex justify-content-between">
								<Modal.Title>Gráfica de burbujas</Modal.Title>
								<Button className="primary-button" onClick={ () => setViewModal(false) }>
									Cerrar
								</Button>
							</Modal.Header>
							<Modal.Body>
								{ bubblesChart() }
							</Modal.Body>
						</Modal>
					</>
				) : (
					<div className="card-blue p-4 m-4 text-center">
						<h3>No se encontraron datos para generar la gráfica</h3>
					</div>
				)
			}
		</div >
	);
}

export default Chart6;