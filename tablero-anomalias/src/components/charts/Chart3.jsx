import { React, useState, useContext, useEffect } from "react";
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
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


	const colors = scaleOrdinal(schemeCategory10).range();


	// #2 Llamar el contexto
	const { anomalyData } = useContext(DataContext);

	// #3 Observar cambios en el contexto (datos)
	useEffect(() => {
		// #4 Proceso de cada gráfica
		const UMBRAL_ANOMALIA = 0;
		let [A_1_0, A_0_9, A_0_8, A_0_7, A_0_6, A_0_5, A_0_4, A_0_3, A_0_2, A_0_1, A0, A0_1, A0_2, A0_3, A0_4, A0_5, A0_6, A0_7, A0_8, A0_9, A1_0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (const [key, value] of Object.entries(anomalyData.anomaly_score)) {
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
		setData([
			{
				name: '-1',
				number: A_1_0
			},
			{
				name: '-0.9',
				number: A_0_9
			},
			{
				name: '-0.8',
				number: A_0_8
			},
			{
				name: '-0.7',
				number: A_0_7
			},
			{
				name: '-0.6',
				number: A_0_6
			},
			{
				name: '-0.5',
				number: A_0_5
			},
			{
				name: '-0.4',
				number: A_0_4
			},
			{
				name: '-0.3',
				number: A_0_3
			},
			{
				name: '-0.2',
				number: A_0_2
			},
			{
				name: '-0.1',
				number: A_0_1
			},
			{
				name: '0.0',
				number: A0
			},
			{
				name: '0.1',
				number: A0_1
			},
			{
				name: '0.2',
				number: A0_2
			},
			{
				name: '0.3',
				number: A0_3
			},
			{
				name: '0.4',
				number: A0_4
			},
			{
				name: '0.5',
				number: A0_5
			},
			{
				name: '0.6',
				number: A0_6
			},
			{
				name: '0.7',
				number: A0_7
			},
			{
				name: '0.8',
				number: A0_8
			},
			{
				name: '0.9',
				number: A0_9
			},
			{
				name: '1.0',
				number: A1_0
			}
		])
	}, [anomalyData]);

	return (

		<div className="chart c3">
			<div className="chart_title">
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
					<XAxis />
					<YAxis />
					<Tooltip />
				</BarChart >
			</ResponsiveContainer >
		</div >

	);
}

export default Chart3;
