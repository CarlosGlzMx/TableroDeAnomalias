import { React, useContext, useEffect, useState } from "react";
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
import { ConfigContext } from "../../App";
import { DataContext } from "./Dashboard";

const [grisNormal, naranjaAnomalia] = ['#485458', '#FF9900'];

function Chart4() {
	const data3 = [
		{
			name: 'Planta A',
			Registros: 1500,
			Anomalías: 200,
		},
		{
			name: 'Planta B',
			Registros: 1398,
			Anomalías: 324,
		},
		{
			name: 'Planta C',
			Registros: 856,
			Anomalías: 106,
		},
		{
			name: 'Planta D',
			Registros: 1001,
			Anomalías: 230,
		}
	];

	// Llamar el contexto
	const { anomalyData } = useContext(DataContext);
	const { config, setConfig } = useContext(ConfigContext);

	// Se genera el array para llenar el dropdown de los filtros
	const [dropDownData, setDropDownData] = useState([]);


	useEffect(() => {
		var variableName = [];
		var columnStructure;
		for (const column_name of Object.keys(anomalyData)) {
			if (column_name !== "fecha" && column_name !== "scores" && column_name !== "id") {
				columnStructure = column_name;
				variableName.push(columnStructure);
			}
		}
		setDropDownData(variableName);
	}, [dropDownData, anomalyData]);



	return (
		<div className="chart c4">
			<div className="chart_title">
				Anomalías por una variable
			</div>
			<select className="form-select" aria-label="Default select example"
				onChange={ (e) =>
					setConfig({ ...config, seleccion_g4: e.target.value }) }>
				{
					dropDownData.map(variable =>
						<option key={ variable } value={ variable }>{ variable }</option>
					)
				}
			</select>

			<ResponsiveContainer>
				<BarChart
					width={ 1600 }
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
					<CartesianGrid />
					<XAxis type="number" hide />
					<YAxis type="category" width={ 150 } padding={ { left: 20 } } dataKey="name" />
					<Tooltip />
					<Legend />
					<Bar dataKey="Anomalías" fill={ naranjaAnomalia } stackId="stack" />
					<Bar dataKey="Registros" fill={ grisNormal } stackId="stack" />
				</BarChart>
			</ResponsiveContainer>
		</div>

	);



}

export default Chart4;