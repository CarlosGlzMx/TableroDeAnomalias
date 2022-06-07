import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";

const [lowColor, midColor, highColor] = ["#006600", "#FF9900", "#FF3300"]

function ListedAnomaly(props) {
	// Variable para poder abrir y cerrar los modales
	const [viewModal, setViewModal] = useState(false);

	const detailsArray = Object.keys(props.anomaly).map((value, index) => {
		if (value !== "fecha") {
			return <li key={ value }><b>{ value }</b> : { props.anomaly[value] }</li>
		}
		return null;
	})

	return (
		<div className="ListedAnomaly m-0 p-2 row-separator d-flex justify-content-between">
			<div>Anomalía { props.index + 1 } - { props.anomaly["Fecha"] }</div>
			{
				props.anomaly["Puntaje de anomalía"] > -0.1 ?
					<span style={ { fontWeight: "bold", color: lowColor } }>Anomalía baja</span> :
					props.anomaly["Puntaje de anomalía"] > -0.3 ?
						<span style={ { fontWeight: "bold", color: midColor } }>Anomalía media</span> :
						<span style={ { fontWeight: "bold", color: highColor } }>Anomalía crítica</span>
			}
			<Button className="primary-button" onClick={ () => { if (!viewModal) setViewModal(true) } }>Ver detalle</Button>
			<Modal show={ viewModal } onHide={ () => setViewModal(false) }>
				<Modal.Header closeButton>
					<Modal.Title>Detalles de la anomalía { props.index }</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ul>{ detailsArray }</ul>
				</Modal.Body>
				<Modal.Footer>
					<Button className="secondary-button" onClick={ () => setViewModal(false) }>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ListedAnomaly;