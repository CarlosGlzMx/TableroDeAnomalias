import { React, useContext, useEffect, useState } from "react";
import {
	Tooltip,
	BarChart,
	XAxis,
	YAxis,
	Legend,
	CartesianGrid,
	Bar,
	ResponsiveContainer,
	Label
} from "recharts";
import { DataContext, ConfigContext } from "./Dashboard";
import { dateInRange } from "./auxMethods";

const [grisNormal, naranjaAnomalia] = ['#485458', '#FF9900'];

function Chart5() {
	// Contextos necesarios para las gráficas
	const { anomalyData } = useContext(DataContext);
	const { config, setConfig } = useContext(ConfigContext);

	// Datos necesarios para la lista de opciones en el filtro
	const [dropDownData, setDropDownData] = useState([]);
	const [graphData, setGraphData] = useState([]);

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

	if (graphData.length > 0) {
		return (

			<div className="chart c5 d-flex flex-column justify-content-start">
				<div className="chart_title">
					Anomalías por dos variables
				</div>
				<div className="d-flex">
					<select className="form-select" aria-label="Default select example" defaultValue={ "" }
						onChange={ (e) =>
							setConfig({ ...config, seleccion_g5_1: e.target.value }) }>
						<option value="" disabled hidden>Variable filtro 1</option>
						{
							dropDownData.map(variable => {
								if (variable !== config["seleccion_g5_2"]) {
									return <option key={ variable + "filer5-1" } value={ variable }>{ variable }</option>
								}
								return null;
							})
						}
					</select>
					<select className="form-select" aria-label="Default select example" defaultValue={ "" }
						onChange={ (e) =>
							setConfig({ ...config, seleccion_g5_2: e.target.value }) }>
						<option value="" disabled hidden>Variable filtro 2</option>
						{
							dropDownData.map(variable => {
								if (variable !== config["seleccion_g5_1"]) {
									return <option key={ variable + "filer5-2" } value={ variable }>{ variable }</option>
								}
								return null;
							})
						}
					</select>
				</div>
				<ResponsiveContainer width={ "100%" } aspect={ 1 }>
					<BarChart
						data={ graphData }
						layout="vertical"
						barCategoryGap={ 5 }
						margin={ {
							top: 30,
							bottom: 60,
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
						<Tooltip />
						<Bar dataKey="Anomalías" fill={ naranjaAnomalia } stackId="stack" />
						<Bar dataKey="Normales" fill={ grisNormal } stackId="stack" />
						<Legend/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		);
		
	} else {
		return (
			<div className="chart c2">
				<div className="chart_title">Anomalías por fecha</div>
				<ResponsiveContainer width="100%" height="100%">
					<div className="chartError">
						<h3>No fue posible mostrar gráfica debido a que no existe información suficiente</h3>
					</div>
				</ResponsiveContainer>
			</div>
		);
	}
	
	
}

export default Chart5;