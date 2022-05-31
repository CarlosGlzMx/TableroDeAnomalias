import { React } from "react";
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
  // Data variable contains ids from the database and the proccessed data from the file
  const data2 = [
    {
      name: "Fecha A",
      Observaciones: 4000,
      Datos_Regulares: 2400,
    },
    {
      name: "Fecha B",
      Observaciones: 3000,
      Datos_Regulares: 1398,
    },
    {
      name: "Fecha C",
      Observaciones: 2000,
      Datos_Regulares: 9800,
    },
    {
      name: "Fecha D",
      Observaciones: 2780,
      Datos_Regulares: 3908,
    },
    {
      name: "Fecha E",
      Observaciones: 1890,
      Datos_Regulares: 4800,
    },
    {
      name: "Fecha F",
      Observaciones: 2390,
      Datos_Regulares: 3800,
    },
    {
      name: "Fecha G",
      Observaciones: 3490,
      Datos_Regulares: 4300,
    },
  ];

  // #2 Llamar el contexto
  // const { anomalyData } = useContext(DataContext);

  // // #3 Observar cambios en el contexto (datos)
  // useEffect(() => {
  //   // #4 Proceso de cada gráfica
  //   const UMBRAL_ANOMALIA = 0;
  //   let [A0_7, A0_8, A0_9, A1_0] = [0, 0, 0, 0];
  //   for (const [key, value] of Object.entries(anomalyData["datos"]["scores"])) {
  //     var val = Math.round((value + Number.EPSILON) * 10) / 10;

  //     if (val == -1) {
  //       A_1_0 += 1;
  //     } else if (val == -0.9) {
  //       A_0_9 += 1;
  //     }
  //   }

  //   // #5 Recargar la gráfica con los datos obtenidos
  //   setData([
  //     {
  //       name: "-1",
  //       number: A_1_0,
  //     },
  //     {
  //       name: "-0.9",
  //       number: A_0_9,
  //     },
  //   ]);
  // }, [anomalyData]);

  return (
    <div className="chart c2">
      <div className="chart_title">Anomalías por fecha</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300} data={data2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Datos_Regulares"
            stroke="#ff7304"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="Observaciones" stroke="#ffba26" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart2;
