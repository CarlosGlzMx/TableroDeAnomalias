import { React, useContext, useEffect, useState } from "react";
import {
	Tooltip,
	XAxis,
	YAxis,
	Legend,
	ResponsiveContainer,
	LineChart,
	Line,
	Label,
} from "recharts";
import { DataContext, ConfigContext } from "./Dashboard";
import { dateInRange } from "./auxMethods";

const [grisNormal, naranjaAnomalia] = ['#485458', '#FF9900'];

function Chart2() {
	// Contextos necesarios para la gráfica
	const { config } = useContext(ConfigContext);
	const { anomalyData } = useContext(DataContext);

	// Datos para la generación de la gráfica
	const [graphData, setGraphData] = useState([]);

	// Observa cualquier cambio en la configuración
	useEffect(() => {
		// Contadores por fecha de datos registrados y anomalías
		let groupedByDate = {};
		let listedDates = [];
		let listedDatesFinal = []
		let listedDatesFinal1 = []

		for (var i = 0; i < Object.keys(anomalyData.scores).length; i++) {
			// Filtra por el rango de fechas
			if (dateInRange(anomalyData["fecha"][i], config["fecha_inicio"], config["fecha_fin"])) {
				// De ser necesario, inicializa los objetos
				if (!groupedByDate[anomalyData.fecha[i]]) {
					groupedByDate[anomalyData.fecha[i]] = { "registros": 0, "anomalias": 0 };
				}

				// Incrementa por uno la cantidad de registros en esta fecha
				groupedByDate[anomalyData.fecha[i]]["registros"] += 1;
				if (anomalyData.scores[i] <= config["umbral_anomalia"]) {
					groupedByDate[anomalyData.fecha[i]]["anomalias"] += 1;
				}
			}
		}

		// Traduce los datos a una lista que pueda procesar el app
		var reducedDate
		var dateObject1
		for (const [key, value] of Object.entries(groupedByDate)) {
			dateObject1 = new Date(key);
			//reducedDate = dateObject1.toLocaleDateString()
			listedDates.push({ "Fecha": dateObject1, "Registros": value["registros"], "Anomalías": value["anomalias"] });

		}

		listedDatesFinal = listedDates.slice().sort((a, b) => a.Fecha - b.Fecha);
		//console.log(listedDatesFinal[1].Fecha)
		//  for (var i = 0; listedDatesFinal.length - 1; i++){
		//     	dateObject1 = listedDatesFinal[i].Fecha;
		//     	reducedDate = dateObject1.toLocaleDateString()
		//     	listedDatesFinal1.push({ "Fecha": reducedDate, "Registros": listedDatesFinal[i].Registros, "Anomalías": listedDatesFinal[i].Anomalías });
		//     }
		//  for (const [key, value] of Object.entries(groupedByDate)) {
		//  	dateObject1 = new Date (key);
		//  	reducedDate = dateObject1.toLocaleDateString()
		//  	listedDatesFinal.push({ "Fecha": reducedDate, "Registros": value["registros"], "Anomalías": value["anomalias"] });

		// // }

		setGraphData(listedDatesFinal);
	}, [anomalyData, config]);

	//console.log(graphData[1].Fecha);

	if (graphData.length > 0) {
		return (
			<div className="chart c2">
				<div className="chart_title">Anomalías por fecha</div>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart width={ 500 } height={ 300 } data={ graphData }>
						<XAxis dataKey="Fecha" interval={ graphData.length - 2 }>
							<Label value="Fecha" position={ "insideBottom" }></Label>
						</XAxis>
						<YAxis tickCount={ 2 }><Label value="Cantidad" angle={ -90 }></Label></YAxis>
						<Tooltip />
						<Line
							type="monotone"
							dataKey="Registros"
							stroke={ grisNormal }
							dot={ false }
						/>
						<Line
							type="monotone"
							dataKey="Anomalías"
							stroke={ naranjaAnomalia }
							dot={ false }
						/>
						<Legend />

					</LineChart>
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

export default Chart2;
