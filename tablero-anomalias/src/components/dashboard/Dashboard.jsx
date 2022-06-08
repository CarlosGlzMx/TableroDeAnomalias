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

function Dashboard() {

	// Variable que contiene los datos JSON para la generación de gráficas
	const [anomalyData, setAnomalyData] = useState(undefined);
	// Variable que contiene los filtros seleccionados para las gráficas
	const [config, setConfig] = useState(undefined);

	useEffect(() => {
		if (anomalyData === undefined || config === undefined) {
			setAnomalyData(dateParser(JSON.parse(sessionStorage.getItem("anomalyData"))));
			setConfig(JSON.parse(sessionStorage.getItem("config")));
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