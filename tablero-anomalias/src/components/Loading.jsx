import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = (props) => {
	return (
		<div
			style={ {
				marginLeft: '40vw',
				maxWidth: '20vw',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'

			} }>
			<Spinner animation="border" role="status" />
			<h4>{ props.message }</h4>
		</div>
	);
}

export default Loading