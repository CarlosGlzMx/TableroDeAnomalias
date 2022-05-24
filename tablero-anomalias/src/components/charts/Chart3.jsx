import { React, useState, useContext, useEffect } from "react";
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";
import { DataContext } from "../../App";


function Chart3() {

	const [data6, setData] = useState([{
		name: '-1',
		number: 10
	},
	{
		name: '-0.9',
		number: 12
	}])

	// const data6 = [
	//   {
	//     name: 'Page A',
	//     uv: 4000,
	//     pv: 2400,
	//     amt: 2400,
	//   },
	//   {
	//     name: 'Page B',
	//     uv: 3000,
	//     pv: 1398,
	//     amt: 2210,
	//   },
	//   {
	//     name: 'Page C',
	//     uv: 2000,
	//     pv: 9800,
	//     amt: 2290,
	//   },
	//   {
	//     name: 'Page D',
	//     uv: 2780,
	//     pv: 3908,
	//     amt: 2000,
	//   },
	//   {
	//     name: 'Page E',
	//     uv: 1890,
	//     pv: 4800,
	//     amt: 2181,
	//   },
	//   {
	//     name: 'Page F',
	//     uv: 2390,
	//     pv: 3800,
	//     amt: 2500,
	//   },
	//   {
	//     name: 'Page G',
	//     uv: 3490,
	//     pv: 4300,
	//     amt: 2100,
	//   },
	// ];
	const colors = scaleOrdinal(schemeCategory10).range();


	// #2 Llamar el contexto
	const { anomalyData, setAnomalyData } = useContext(DataContext);

	// #3 Observar cambios en el contexto (datos)
	useEffect(() => {
		// #4 Proceso de cada gráfica
		const UMBRAL_ANOMALIA = 0;
		let [A_1_0, A_0_9, A_0_8, A_0_7, A_0_6, A_0_5, A_0_4, A_0_3, A_0_2, A_0_1, A0, A0_1, A0_2, A0_3, A0_4, A0_5, A0_6, A0_7, A0_8, A0_9, A1_0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (const [key, value] of Object.entries(anomalyData["datos"]["scores"])) {
			var val = Math.round((value + Number.EPSILON) * 10) / 10;

			if (val == -1) {
				A_1_0 += 1;
			}
			else if (val == -0.9) {
				A_0_9 += 1;
			}
			else if (val == -0.8) {
				A_0_8 += 1;
			}
			else if (val == -0.7) {
				A_0_7 += 1;
			}
			else if (val == -0.6) {
				A_0_6 += 1;
			}
			else if (val == -0.5) {
				A_0_5 += 1;
			}
			else if (val == -0.4) {
				A_0_4 += 1;
			}
			else if (val == -0.3) {
				A_0_3 += 1;
			}
			else if (val == -0.2) {
				A_0_2 += 1;
			}
			else if (val == -0.1) {
				A_0_1 += 1;
			}
			else if (val == 0) {
				A0 += 1;
			}
			else if (val == 0.1) {
				A0_1 += 1;
			}
			else if (val == 0.2) {
				A0_2 += 1;
			}
			else if (val == 0.3) {
				A0_3 += 1;
			}
			else if (val == 0.4) {
				A0_4 += 1;
			}
			else if (val == 0.5) {
				A0_5 += 1;
			}
			else if (val == 0.6) {
				A0_6 += 1;
			}
			else if (val == 0.7) {
				A0_7 += 1;
			}
			else if (val == 0.8) {
				A0_8 += 1;
			}
			else if (val == 0.9) {
				A0_9 += 1;
			}
			else if (val == 1) {
				A1_0 += 1;
			}
		}

		// #5 Recargar la gráfica con los datos obtenidos
		setData(
			{
				name: '-1',
				number: A_1_0
			},
			{
				name: '-0.9',
				number: A_0_9
			})
	}, [anomalyData]);

	return (

		<div class="chart c3">
			<div class="chart_title">
				Comportamiento de los datos
			</div>

			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={ 150 }
					height={ 40 }
					data={ data6 }
					margin={ {
						top: 15,
						right: 10,
						left: 20,
						bottom: 32,
					} }
				>
					<Bar dataKey="number" fill="#ffba26" />
					<Bar dataKey="Anomalías" fill="#ffba26" />
				</BarChart >
			</ResponsiveContainer >
		</div >

	);
}

export default Chart3;
