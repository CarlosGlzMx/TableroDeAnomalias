import React from "react";
import { Chart } from "react-google-charts";

<Chart
  chartType="ScatterChart"
  data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
  width="100%"
  height="400px"
  legendToggle
/>

function Dashboard() {

    return (
        
        <div className="Dashboard">
            <main class="container">
                <div class="c1">
                    <img src="https://cdn.pixabay.com/photo/2021/11/22/22/53/dot-6817557__480.png"/> 
                </div>
                <div class="c2">
                    <img src="https://cdn.pixabay.com/photo/2021/12/13/23/19/filter-6869299__480.png"/>
                </div>
                <div class="c3">
                    <img src="https://cdn.pixabay.com/photo/2021/11/01/05/21/chart-6759438__480.png"/>
                </div>
                <div class="c4">
                    <img src="https://cdn.pixabay.com/photo/2021/10/18/22/48/doughnut-6722291__480.png"/>
                </div>
                <div class="c5">
                    <img src="https://cdn.pixabay.com/photo/2021/10/18/22/48/chart-6722289__480.png"/>
                </div>
                <div class="c6">
                    <img src="https://cdn.pixabay.com/photo/2021/11/09/00/15/trend-6780399__480.png"/>
                </div>


            </main>
        </div>
    );
}

export default Dashboard;