import { React, useContext, useEffect } from "react";
import Chart1 from "./charts/Chart1";
import Chart2 from "./charts/Chart2";
import Chart3 from "./charts/Chart3";
import Chart4 from "./charts/Chart4";
import Chart5 from "./charts/Chart5";
import Chart6 from "./charts/Chart6";
import Actions from "../components/Actions";
import AnomaliesTable from "../components/AnomaliesTable";
import { DataContext } from "../App";

const Dashboard = () => {
	// Data variable contains ids from the database and the proccessed data from the file
	const { anomalyData, setAnomalyData, user } = useContext(DataContext);

	useEffect(() => {
		//console.log(anomalyData["datos"]["scores"])
		console.log(anomalyData["datos"])
	}, [anomalyData]);

	return (
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

			<div class="action-bar">
				{ <Actions /> }
			</div>

		</div>

	);
}

export default Dashboard;