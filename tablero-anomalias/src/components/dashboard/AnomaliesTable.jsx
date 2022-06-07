import { React, useEffect, useState, useContext } from "react";
import ListedAnomaly from "./ListedAnomaly";
import { DataContext, ConfigContext } from "./Dashboard";
import { dateInRange } from "./auxMethods";

function AnomaliesTable() {
	// Contextos necesarios para las tabla de anomalías dinámica
	const { config } = useContext(ConfigContext);
	const { anomalyData } = useContext(DataContext);

	// Variable filtrada que enlista las anomalías
	const [anomalyList, setAnomalyList] = useState([]);

	useEffect(() => {
		const detailHeaders = Object.keys(anomalyData);
		let temporalAnomalyList = [];

		for (var i = 0; i < Object.keys(anomalyData.scores).length; i++) {
			if (dateInRange(anomalyData["fecha"][i], config["fecha_inicio"], config["fecha_fin"])) {
				if (anomalyData["scores"][i] <= config["umbral_anomalia"]) {
					let anomalyToList = {};
					for (const detail of detailHeaders) {
						anomalyToList[detail === "scores" ? "Puntaje de anomalía" : detail] = anomalyData[detail][i];
					}
					temporalAnomalyList.push(anomalyToList);
				}
			}
		}
		setAnomalyList(temporalAnomalyList);
	}, [config, anomalyData]);

	return (
		<div className="p-0">
			<h4>Tabla de anomalías encontradas</h4>
			<div id="anomalies-scrollable-card" className="w-75 card-light anomaliesTable my-4 p-4 mx-auto pb-0" style={ { border: "0.3rem", borderStyle: "dashed", borderRadius: "0.8rem" } }>
				{
					anomalyList.map((row, index) => {
						return <ListedAnomaly key={ `listed-anomaly-${index}` } anomaly={ row } index={ index } />
					})
				}
			</div>
		</div>
	);
}

export default AnomaliesTable;