
import {React, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
// #1 Importar el contexto
import { DataContext } from "../../App";
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell,
    Tooltip,
    Legend,
    Sector
  } from "recharts";

function Chart1() {
    // #2 Llamar el contexto
    const { anomalyData, setAnomalyData } = useContext(DataContext);

    // #3 Observar cambios en el contexto (datos)
    useEffect(() => {
      // #4 Proceso de cada gráfica
      const UMBRAL_ANOMALIA = 0;
      let [normales, anomalias] = [0, 0];
      for (const [key, value] of Object.entries(anomalyData["datos"]["scores"])) {
        if (value >= UMBRAL_ANOMALIA) {
          anomalias += 1;
        }
        else {
          normales += 1;
        }
      }

      // #5 Recargar la gráfica con los datos obtenidos
      
    }, [anomalyData]);
  

  const location = useLocation();
	// Data variable contains ids from the database and the proccessed data from the file
	const processedData = location.state?.processedData;


    const [data, setData] = useState([{ Datos: "Anomalías", users: 1254 },
      { Datos: "Datos regulares", users: 12536 }])
    const COLORS = ['#fe9000', '#ffba26'];

    const RADIAN = Math.PI / 180;
      const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      const title = "Grafica 5";

      

      return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
  );
  
};


	return (
    <div class="chart c2">
        <div class="chart_title">
          Cantidad de anomalías
          </div>
      <ResponsiveContainer width="100%" height="100%">
                      <PieChart dataKey="c1data">
                          <Pie
                          data={data}
                          innerRadius={80}
                          outerRadius={120}
                          labelLine={false}
                          label={renderCustomizedLabel}
                          fill= "#fe9000"
                          paddingAngle={5}
                          dataKey="users"
                          wrapperStyle={{ position: 'relative' }}
                          
                          >
                          <Tooltip />
                          <Legend />
                          {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                        <Tooltip  />
                      </PieChart>
                      </ResponsiveContainer>
                      </div>
	);
}

export default Chart1;