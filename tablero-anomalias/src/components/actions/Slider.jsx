import { React, useState, useContext } from "react";
import { ConfigContext } from "../dashboard/Dashboard";

export default function Slider() {
	// Importa el contexto que guarda la configuración del tablero
	const { config, setConfig } = useContext(ConfigContext);
	const [sliderValue, setSliderValue] = useState(config["umbral_anomalia"]);

	return (
		<div className="Slider">
			<h6 className="m-0 pt-2 pb-1 full-center">Seleccione la precisión del modelo: { sliderValue }</h6>
			<div className="w-100 d-flex align-items-center pb-2 justify-content-center" data-html2canvas-ignore>
				<h6 className="m-0 p-0 pe-3">-0.5</h6>
				<div className="slider-parent w-50">
					<input className="w-100" type="range" min="-0.5" max="0.5" step={ 0.01 } defaultValue={ sliderValue }
						onChange={ e => setSliderValue(e.target.value) }
						onMouseUp={ () => setConfig({ ...config, umbral_anomalia: sliderValue }) } />
				</div>
				<h6 className="m-0 p-0 ps-3">0.5</h6>
			</div>
		</div>
	);
}
