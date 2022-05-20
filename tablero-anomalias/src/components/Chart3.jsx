import {React, useState} from "react";
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { BarChart, Bar, Cell,ResponsiveContainer } from "recharts";


  
function Chart3() {
    const [data, setData] = useState([{ Datos: "Anomalías", users: 1254 },
      { Datos: "Datos regulares", users: 12536 }])

      const data6 = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
      const colors = scaleOrdinal(schemeCategory10).range();
	return (
      <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={data6}>
        <Bar dataKey="uv" fill="#ffba26" />
      </BarChart>
      </ResponsiveContainer>
		
	);
}

export default Chart3;
