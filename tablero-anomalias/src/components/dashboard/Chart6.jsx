import { React, useContext, useState, useEffect } from "react";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	ZAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { DataContext, ConfigContext } from "./Dashboard";


const [grisNormal, naranjaAnomalia] = ['#485458', '#FF9900'];

function Chart6() {
	// Contextos necesarios para las gráficas
	const { config, setConfig } = useContext(ConfigContext);
	const { anomalyData } = useContext(DataContext);

	// Datos necesarios para la lista de opciones en el filtro
	const [dropDownData, setDropDownData] = useState([]);

	const data01 = [
		{ tipo: "Regulares", x: 100, y: 200, z: 200 },
		{ tipo: "Regulares", x: 120, y: 100, z: 260 },
		{ tipo: "Regulares", x: 170, y: 300, z: 400 },
		{ tipo: "Regulares", x: 140, y: 250, z: 280 },
		{ tipo: "Regulares", x: 150, y: 400, z: 500 },
		{ tipo: "Regulares", x: 110, y: 280, z: 200 },
	];
	const data02 = [
		{ tipo: "Anomalías", x: 200, y: 260, z: 240 },
		{ tipo: "Anomalías", x: 240, y: 290, z: 220 },
		{ tipo: "Anomalías", x: 190, y: 290, z: 250 },
		{ tipo: "Anomalías", x: 198, y: 250, z: 210 },
		{ tipo: "Anomalías", x: 180, y: 280, z: 260 },
		{ tipo: "Anomalías", x: 210, y: 220, z: 230 },
	];

	// Actualiza las opciones de los filtros ante el cambio de datos cargados
	useEffect(() => {
		var variableNames = [];
		for (const column_name of Object.keys(anomalyData)) {
			if (!(["fecha", "Fecha", "scores", "id"].includes(column_name))) {
				variableNames.push(column_name);
			}
		}
		setDropDownData(variableNames);
	}, [anomalyData]);


	return (

		<div className="chart c6">
			<div className="chart_title">
				Frecuencia de anomalías
			</div>
			<div className="d-flex">
				<select className="form-select" aria-label="Default select example" defaultValue={ "" }
					onChange={ (e) => setConfig({ ...config, seleccion_g6_1: e.target.value }) }>
					<option value="" disabled hidden>Variable filtro 1</option>
					{
						dropDownData.map(variable => {
							if (variable !== config["seleccion_g6_2"]) {
								return <option key={ variable + "filer6-1" } value={ variable }>{ variable }</option>
							}
							return null;
						})
					}
				</select>
				<select className="form-select" aria-label="Default select example" defaultValue={ "" }
					onChange={ (e) => setConfig({ ...config, seleccion_g6_2: e.target.value }) }>
					<option value="" disabled hidden>Variable filtro 2</option>
					{
						dropDownData.map(variable => {
							if (variable !== config["seleccion_g6_1"]) {
								return <option key={ variable + "filer6-2" } value={ variable }>{ variable }</option>
							}
							return null;
						})
					}
				</select>
			</div>
			<ResponsiveContainer width="100%" height="100%">
				<ScatterChart
					width={ 400 }
					height={ 400 }
					margin={ {
						top: 20,
						right: 20,
						bottom: 20,
						left: 20,
					} }
				>
					<CartesianGrid />
					<XAxis type="number" dataKey="x" name="stature" unit="" />
					<YAxis type="number" dataKey="y" name="weight" unit="" />
					<ZAxis type="number" dataKey="z" range={ [60, 400] } name="score" unit="km" />
					<Tooltip cursor={ { strokeDasharray: '3 3' } } />
					<Legend />
					<Scatter dataKey="tipo" name="Anomalia_1" data={ data01 } fill={ grisNormal } shape="circle" />
					<Scatter dataKey="tipo" name="Anomalia_2" data={ data02 } fill={ naranjaAnomalia } shape="circle" />
					<Legend />
				</ScatterChart>
			</ResponsiveContainer>
		</div>

	);
}

export default Chart6;