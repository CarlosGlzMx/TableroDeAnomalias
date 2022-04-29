import React,{useState, useEffect, PureComponent} from "react";
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

import {
    PieChart,
    ScatterChart,
    Scatter,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
    ResponsiveContainer,
    ReferenceLine,
    Cell,
    Sector
  } from "recharts";
  import axios from 'axios';


const Dashboard = () => {


  






      const [data, setData] = useState([{ Datos: "Anomalías", users: 1254 },
      { Datos: "Datos regulares", users: 12536 }])

      const datagdydgajdgad = [
        {
          anomalias: 500,
          datos_regulares: 2453
        }

      ]

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


      const data6 = [
        { x: 100, y: 200, z: 200 },
        { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 },
        { x: 140, y: 250, z: 280 },
        { x: 150, y: 400, z: 500 },
        { x: 110, y: 280, z: 200 },
      ];
      


      const data1 = [
        { name: 'Anomalías', value: 27 },
        { name: 'Datos regulares', value: 823 },
      ];
      const COLORS = ['#fe9000', '#ffba26'];

      const colors = scaleOrdinal(schemeCategory10).range();
      
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

      useEffect(() => {


      }, [])
      /*Vincular la peticion al back end*/
      const getData = async ()=>{
          console.log("Getting data")
          const respuesta = await axios.get('direccion back end')
      }
      

    return (
        
        <div className="Dashboard">
          <main class="container">
            <div class="c1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                    data={data1}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                </div>

                <div class="c2">
                    <PieChart dataKey="hehyeyed" width={400} height={400}>
                        <Pie
                        data={data}
                        innerRadius={65}
                        outerRadius={120}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        fill= "#fe9000"
                        paddingAngle={12}
                        dataKey="users"
                        >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                      </Pie>
                    </PieChart>
                </div>

                <div class="c3">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={500}
                    height={300}
                    data={data3}
                    stackOffset="sign"
                    margin={{
                    top: 15,
                    right: 30,
                    left: 20,
                    bottom: 15,
                    }}
                    >
                      <CartesianGrid strokeDasharray="6 6" />
                      <XAxis dataKey="name" tick={{ fill: 'white' }} tickLine={{ stroke: 'white' }} />
                      <YAxis tick={{ fill: 'white' }} tickLine={{ stroke: 'white' }}/>
                      <Tooltip />
                      <Legend />
                      <ReferenceLine y={0} stroke="#000000" />
                      <Bar dataKey="Anomalías" fill="#ff7304" stackId="stack" />
                      <Bar dataKey="Datos_Regulares" fill="#ffba26" stackId="stack" />
                      </BarChart>
                    </ResponsiveContainer>
                </div>

                <div class="c4">
                  <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                  width={500}
                  height={300}
                  data={data3}
                  stackOffset="sign"
                  margin={{
                    top: 15,
                    right: 30,
                    left: 20,
                    bottom: 15,
                  }}
                  >
                  <CartesianGrid strokeDasharray="6 6" />
                  <XAxis dataKey="name" tick={{ fill: 'white' }} tickLine={{ stroke: 'white' }}/>
                  <YAxis tick={{ fill: 'white' }} tickLine={{ stroke: 'white' }} />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine y={0} stroke="#000000" />
                  <Bar dataKey="Anomalías" fill="#ff7304" stackId="stack" />
                  <Bar dataKey="Datos_Regulares" fill="#ffba26" stackId="stack" />
                  </BarChart>
                </ResponsiveContainer>
                </div>

                <div class="c5">
                
                <table>
  <tr>
    <th>Anomalía</th>
    <th>Fecha</th>
    <th>Hora</th>
  </tr>
  <tr>
    <td>Anomalia 1</td>
    <td>15/01/2021</td>
    <td>01:23</td>
  </tr>
  <tr>
    <td>Anomalia 2</td>
    <td>15/02/2021</td>
    <td> </td>
  </tr>
  <tr>
    <td>Anomalia 3</td>
    <td>15/03/2021</td>
    <td></td>
  </tr>
  <tr>
    <td>Anomalia 4</td>
    <td>15/04/2021</td>
    <td>01:23</td>
  </tr>
  <tr>
    <td>Anomalia 5</td>
    <td>15/05/2021</td>
    <td>01:23</td>
  </tr>
  <tr>
    <td>Anomalia 4</td>
    <td>15/04/2021</td>
    <td>01:23</td>
  </tr>
  <tr>
    <td>Anomalia 5</td>
    <td>15/05/2021</td>
    <td>01:23</td>
  </tr>
  <tr>
    <td>Anomalia 4</td>
    <td>15/04/2021</td>
    <td>01:23</td>
  </tr>
  <tr>
    <td>Anomalia 5</td>
    <td>15/05/2021</td>
    <td>01:23</td>
  </tr>
  <tr>
    <td>Anomalia 4</td>
    <td>15/04/2021</td>
    <td>01:23</td>
  </tr>
  <tr>
    <td>Anomalia 5</td>
    <td>15/05/2021</td>
    <td>01:23</td>
  </tr>
  <tr>
    <td>Anomalia 4</td>
    <td>15/04/2021</td>
    <td>01:2djsbckjssfj3</td>
  </tr>
  <tr>
    <td>Anomalia 5</td>
    <td>15/05/2021</td>
    <td>01:23</td>
  </tr>
  <tr>
    <td>Anomalia 4</td>
    <td>15/04/2021</td>
    <td>01:2djsbckjssfj3</td>
  </tr>
  <tr>
    <td>Anomalia 5</td>
    <td>15/05/2021</td>
    <td>01:23</td>
  </tr>
  <tr>
    <td>Anomalia 4</td>
    <td>15/04/2021</td>
    <td>01:2djsbckjssfj3</td>
  </tr>
  <tr>
    <td>Anomalia 5</td>
    <td>15/05/2021</td>
    <td>01:23</td>
  </tr>
  <tr>
    <td>Anomalia 4</td>
    <td>15/04/2021</td>
    <td>01:2djsbckjssfj3</td>
  </tr>
  
  
  

</table>

                </div>


                <div class="c6">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      width={400}
                      height={400}
                      margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                      }}
                    >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="money" unit="$" tick={{ fill: 'white' }} tickLine={{ stroke: 'white' }}/>
                    <YAxis type="number" dataKey="y" name="weight" unit="kg" tick={{ fill: 'white' }} tickLine={{ stroke: 'white' }}/>
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="A school" data={data6} fill="#000000">
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                  
                </div>
          </main>
        </div>
    );
}

export default Dashboard;