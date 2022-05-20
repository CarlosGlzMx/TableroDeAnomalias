import { React } from "react";
import { Dropdown } from "react-bootstrap";
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
        <div className="chartTitle" style={{ width: '100%', textAlign: 'center'}}>
          Precisión del Modelo
          </div>
          {<Chart1 />}
        </div>

        <div class="c2">
        <div style={{ width: '100%', textAlign: 'center'}}>
        Chart 2
          </div>
  <div style={{ flex: 1, width: '100%', overflow: 'hidden' }}></div>
          {<Chart2 />}
        </div>

        <div class="c3">
        <div style={{ width: '100%', textAlign: 'center'}}>
          Chart 3
          </div>
          {<Chart3 />}
        </div>

        <div class="c4">
        <div style={{ width: '100%', textAlign: 'center'}}>
          Chart 4
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Filtrar
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {<Chart4 />}
        </div>

        <div class="c5">
        <div style={{ width: '100%', textAlign: 'center'}}>
          Chart 5
          </div>
          <div class="horizontalFilters">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic4-1">
                Filtrar1
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic4-2">
                Filtrar2
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {<Chart5 />}
        </div>

        <div class="c6">
        <div style={{ width: '100%', textAlign: 'center'}}>
          Chart 6
          </div>
          <div class="horizontalFilters">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic6-1">
                Filtrar1
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic6-2">
                Filtrar2
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {<Chart6 />}
        </div>


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