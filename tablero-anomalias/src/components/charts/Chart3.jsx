import {React, useState} from "react";
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




  
function Chart3() {
    const [data, setData] = useState([{ Datos: "Anomalías", users: 1254 },
      { Datos: "Datos regulares", users: 12536 }])

      const data6 = [
        {
          name: 'Page A',
          Anomalías: 180,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          Anomalías: 250,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          Anomalías: 300,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          Anomalías: 300,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          Anomalías: 250,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          Anomalías: 200,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          Anomalías: 180,
          pv: 4300,
          amt: 2100,
        },
      ];
      const colors = scaleOrdinal(schemeCategory10).range();
	return (

    <div class="chart c3">
      <div class="chart_title">
        Comportamiento de los datos
        </div>
      
        <ResponsiveContainer width="100%" height="100%">
        <BarChart 
        width={150} 
        height={40} 
        data={data6}
        margin={{
          top: 15,
          right: 10,
          left: 20,
          bottom: 32,
        }}
        >
          <XAxis />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Anomalías" fill="#ffba26" />
        </BarChart>
        </ResponsiveContainer>
        </div>
		
	);
}

export default Chart3;
