import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = (props) => {
	return (
		<div className = "full-center flex-column loading">
			<Spinner animation="border" role="status" />
			<h4>{ props.message }</h4>
		</div>
	);
}

export default Loading