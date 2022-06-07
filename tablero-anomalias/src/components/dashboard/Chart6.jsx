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

const [grisNormal, naranjaAnomalia] = ['#485458', '#FF9900'];

function Chart6() {
  const data01 = [
    { tipo: "Regulares", x: 100, y: 200, z: 200 },
    { tipo: "Regulares", x: 120, y: 100, z: 260 },
    { tipo: "Regulares", x: 170, y: 300, z: 400 },
    { tipo: "Regulares", x: 140, y: 250, z: 280 },
    { tipo: "Regulares", x: 150, y: 400, z: 500 },
    { tipo: "Regulares", x: 110, y: 280, z: 200 },
  ];
  const data02 = [
    { tipo: "Anomalías", x: 200, y: 260, z: 240 },
    { tipo: "Anomalías", x: 240, y: 290, z: 220 },
    { tipo: "Anomalías", x: 190, y: 290, z: 250 },
    { tipo: "Anomalías", x: 198, y: 250, z: 210 },
    { tipo: "Anomalías", x: 180, y: 280, z: 260 },
    { tipo: "Anomalías", x: 210, y: 220, z: 230 },
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

  const filterList = filters.map(filters => <option key={`filtros6-${filters.id}`} value={filters.id}>
    {filters.name}</option>)
	return (

    <div className="chart c6">
      <div className="chart_title">
        Frecuencia de anomalías
        </div>
          <div className="horizontalFilters">
            <select className="form-select" aria-label="Default select example" defaultValue={"Filtrar por"}>
              {filterList}
            </select>
            <select className="form-select" aria-label="Default select example" defaultValue={"Filtrar por"}>
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
      <XAxis type = "number" dataKey = "x" name = "stature" unit = "" />
      <YAxis type = "number" dataKey = "y" name = "weight" unit = "" />
      <ZAxis type = "number" dataKey = "z" range = {[60, 400]} name = "score" unit = "km" />
      <Tooltip cursor = {{ strokeDasharray: '3 3' }} />
      <Legend />
      <Scatter dataKey = "tipo" name = "Anomalia_1" data = {data01} fill = {grisNormal} shape = "circle" />
      <Scatter dataKey = "tipo" name = "Anomalia_2" data = {data02} fill = {naranjaAnomalia} shape = "circle" />
      
    </ScatterChart>
  </ResponsiveContainer>
    </div>
    
	);
}

export default Chart6;