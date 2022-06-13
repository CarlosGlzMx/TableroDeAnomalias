import { React, useState, useContext, useEffect } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Label, Cell, Legend } from "recharts";
import { DataContext, ConfigContext } from "./Dashboard";
import { dateInRange } from "./auxMethods";

const [grisNormal, naranjaAnomalia] = ['#485458', '#FF9900'];

function Chart3() {
	// Contextos necesarios para las gráficas
	const { config } = useContext(ConfigContext);
	const { anomalyData } = useContext(DataContext);

	// Datos que alimentan la gráfica de pastel
	const [graphData, setGraphData] = useState([]);
	const [NUM_BARRAS, INICIO, FIN] = [20, config["min_score"], config["max_score"]]

	// Observa cualquier cambio en la configuración
	useEffect(() => {
		// Constantes de parametrización
		const INTERVAL = (FIN - INICIO) / NUM_BARRAS;
		let dataExists = false;

		// Crea las barras con un contador en 0 para las gráficas
		let bars = {};
		for (let i = 0; i < NUM_BARRAS + 1; i++) {
			bars[INICIO + INTERVAL * i] = 0;
		}

		// Llena las barras con cada score asignado
		for (var i = 0; i < Object.keys(anomalyData.scores).length; i++) {
			if (dateInRange(anomalyData["fecha"][i], config["fecha_inicio"], config["fecha_fin"])) {
				for (const bar_limit of Object.keys(bars)) {
					if (anomalyData["scores"][i] >= parseFloat(bar_limit) && anomalyData["scores"][i] < parseFloat(bar_limit) + INTERVAL) {
						dataExists = true;
						bars[bar_limit] += 1;
					}
				}
			}
		}

		if (dataExists) {
			// Pasa los datos al formato que espera Recharts
			const processesData = [];
			for (const [scoreGroup, count] of Object.entries(bars)) {
				processesData.push({ "Grupo": Math.round(parseFloat(scoreGroup) * 1000) / 1000, "Registros": count });
			}
			processesData.sort((a, b) => {
				if (a["Grupo"] > b["Grupo"]) return 1;
				else return -1;
			})
			setGraphData(processesData);
		}
		else {
			setGraphData([])
		}
	}, [anomalyData, config, NUM_BARRAS, INICIO, FIN]);

	return (
		<div className="chart c3">
			<div className="chart_title">Comportamiento de los datos</div>
			{(graphData.length > 0) ? (
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={graphData}
						margin = {{
							top: 20,
							left: 0,
							right : 40,
							bottom: 10
						}}
					>
						<Bar dataKey="Registros">
							{graphData.map((entry, i) => (
								<Cell key={`cell-${i}`} fill={entry["Grupo"] <= config["umbral_anomalia"] ? naranjaAnomalia : grisNormal} />
							))}
						</Bar>
						<XAxis dataKey="Grupo" interval={NUM_BARRAS - 1}><Label value="Puntaje de anomalía" position={"insideBottom"}></Label></XAxis>
						<YAxis tickCount={2}><Label value="Observaciones" angle={-90}></Label></YAxis>
						<Tooltip />
						<Legend payload={[{value: "Anomalías", type:"circle", id:"1", color: naranjaAnomalia},
								{value: "Datos regulares", type:"circle", id:"2", color: grisNormal}]}/>
					</BarChart >
				</ResponsiveContainer >
			) : (
				<div className="card-blue p-4 m-4 text-center">
					<h3>No se encontraron datos para generar la gráfica</h3>
				</div>
			)}
		</div>
	);
}

export default Chart3;
