import { React, useState, useContext, useEffect } from "react";
import { DataContext, ConfigContext } from "../../App";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend, Label } from "recharts";

function Chart1() {
	// Contextos necesarios para la gráfica
	const { config } = useContext(ConfigContext);
	const { anomalyData } = useContext(DataContext);

	// Datos que alimentan la gráfica de pastel
	const [graphData, setGraphData] = useState([{}]);
	const [anomalyPct, setAnomalyPct] = useState(0);

	// Observa cualquier cambio en la configuración
	useEffect(() => {
		// Itera los registros y los cuenta como normales o anomalías
		let [normales, anomalias] = [0, 0];
		for (const [, value] of Object.entries(anomalyData.scores)) {
			value >= config["umbral_anomalia"] ? anomalias += 1 : normales += 1;
		}

		// Actualiza y recarga la gráfica
		setGraphData([{ name: "Datos regulares", value: normales }, { name: "Anomalías", value: anomalias }])
		setAnomalyPct(Math.round(anomalias / (normales + anomalias) * 100));
	}, [anomalyData, config]);

	const COLORS = ['#ffba26', '#fe9000'];

	return (
		<div className="chart c2">
			<div className="chart_title">
				Cantidad de anomalías
			</div>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						data = {graphData}
						innerRadius = {90}
						outerRadius = {130}
						labelLine = {false}
						fill = "#fe9000"
						paddingAngle={5}
						dataKey="value"
						nameKey="name"
						startAngle={90}
						endAngle={450}
						wrapperStyle={{ position: 'relative' }}
					>
						<Label value={`${anomalyPct}%`} position="center" style={{ fontSize: "2rem", fontWeight: "bold", fill: "#fe9000" }} ></Label>
						<Tooltip />
						{graphData.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index]} />
						))}
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}

export default Chart1;