import { React, useContext, useState, useEffect } from "react";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	ZAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
  Label
} from 'recharts';
import { DataContext, ConfigContext } from "./Dashboard";
import { dateInRange } from "./auxMethods";


const [grisNormal, naranjaAnomalia] = ['#485458', '#FF9900'];

function Chart6() {
	// Contextos necesarios para las gráficas
	const { anomalyData } = useContext(DataContext);
	const { config, setConfig } = useContext(ConfigContext);

	// Datos necesarios para la lista de opciones en el filtro
	const [dropDownData, setDropDownData] = useState([]);
	const [graphData, setGraphData] = useState([]);

	const data01 = [
		{ tipo: "Regulares", x: 100, y: 200, z: 200 },
		{ tipo: "Regulares", x: 120, y: 100, z: 260 },
		{ tipo: "Regulares", x: 170, y: 300, z: 400 },
		{ tipo: "Regulares", x: 140, y: 250, z: 280 },
		{ tipo: "Regulares", x: 150, y: 400, z: 500 },
		{ tipo: "Regulares", x: 110, y: 280, z: 200 },
	];
	const data02 = [
		{ tipo: "Anomalías", x: 200, y: 260, z: 240 },
		{ tipo: "Anomalías", x: 240, y: 290, z: 220 },
		{ tipo: "Anomalías", x: 190, y: 290, z: 250 },
		{ tipo: "Anomalías", x: 198, y: 250, z: 210 },
		{ tipo: "Anomalías", x: 180, y: 280, z: 260 },
		{ tipo: "Anomalías", x: 210, y: 220, z: 230 },
	];

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
		// Depende de que haya una selección en el filtro
		if (!config["seleccion_g5_1"] || !config["seleccion_g5_2"]) return;

		// Contadores por valor único de la variable elegida
		let groupedByVarsValue = {};
		let listedBars = [];

		for (var i = 0; i < Object.keys(anomalyData.scores).length; i++) {
			// Filtra por el rango de fechas
			if (dateInRange(anomalyData["fecha"][i], config["fecha_inicio"], config["fecha_fin"])) {
				// De ser necesario, inicializa los objetos
				if (!groupedByVarsValue[anomalyData[config["seleccion_g5_1"]][i] + " x " + anomalyData[config["seleccion_g5_2"]][i]]) {
					groupedByVarsValue[anomalyData[config["seleccion_g5_1"]][i] + " x " + anomalyData[config["seleccion_g5_2"]][i]] = { "normales": 0, "anomalias": 0 };
				}

				// Incrementa por uno según si es o no una anomalía para la variable elegida
				if (anomalyData.scores[i] <= config["umbral_anomalia"]) {
					groupedByVarsValue[anomalyData[config["seleccion_g5_1"]][i] + " x " + anomalyData[config["seleccion_g5_2"]][i]]["anomalias"] += 1;
				}
				else {
					groupedByVarsValue[anomalyData[config["seleccion_g5_1"]][i] + " x " + anomalyData[config["seleccion_g5_2"]][i]]["normales"] += 1;
				}
			}
		}

		// Traduce los datos a una lista que pueda procesar el app
		for (const [key, value] of Object.entries(groupedByVarsValue)) {
			listedBars.push({ "Variables": key, "Normales": value["normales"], "Anomalías": value["anomalias"] });
		}

		// Ordena y hace slice para limitar la cantidad de barras acumuladas
		listedBars.sort((a, b) => {
			if (a["Normales"] + a["Anomalías"] < b["Normales"] + b["Anomalías"]) return 1;
			else if (a["Normales"] + a["Anomalías"] > b["Normales"] + b["Anomalías"]) return - 1;
			else if (a["Anomalías"] < b["Anomalías"]) return 1;
			else if (a["Anomalías"] > b["Anomalías"]) return -1;
			else return 0;
		})
		setGraphData(listedBars.slice(0, Math.min(10, listedBars.length)));
	}, [anomalyData, config]);
  console.log(graphData);

	return (

		<div className="chart c6">
			<div className="chart_title">
				Frecuencia de anomalías
			</div>
			<div className="d-flex">
				<select className="form-select" aria-label="Default select example" defaultValue={ "" }
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
				<select className="form-select" aria-label="Default select example" defaultValue={ "" }
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
			<ResponsiveContainer width="100%" height="100%">
				<ScatterChart
					width={ 400 }
					height={ 400 }
					margin={ {
						top: 20,
						right: 20,
						bottom: 20,
						left: 20,
					} }
				>
					<CartesianGrid />
					<XAxis type="number" />
					<YAxis tick={ false } type="category" dataKey="Variables">
            <Label value={
							!config["seleccion_g5_1"] || !config["seleccion_g5_2"] ? "" :
								`${config["seleccion_g5_1"]} x ${config["seleccion_g5_2"]}`
						} angle={ -90 }></Label>
          </YAxis>
					<ZAxis type="number" dataKey="z" range={ [60, 400] } name="score" unit="km" />
					<Tooltip cursor={ { strokeDasharray: '3 3' } } />
					<Legend />
					<Scatter dataKey="Anomalías" fill={ naranjaAnomalia } stackId="stack" data={ data01 } shape="circle" />
					<Scatter dataKey="Normales" fill={ grisNormal } stackId="stack" data={ data02 } shape="circle" />
					<Legend />
				</ScatterChart>
			</ResponsiveContainer>
		</div>

	);
}

export default Chart6;