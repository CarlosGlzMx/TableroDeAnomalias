import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";

function ListedAnomaly(props) {
    // Variable para poder abrir y cerrar los modales
    const [viewModal, setViewModal] = useState(false);

	return (
		<div className = "ListedAnomaly w-100" onClick = { () => { if (!viewModal) setViewModal(true) }}>
            <h1>{props.index} - {props.anomaly.name}</h1>
            <Modal show = { viewModal } onHide={ () => setViewModal(false) }>
                <Modal.Header closeButton>
                    <Modal.Title>Anomalia</Modal.Title>
                </Modal.Header>
                <Modal.Body>Detalles de la anomalía</Modal.Body>
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