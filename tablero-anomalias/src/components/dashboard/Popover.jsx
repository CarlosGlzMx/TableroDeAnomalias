import React from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";

function ChartPopover(props) {

	const texts = [
		"Gráfica 1: Cantidad de anomalías por día",
		"Gráfica 2: Cantidad de anomalías por hora",
		"Gráfica 3: Cantidad de anomalías por minuto",
		"Gráfica 4: Cantidad de anomalías por segundo",
		"Gráfica 5: Cantidad de anomalías por milisegundo",
		"Gráfica 6: Cantidad de anomalías por microsegundo",
	]

	return (
		<Popover id="popover-basic">
			<Popover.Body>
				{ texts[props.graphNumber - 1] }
			</Popover.Body>
		</Popover>
	);
};

const ChartHelp = (props) => (
	<OverlayTrigger trigger="hover" placement="bottom" overlay={ <ChartPopover graphNumber={ props.graphNumber } /> }>
		<div><b>(+info)</b></div>
	</OverlayTrigger>
);

export default ChartHelp;