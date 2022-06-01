import { React, useState, useContext, useEffect } from "react";
import { DataContext, ConfigContext } from "../../App";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";

function Chart1() {
	// Contextos necesarios para la gráfica
	const { config } = useContext(ConfigContext);
	const { anomalyData } = useContext(DataContext);

	// Datos que alimentan la gráfica de pastel
	const [ graphData, setGraphData] = useState([{}]);

	// Observa cualquier cambio en la configuración
	useEffect(() => {
		// Itera los registros y los cuenta como normales o anomalías
		console.log("Here");
		let [normales, anomalias] = [0, 0];
		for (const [, value] of Object.entries(anomalyData.scores)) {
			value >= config["umbral_anomalia"] ? anomalias += 1 : normales += 1;
		}

		// Actualiza y recarga la gráfica
		setGraphData([{ Datos: "Anomalías", users: anomalias }, { Datos: "Datos regulares", users: normales }])
	}, [config]);

	const COLORS = ['#fe9000', '#ffba26'];

	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text x={ x } y={ y } fill="black" textAnchor={ x > cx ? 'start' : 'end' } dominantBaseline="central">
				{ `${(percent * 100).toFixed(0)}%` }
			</text>
		);

	};


	return (
		<div className="chart c2">
			<div className="chart_title">
				Cantidad de anomalías
			</div>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart dataKey="c1data">
					<Pie
						data={ graphData }
						innerRadius={ 80 }
						outerRadius={ 120 }
						labelLine={ false }
						label={ renderCustomizedLabel }
						fill="#fe9000"
						paddingAngle={ 5 }
						dataKey="users"
						wrapperStyle={ { position: 'relative' } }

					>
						<Tooltip />
						<Legend />
						{ graphData.map((entry, index) => (
							<Cell key={ `cell-${index}` } fill={ COLORS[index % COLORS.length] } />
						)) }
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}

export default Chart1;