import { React } from "react";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";
import Chart4 from "./Chart4";
import Chart5 from "./Chart5";
import Chart6 from "./Chart6";
import Actions from "../actions/Actions";
import AnomaliesTable from "./AnomaliesTable";

const Dashboard = () => {
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

			<div className="action-bar">
				{ <Actions /> }
			</div>

		</div>
	);
}

export default Dashboard;