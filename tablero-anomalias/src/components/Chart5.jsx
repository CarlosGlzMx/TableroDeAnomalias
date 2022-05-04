import {React} from "react";
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
import "../App.css";
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
      
	return (
        <ResponsiveContainer>
            <BarChart 
                width={500}
                height={300}
                data={data3}
                layout="vertical" barCategoryGap={30}
                margin={{
                top: 15,
                right: 30,
                left: 20,
                bottom: 15,
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

	);
}

export default Chart5;