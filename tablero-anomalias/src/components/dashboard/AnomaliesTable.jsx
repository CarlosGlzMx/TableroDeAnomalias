import { React, useState } from "react";
import ListedAnomaly from "./ListedAnomaly";


function AnomaliesTable() {
    // Variable filtrada que enlista las anomalías
    const [anomalyList, setAnomalyList] = useState([
      {
        id: 1,
        name: "Anomalia 1",
        details: "Detalles de Anomalia 1"
      },
      {
        id: 2,
        name: "Anomalia 2",
        details: "Detalles de Anomalia 2"
      },
      {

        id: 3,
        name: "Anomalia 3",
        details: "Detalles de Anomalia 3"
      },
      {

        id: 4,
        name: "Anomalia 4",
        details: "Detalles de Anomalia 4"
      },
      {

        id: 5,
        name: "Anomalia 5",
        details: "Detalles de Anomalia 5"
      },
      {

        id: 6,
        name: "Anomalia 6",
        details: "Detalles de Anomalia 6"
      },
      {

        id: 7,
        name: "Anomalia 7",
        details: "Detalles de Anomalia 7"
      },
      {

        id: 8,
        name: "Anomalia 8",
        details: "Detalles de Anomalia 8"
      },

      {

        id: 9,
        name: "Anomalia 9",
        details: "Detalles de Anomalia 9"
      },
      {

        id: 10,
        name: "Anomalia 10",
        details: "Detalles de Anomalia 10"
      },
      {

        id: 11,
        name: "Anomalia 11",
        details: "Detalles de Anomalia 11"
      },
      {

        id: 12,
        name: "Anomalia 12",
        details: "Detalles de Anomalia 12"
      },
    ])

	return (
    <div className="p-0">
      <h4>Tabla de anomalías encontradas</h4>
      <div className = "anomaliesTable m-3 p-2" style={{border:"0.3rem dashed #485458", borderRadius: "0.8rem"}}>
        {
          anomalyList.map((row, index) => {
            return <ListedAnomaly key={`listed-anomaly-${index}`} anomaly = {row} index = {index}/>
          })
        }
      </div>    
    </div>
	);
}

export default AnomaliesTable;