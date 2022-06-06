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

export const DataContext = createContext([[], () => { }]);

function Dashboard() {
	// const { ids, setIds } = useContext(IdsContext);
	// Variable que contiene los datos JSON para la generación de gráficas
	const [anomalyData, setAnomalyData] = useState();

	useEffect(() => {
		if (anomalyData === undefined) {
			setAnomalyData(JSON.parse(localStorage.getItem("anomalyData")));
			/* RECORTAME
			 function (datos) => {
				for (var i = 0; i < Object.keys(datos.fecha).length; i++) {
					datos.fecha[i] = Date(datos.fecha[i]);
				}
			}
			RECORTAME */
		}
	}, [anomalyData, setAnomalyData]);

	return (
		<>
			{ (anomalyData === undefined) ?
				<div className="SelectColumn" style={ { minHeight: "82vh" } }>
					<div style={ { height: "20vh", padding: "5vh 0", textAlign: "center" } }>
						<h2>Cargando...</h2>
					</div>
					<Loading />
				</div>
				:
				<DataContext.Provider value={ { anomalyData } }>
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
				</DataContext.Provider>
			}
		</>
	);
}

export default Dashboard;