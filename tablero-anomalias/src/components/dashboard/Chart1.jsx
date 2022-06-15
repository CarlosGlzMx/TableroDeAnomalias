import { React, useState, useContext, useEffect } from "react";
import { DataContext, ConfigContext } from "./Dashboard";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend, Label } from "recharts";
import { dateInRange } from "./auxMethods";

const [grisNormal, naranjaAnomalia] = ['#485458', '#FF9900'];

function Chart1() {
	// Contextos necesarios para la gráfica
	const { config } = useContext(ConfigContext);
	const { anomalyData } = useContext(DataContext);

	// Datos que alimentan la gráfica de pastel
	const [graphData, setGraphData] = useState([]);
	const [anomalyPct, setAnomalyPct] = useState(0);

	// Observa cualquier cambio en la configuración
	useEffect(() => {
		// Itera los registros y los cuenta como normales o anomalías
		let [normales, anomalias] = [0, 0];
		for (var i = 0; i < Object.keys(anomalyData.scores).length; i++) {
			if (dateInRange(anomalyData["fecha"][i], config["fecha_inicio"], config["fecha_fin"])) {
				anomalyData["scores"][i] <= config["umbral_anomalia"] ? anomalias += 1 : normales += 1
			}
		}

		// Prepara el caso de una gráfica vacía
		if (normales + anomalias === 0) {
			setGraphData([])
		}
		else {
			// Actualiza y recarga la gráfica
			setGraphData([{ name: "Datos regulares", value: normales }, { name: "Anomalías", value: anomalias }])
			setAnomalyPct(Math.round(anomalias / (normales + anomalias) * 100));
		}
	}, [anomalyData, config]);

	return (
		<div className="chart c1">
			<div className="chart_title">Cantidad de anomalías</div>
			{(graphData.length > 0) ? (

				<ResponsiveContainer className="d-flex justify-content-center" width={ "100%" } aspect={ 1 }>
					<PieChart>
						<Pie
							data={graphData}
							innerRadius={90}
							outerRadius={130}
							labelLine={false}
							fill="#fe9000"
							paddingAngle={5}
							dataKey="value"
							nameKey="name"
							startAngle={90}
							endAngle={450}
							wrapperStyle={{ position: 'relative' }}
						>
							{graphData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={index ? naranjaAnomalia : grisNormal} />
							))}
							<Label id="anomaly-pct-label" value={`${anomalyPct}%`} position="center"></Label>
						</Pie>
						<Tooltip />
						<Legend payload={[{value: "Anomalías", type:"circle", id:"1", color: naranjaAnomalia},
								{value: "Datos regulares", type:"circle", id:"2", color: grisNormal}]}/>					</PieChart>
				</ResponsiveContainer>
			)
				:
				(
				<div className = "card-blue p-4 m-4 text-center">
					<h3>No se encontraron datos para generar la gráfica</h3>
				</div>
				) }
		</div>
	);
}

export default Chart1;