import { React, useState, useContext, useEffect } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Label, Cell, Legend, Line } from "recharts";
import { DataContext, ConfigContext } from "./Dashboard";
import { dateInRange } from "./auxMethods";

const [grisNormal, naranjaAnomalia] = ['#485458', '#FF9900'];
 
function Chart3() {
	// Contextos necesarios para las gráficas
	const { config } = useContext(ConfigContext);
	const { anomalyData } = useContext(DataContext);

	// Datos que alimentan la gráfica de pastel
	const [graphData, setGraphData] = useState([{}]);
	const [NUM_BARRAS, INICIO, FIN] = [20, config["min_score"], config["max_score"]]

	// Observa cualquier cambio en la configuración
	useEffect(() => {
		// Constantes de parametrización
		const INTERVAL = (FIN - INICIO) / NUM_BARRAS;

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
						bars[bar_limit] += 1;
					}
				}
			}
		}

		// Pasa los datos al formato que espera Recharts
		const processesData = [];
		for (const [scoreGroup, count] of Object.entries(bars)) {
			processesData.push({ "Grupo": Math.round(parseFloat(scoreGroup) * 1000) / 1000, "Cantidad de anomalías": count });
		}
		processesData.sort((a, b) => {
			if (a["Grupo"] > b["Grupo"]) return 1;
			else return -1;
		})
		setGraphData(processesData);
	}, [anomalyData, config, NUM_BARRAS, INICIO, FIN]);

	return (

		<div className="chart c3">
			<div className="chart_title">
				Comportamiento de los datos
			</div>

			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={ 150 }
					height={ 40 }
					data={ graphData }
					margin={ {
						top: 15,
						right: 10,
						left: 20,
						bottom: 32,
					} }
				>
					<Bar dataKey="Cantidad de anomalías" fill={ naranjaAnomalia }>
						{ graphData.map((entry, i) => (
							<Cell key={ `cell-${i}` } fill={ entry["Grupo"] <= config["umbral_anomalia"] ? naranjaAnomalia : grisNormal } />
						)) }

					</Bar>
					<XAxis dataKey="Grupo" interval={ NUM_BARRAS - 1 }><Label value="Puntaje de anomalía" position={ "insideBottom" }></Label></XAxis>
					<YAxis tickCount={ 2 }><Label value="Observaciones" angle={ -90 }></Label></YAxis>
					<Line
						type="monotone"
						dataKey="Registros"
						stroke={ grisNormal }
						dot={ false }
					/>
					<Legend />
					<Tooltip />
					
					<Legend />
				</BarChart >
			</ResponsiveContainer >
		</div >

	);
}

export default Chart3;
