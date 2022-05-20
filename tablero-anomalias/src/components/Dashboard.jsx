import { React, useState } from "react";
import Chart1 from "../components/Chart1";
import Chart2 from "../components/Chart2";
import Chart3 from "../components/Chart3";
import Chart4 from "../components/Chart4";
import Chart5 from "../components/Chart5";
import Chart6 from "../components/Chart6";
import Actions from "../components/Actions";
import AnomaliesTable from "../components/AnomaliesTable";

const Dashboard = (user) => {

  return (
    <div className="Dashboard">
      <div className="container p-0" style={{ minHeight: "80vh" }}>

        <div class="c1">
          {<Chart1 />}
        </div>

        <div class="c2">
          {<Chart2 />}
        </div>

        <div class="c3">
          {<Chart3 />}
        </div>

        {<Chart4 />}

        {<Chart5 />}
      
        {<Chart6 />}
        
      </div>
      <div>
        {<AnomaliesTable />}
      </div>

      <div class="action-bar">
        {<Actions />}
      </div>

    </div>
  );
}

export default Dashboard;