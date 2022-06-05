import { React, useContext, useEffect, ReactDOM, useState } from "react";
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
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";


function Chart5() {

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

      // Llamar el contexto
      const { anomalyData } = useContext(DataContext);
      const { config, setConfig } = useContext(ConfigContext);

      // Se genera el array para llenar el dropdown de los filtros
      const [dropDownData, setDropDownData] = useState([]);
      
      
      useEffect(() => {
        var variableName = [];
        var columnStructure;
        for (const column_name of Object.keys(anomalyData)) {
          if(column_name != "FECHA" && column_name != "scores" && column_name != "id"){
            columnStructure = column_name;
            variableName.push(columnStructure);
          }
        }
        setDropDownData(variableName);
      }, [dropDownData]);

        
      
	return (

    <div className="chart c5">
      <div className="chart_title">
            Anomalías por dos variables
            </div>
          <div className="horizontalFilters">
          <select className="form-select" aria-label="Default select example" 
			onChange={(e) => 
			setConfig({...config,seleccion_g4: e.target.value})}>
				{
					dropDownData.map(variable => 
						<option value={variable}>{ variable }</option>
					)
				}
			</select>
      <select className="form-select" aria-label="Default select example" 
			onChange={(e) => 
			setConfig({...config,seleccion_g4: e.target.value})}>
				{
					dropDownData.map(variable => 
						<option value={variable}>{ variable }</option>
					)
				}
			</select>
          </div>
          <ResponsiveContainer>
          <BarChart 
          width={500}
          height={300}
          data={data3}
          layout="vertical" barCategoryGap={45}
          margin={{
          top: 15,
          right: 30,
          left: 0,
          bottom: 45,
        }}
      >
                <CartesianGrid strokeDasharray="6 6" />
                <XAxis type="number" hide />
                <YAxis type="category" width={150} padding={{ left: 20 }} dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Anomalías" fill="#ff7304" stackId="stack" />
                <Bar dataKey="Datos_Regulares" fill="#ffba26" stackId="stack" />
            </BarChart>
        </ResponsiveContainer>
        </div>
        

	);
}

export default Chart5;