import { React, useContext, useEffect, useRef } from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	Tooltip,
	BarChart,
	XAxis,
	YAxis,
	Legend,
	CartesianGrid,
	Bar,
	ResponsiveContainer,
} from "recharts";
import { DataContext } from "../../App";

function Chart4() {
	const data3 = [
		{
			name: 'Planta A',
			Anomalías: 200,
			Datos_Regulares: 1500,
			//amt: 2400,
		},
		{
			name: 'Planta B',
			Anomalías: 324,
			Datos_Regulares: 1398,
			//amt: 2210,
		},
		{
			name: 'Planta C',
			Anomalías: 106,
			Datos_Regulares: 856,
			//amt: 2290,
		},
		{
			name: 'Planta D',
			Anomalías: 230,
			Datos_Regulares: 1001,
			//amt: 2000,
		}
	];


	const filters = [
		{
			id: 1,
			name: "filtro 1",
			details: "Detalles de Anomalia 1"
		},
		{
			id: 2,
			name: "filtro 2",
			details: "Detalles de Anomalia 2"
		},
		{

			id: 3,
			name: "filtro 3",
			details: "Detalles de Anomalia 3"
		},
		{

			id: 46,
			name: "filtro 4",
			details: "Detalles de Anomalia 4"
		},
	]

	// #2 Llamar el contexto
	const { anomalyData } = useContext(DataContext);
	var filterList = useRef();


	useEffect(() => {
		console.log(anomalyData);
		const variableName = [];
		var item;
		var tmp;

		for (var i = 0; i < 5; i++) {

			// for (const [, value] of Object.entries(anomalyData["datos"])) {

			item = anomalyData[3];
			tmp = {
				'variable': item,

			};
			variableName.push(tmp);
		}

		// console.log(anomalyData.length);
		// console.log(variableName);

		filterList.current = variableName.map(variableName => <option value={ variableName.variable }>
			{ variableName.variable }</option>)

		// console.log(filterList);
		// console.log(anomalyData["scores"].length);
		// console.log(anomalyData[1]);


	}, [anomalyData]);





	return (

		<div className="chart c4">
			<div className="chart_title">
				Anomalías por una variable
			</div>
			<select className="form-select" aria-label="Default select example">
				<option selected>Filtrar por</option>
				{ filterList.current }
			</select>


			<ResponsiveContainer>
				<BarChart
					width={ 500 }
					height={ 300 }
					data={ data3 }
					layout="vertical" barCategoryGap={ 45 }
					margin={ {
						top: 15,
						right: 30,
						left: 0,
						bottom: 45,
					} }
				>
					<CartesianGrid strokeDasharray="6 6" />
					<XAxis type="number" hide />
					<YAxis type="category" width={ 150 } padding={ { left: 20 } } dataKey="name" />
					<Tooltip />
					<Legend />
					<Bar dataKey="Anomalías" fill="#ff7304" stackId="stack" />
					<Bar dataKey="Datos_Regulares" fill="#ffba26" stackId="stack" />
				</BarChart>
			</ResponsiveContainer>
		</div>

	);
}

export default Chart4;