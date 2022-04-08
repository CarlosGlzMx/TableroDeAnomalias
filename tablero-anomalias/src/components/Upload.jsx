import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Form } from "react-bootstrap";

function Upload() {
	return (
		<div className="Upload">
			<div style={ { width: "50%	", height: "80vh", marginLeft: "25%", padding: "35vh 0" } }>
				<Form.Group controlId="formFile" className="mb-3">
					<Form.Label>Carga un archivo de tipo .csv o .xlsx</Form.Label>
					<Form.Control type="file" onChange={ (e) => console.log(e.target.files) } />
				</Form.Group>
			</div>
		</div>
	);
}

export default Upload;