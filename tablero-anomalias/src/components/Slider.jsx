import { React, useState, useEffect, useContext } from "react";
import { ConfigContext } from "../App";

export default function Slider() {
  // Importa el contexto que guarda la configuración del tablero
  const { config, setConfig } = useContext(ConfigContext);
  const [sliderValue, setSliderValue] = useState(config["umbral_anomalia"]);

  return (
    <div className = "Slider">
      <h3 className="m-0 pt-2 pb-1">Seleccione la precisión del modelo: {sliderValue}</h3>
      <div className="w-100 d-flex align-items-center pb-2 justify-content-center">
        <h4 className="m-0 p-0 pe-3">-1</h4>
        <div className="slider-parent w-50">
          <input type="range" min = "-1" max = "1" step = {0.1} defaultValue = {sliderValue}
            onChange = { e => setSliderValue(e.target.value) }
            onMouseUp = { () => setConfig({ ...config, umbral_anomalia: sliderValue}) }/>
        </div>
        <h4 className="m-0 p-0 ps-3">1</h4>
      </div>
    </div>
  );
}