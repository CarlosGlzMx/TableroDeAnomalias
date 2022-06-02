import { React, useContext, useEffect, useState } from "react";
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
import { DataContext } from "../../App";
import AnomaliesTable from "../AnomaliesTable";

function Chart2() {
  // Data variable contains ids from the database and the proccessed data from the file
  // const data2 = [
  //   {
  //     name: "Fecha A",
  //     Observaciones: 4000,
  //     Datos_Regulares: 2400,
  //   },
  //   {
  //     name: "Fecha B",
  //     Observaciones: 3000,
  //     Datos_Regulares: 1398,
  //   },
  //   {
  //     name: "Fecha C",
  //     Observaciones: 2000,
  //     Datos_Regulares: 9800,
  //   },
  //   {
  //     name: "Fecha D",
  //     Observaciones: 2780,
  //     Datos_Regulares: 3908,
  //   },
  //   {
  //     name: "Fecha E",
  //     Observaciones: 1890,
  //     Datos_Regulares: 4800,
  //   },
  //   {
  //     name: "Fecha F",
  //     Observaciones: 2390,
  //     Datos_Regulares: 3800,
  //   },
  //   {
  //     name: "Fecha G",
  //     Observaciones: 3490,
  //     Datos_Regulares: 4300,
  //   },
  // ];

  const [data2, setData] = useState([{
    fecha : "12-12-2020",
    anomalia : 98,
    normal : 10
	},
	{
    fecha : "14-12-2020",
    anomalia : 5,
    normal : 8
	},
  {
    fecha : "18-12-2020",
    anomalia : 5,
    normal : 15
	},
  {
    fecha : "12-10-2021",
    anomalia : 5,
    normal : 4
	}])

  // #2 Llamar el contexto
  const { anomalyData } = useContext(DataContext);

  // #3 Observar cambios en el contexto (datos)
  useEffect(() => {
    // #4 Proceso de cada gráfica
    const UMBRAL_ANOMALIA = 0;
    var item;
    var obj = new Object();
    var obj2 = new Object();
    const AnomaliasFecha = [];
	
    for (var i = 0; i < Object.keys(anomalyData.scores).length; i++) {
      
			if (anomalyData.scores[i] >= UMBRAL_ANOMALIA) {
        
				item = anomalyData.FECHA[i];
        
        obj.valor = "Anomalia";
        obj.fecha  = item;
        
        AnomaliasFecha.push(obj);
			}
			else {
        
				item = anomalyData.FECHA[i];
        
        obj2.valor = "Normal";
        obj2.fecha  = item;

        AnomaliasFecha.push(obj2);
			}
		}
    var arrayFechas = []
    var obj3 = new Object();
    for (var i = 0; i < Object.keys(AnomaliasFecha).length; i++) {
      if (arrayFechas.includes(AnomaliasFecha[i].fecha)) {
        

      }
      else 
      {
        obj3.FECHA = AnomaliasFecha[i].fecha;
          if (AnomaliasFecha[i].valor = "Anomalia"){
            obj3.ANOMALIA = 1;
            obj3.NORMAL = 1;
          }
          else {
            obj3.ANOMALIA = 0;
            obj3.NORMAL = 1;
          }
        arrayFechas.push(obj3)

      }

    }

    
    // var count = Object.keys(anomalyData.scores).length;
    // console.log(anomalyData.scores[1]);
    console.log(AnomaliasFecha);

		// #5 Recargar la gráfica con los datos obtenidos
		//setData(AnomaliasFecha)
	}, [anomalyData]);


  return (
    <div className="chart c2">
      <div className="chart_title">Anomalías por fecha</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300} data={data2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="anomalia"
            stroke="#ff7304"
            activeDot={{ r: 8 }}
          />
          <Line 
            type="monotone" 
            dataKey="normal" 
            stroke="#ffba26" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart2;
