import { React, useContext, useEffect, ReactDOM, useState } from "react";
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
import { DataContext, ConfigContext } from "../../App";
import { colorChannel } from "@mui/system";

function Chart4() {
	const data3 = [
		{
			name: 'Planta A',
			Anomalías: 200,
			Datos_Regulares: 1500,
		},
		{
			name: 'Planta B',
			Anomalías: 324,
			Datos_Regulares: 1398,
		},
		{
			name: 'Planta C',
			Anomalías: 106,
			Datos_Regulares: 856,
		},
		{
			name: 'Planta D',
			Anomalías: 230,
			Datos_Regulares: 1001,
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
			if(column_name != "fecha" && column_name != "scores" && column_name != "id"){
				columnStructure = column_name;
				variableName.push(columnStructure);
			}
		}
		setDropDownData(variableName);
	}, [dropDownData]);

	

	return (
		<div className="chart c4">
			<div className="chart_title">
				Anomalías por una variable
			</div>
			<select className="form-select" aria-label="Default select example" 
			onChange={(e) => 
			setConfig({...config,seleccion_g4: e.target.value})}>
				{
					dropDownData.map(variable => 
						<option value={variable}>{ variable }</option>
					)
				}
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