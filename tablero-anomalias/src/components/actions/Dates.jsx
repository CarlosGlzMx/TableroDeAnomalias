import { React, useContext } from "react";
import { ConfigContext } from "../dashboard/Dashboard";

function Dates() {
	// Contexto necesarios para las fechas
	const { config, setConfig } = useContext(ConfigContext);

	return (
		<div className="Dates">
			<label htmlFor="start">Fecha inicial: </label>
			<input className="m-2 text-center" type="date" name="start-date"
				defaultValue={ config["fecha_inicio"] } min={ config["fecha_min"] } max={ config["fecha_fin"] }
				onChange={ (e) => setConfig({ ...config, fecha_inicio: e.target.value }) } />
			<label htmlFor="end">Fecha final: </label>
			<input className="m-2 text-center" type="date" name="final-date"
				defaultValue={ config["fecha_fin"] } max={ config["fecha_max"] } min={ config["fecha_inicio"] }
				onChange={ (e) => setConfig({ ...config, fecha_fin: e.target.value }) } />
		</div>
	);
}

export default Dates;
