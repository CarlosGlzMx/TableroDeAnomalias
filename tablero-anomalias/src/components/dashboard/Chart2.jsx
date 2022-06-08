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
import DateTooltip from "./DateTooltip";
import { DataContext, ConfigContext } from "./Dashboard";
import { dateInRange, formatDate, dateTickFormatter } from "./auxMethods";


const [grisNormal, naranjaAnomalia] = ['#485458', '#FF9900'];

function Chart2() {
	// Contextos necesarios para la gráfica
	const { config } = useContext(ConfigContext);
	const { anomalyData } = useContext(DataContext);
	
	// Datos para la generación de la gráfica
	const [graphData, setGraphData] = useState([]);
	const [graphLimits, setGraphLimits] = useState([]);

	// Observa cualquier cambio en la configuración
	useEffect(() => {
		// Contadores por fecha de datos registrados y anomalías
		let groupedByDate = {};
		let listedDates = [];

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

		// Genera la lista para la gráfica, con información adicional de timestamp
		for (const [key, value] of Object.entries(groupedByDate)) {
			let date = new Date(key);
			listedDates.push({
				"Fecha": formatDate(date),
				"Stamp": date.getTime() / 1000,
				"Registros": value["registros"],
				"Anomalías": value["anomalias"] 
			})
		}

		// Reordena en fecha ascendente
		listedDates.sort((a, b) => {
			if (a["Stamp"] > b["Stamp"]) return 1;
			else if (a["Stamp"] < b["Stamp"]) return -1;
			else return 0;
		})

		// Guarda los límites de la gráfica
		if (listedDates.length){
			setGraphLimits([listedDates[0]["Stamp"], listedDates[listedDates.length - 1]["Stamp"]])
			setGraphData(listedDates);
		}
	}, [anomalyData, config]);

	return (
		<div className="chart c2">
			<div className="chart_title">Anomalías por fecha</div>
			{(graphData.length > 0) ? (
				<ResponsiveContainer width="100%" height="100%">
					<LineChart width={500} height={300} data={graphData}
						margin = {{right:50, bottom: 10, top: 20}}
					>
						<XAxis tickCount={3} type = "number" dataKey="Stamp" tickFormatter = {dateTickFormatter}
						domain={graphLimits}>
							<Label value="Fecha" position={"insideBottom"}></Label>
						</XAxis>
						<YAxis tickCount={2}><Label value="Cantidad" angle={-90}></Label></YAxis>
						<Tooltip content = {<DateTooltip/>}/>
						<Line
							type="monotone"
							dataKey="Registros"
							stroke={grisNormal}
							dot={false}
						/>
						
						<Line
							type="monotone"
							dataKey="Anomalías"
							stroke={naranjaAnomalia}
							dot={false}
						/>
						<Legend />
					</LineChart>
				</ResponsiveContainer>
			) : (
				<div className="card-blue p-4 m-4 text-center">
					<h3>No se encontraron datos para generar la gráfica</h3>
				</div>

			)}
		</div>
	);
}

export default Chart2;
