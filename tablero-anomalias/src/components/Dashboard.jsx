import { React } from "react";
import { useLocation } from "react-router-dom";
import Chart1 from "../components/Chart1";
import Chart2 from "../components/Chart2";
import Chart3 from "../components/Chart3";
import Chart4 from "../components/Chart4";
import Chart5 from "../components/Chart5";
import Chart6 from "../components/Chart6";
import Actions from "../components/Actions";
import AnomaliesTable from "../components/AnomaliesTable";


const Dashboard = (user) => {

	const location = useLocation();
	// Data variable contains ids from the database and the proccessed data from the file
	const processedData = location.state?.processedData;



	return (
		<div className="Dashboard">
			<div className="container p-0" style={ { minHeight: "80vh" } }>
				<div class="c1">
					<div className="chartTitle" style={ { width: '100%', textAlign: 'center' } }>
						Precisión del Modelo
					</div>
					{ <Chart1 /> }
				</div>

				<div class="c2">
					<div style={ { width: '100%', textAlign: 'center' } }>
						Chart 2
					</div>
					<div style={ { flex: 1, width: '100%', overflow: 'hidden' } }></div>
					{ <Chart2 /> }
				</div>

				<div class="c3">
					<div style={ { width: '100%', textAlign: 'center' } }>
						Chart 3
					</div>
					{ <Chart3 /> }
				</div>

				{ <Chart4 /> }

				{ <Chart5 /> }

				{ <Chart6 /> }

			</div>
			<div>
				{ <AnomaliesTable /> }
			</div>

			<div class="action-bar">
				{ <Actions /> }
			</div>

		</div>
	);
}

export default Dashboard;