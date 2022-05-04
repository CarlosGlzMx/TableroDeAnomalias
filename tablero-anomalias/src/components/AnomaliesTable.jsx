import {React,useState} from "react";

import {ListGroup, Modal, Button } from "react-bootstrap";

function AnomaliesTable() {
    /*Constantes de popup show y close */
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /*Dataframe */
    const anomalies = [
      {
        id: 1,
        name: "Anomalia 1",
        details: "Detalles de Anomalia 1"
      },
      {
        id: 2,
        name: "Anomalia 2",
        details: "Detalles de Anomalia 2"
      },
      {

        id: 3,
        name: "Anomalia 3",
        details: "Detalles de Anomalia 3"
      },
      {

        id: 4,
        name: "Anomalia 4",
        details: "Detalles de Anomalia 4"
      },
      {

        id: 5,
        name: "Anomalia 5",
        details: "Detalles de Anomalia 5"
      },
      {

        id: 6,
        name: "Anomalia 6",
        details: "Detalles de Anomalia 6"
      },
      {

        id: 7,
        name: "Anomalia 7",
        details: "Detalles de Anomalia 7"
      },
      {

        id: 8,
        name: "Anomalia 8",
        details: "Detalles de Anomalia 8"
      },
      {

        id: 10,
        name: "Anomalia 10",
        details: "Detalles de Anomalia 10"
      },
      {

        id: 11,
        name: "Anomalia 11",
        details: "Detalles de Anomalia 11"
      },
      {

        id: 12,
        name: "Anomalia 12",
        details: "Detalles de Anomalia 12"
      },
    ]
    const anomaliesList = anomalies.map(anomalies => <ListGroup.Item variant="primary" onClick={handleShow}>
    {anomalies.name}</ListGroup.Item>)
	return (
    <div>
      <h4>Tabla de anomalías encontradas</h4>
      <div class="anomaliesTable">
        <ListGroup defaultActiveKey="#link1">
          {anomaliesList}
        </ListGroup>
      </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{anomaliesList[1]}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Detalles de anomalía</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      
    </div>
	);
}

export default AnomaliesTable;