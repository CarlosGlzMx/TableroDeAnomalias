import {React} from "react";
import { useLocation } from "react-router-dom";
import {
    Tooltip,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
    LineChart,
    Line,
  } from "recharts";


function Chart2() {

  const location = useLocation();
	// Data variable contains ids from the database and the proccessed data from the file
	const processedData = location.state?.processedData;



    const data2 = [
        {
          name: 'Fecha A',
          Anomalías: 4000,
          Datos_Regulares: 2400,
        },
        {
          name: 'Fecha B',
          Anomalías: 3000,
          Datos_Regulares: 1398,
        },
        {
          name: 'Fecha C',
          Anomalías: 2000,
          Datos_Regulares: 9800,
        },
        {
          name: 'Fecha D',
          Anomalías: 2780,
          Datos_Regulares: 3908,
        },
        {
          name: 'Fecha E',
          Anomalías: 1890,
          Datos_Regulares: 4800,
        },
        {
          name: 'Fecha F',
          Anomalías: 2390,
          Datos_Regulares: 3800,
        },
        {
          name: 'Fecha G',
          Anomalías: 3490,
          Datos_Regulares: 4300,
        },
      ];
	return (
		<ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={data2}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Datos_Regulares" stroke="#ff7304" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Anomalías" stroke="#ffba26" />
      </LineChart>
    </ResponsiveContainer>
	);
}

export default Chart2;