import {React} from "react";
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


function Chart6() {
  const data01 = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];
  const data02 = [
    { x: 200, y: 260, z: 240 },
    { x: 240, y: 290, z: 220 },
    { x: 190, y: 290, z: 250 },
    { x: 198, y: 250, z: 210 },
    { x: 180, y: 280, z: 260 },
    { x: 210, y: 220, z: 230 },
  ];


  const filters = [
    {
      id: 1,
      name: "filtro 1",
      details: "Detalles de Anomalia 1"
    },
    {
      id: 2,
      name: "filtro 2",
      details: "Detalles de Anomalia 2"
    },
    {

      id: 3,
      name: "filtro 35",
      details: "Detalles de Anomalia 35"
    },
    {

      id: 46,
      name: "filtro 4",
      details: "Detalles de Anomalia 4"
    },
  ]

  const filterList = filters.map(filters => <option value={filters.id}>
    {filters.name}</option>)
	return (

    <div class="chart c6">
      <div class="chart_title">
        Frecuencia de anomalías
        </div>
          <div class="horizontalFilters">
            <select class="form-select" aria-label="Default select example">
            <option selected>Filtrar por</option>
              {filterList}
            </select>
            <select class="form-select" aria-label="Default select example">
            <option selected>Filtrar por</option>
              {filterList}
            </select>
          </div>
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
      <XAxis type="number" dataKey="x" name="stature" unit="" />
      <YAxis type="number" dataKey="y" name="weight" unit="" />
      <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="km" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend />
      <Scatter name="Anomalia_1" data={data01} fill="#fe9000" shape="circle" />
      <Scatter name="Anomalia_2" data={data02} fill="#ffba26" shape="circle" />
    </ScatterChart>
  </ResponsiveContainer>
    </div>
    
	);
}

export default Chart6;