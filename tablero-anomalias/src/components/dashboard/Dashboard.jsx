import { React, createContext, useState, useEffect } from "react";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";
import Chart4 from "./Chart4";
import Chart5 from "./Chart5";
import Chart6 from "./Chart6";
import Actions from "../actions/Actions";
import AnomaliesTable from "./AnomaliesTable";
import Loading from "../uploading/Loading";
import { dateParser } from "./auxMethods";

export const DataContext = createContext([[], () => { }]);
export const ConfigContext = createContext([[], () => { }]);

// Variables por defecto para los contextos
const defaultConfig = {
	fecha_min: "2021-05-10",
	fecha_max: "2021-11-30",
	fecha_inicio: "2021-05-15",
	fecha_fin: "2021-11-01",
	seleccion_g4: undefined,
	seleccion_g5_1: undefined,
	seleccion_g5_2: undefined,
	seleccion_g6_1: undefined,
	seleccion_g6_2: undefined,
	umbral_anomalia: 0,
	min_score: -0.25,
	max_score: 0.15,
};

function Dashboard() {

	// Variable que contiene los datos JSON para la generación de gráficas
	const [anomalyData, setAnomalyData] = useState(undefined);
	// Variable que contiene los filtros seleccionados para las gráficas
	const [config, setConfig] = useState(undefined);

	useEffect(() => {
		if (anomalyData === undefined) {
			setAnomalyData(dateParser(JSON.parse(sessionStorage.getItem("anomalyData"))));
		}

		if (config === undefined && sessionStorage.getItem("config")) {
			setConfig(JSON.parse(sessionStorage.getItem("config")));
		} else if (config === undefined && !sessionStorage.getItem("config")) {
			setConfig(defaultConfig);
			sessionStorage.setItem("config", JSON.stringify(defaultConfig));
		}
	}, [anomalyData, setAnomalyData, config]);

	return (
		<>
			{ (anomalyData === undefined) ?
				<div className="SelectColumn" style={ { minHeight: "82vh" } }>
					<div className="text-center" style={ { height: "20vh", paddingX: "5vh" } }>
						<h2>Cargando...</h2>
					</div>
					<Loading />
				</div>
				:
				<DataContext.Provider value={ { anomalyData } }>
					<ConfigContext.Provider value={ { config, setConfig } }>
						<div className="Dashboard">
							<div className="container p-0" style={ { minHeight: "80vh" } }>

								{ <Chart1 /> }

								{ <Chart2 /> }

								{ <Chart3 /> }

								{ <Chart4 /> }

								{ <Chart5 /> }

								{ <Chart6 /> }

							</div>

							<div style={ { paddingBottom: "12vh" } }>
								{ <AnomaliesTable /> }
							</div>

							<div className="action-bar">
								{ <Actions /> }
							</div>

						</div>
					</ConfigContext.Provider>
				</DataContext.Provider>
			}
		</>
	);
}

export default Dashboard;