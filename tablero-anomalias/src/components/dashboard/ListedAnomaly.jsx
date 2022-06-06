import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";

function ListedAnomaly(props) {
    // Variable para poder abrir y cerrar los modales
    const [viewModal, setViewModal] = useState(false);

    const detailsArray = Object.keys(props.anomaly).map((value, index) => {
        return <li>{value} : {props.anomaly[value]}</li>
    })

	return (
		<div className = "ListedAnomaly w-100 p-2" onClick = { () => { if (!viewModal) setViewModal(true) }}>
            <h3>{props.index} - {props.anomaly.name}</h3>
            <Modal show = { viewModal } onHide={ () => setViewModal(false) }>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles de la anomalía</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>{ detailsArray }</ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ () => setViewModal(false) }>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
	);
}

export default ListedAnomaly;