import React, { useState } from "react";
import { Form } from 'react-bootstrap';
import PsychologyIcon from '@mui/icons-material/Psychology';

const Column = (props) => {

	const [checkedIA, setCheckedIA] = useState(false);
	const [checkedDate, setCheckedDate] = useState(false);
	const [select, setSelect] = useState('N-A');

	return (
		<div
			className="row-separator p-3 d-flex justify-content-between ms-5">
			<div style={ { width: '30vw', display: "flex", alignItems: "center" } } >
				<h6>{ props.index }  { props.name }</h6>
			</div>
			<Form.Group className="d-flex flex-row justify-content-between">
				<Form.Select
					as="select"
					id={ `select-${props.index - 1}` }
					defaultValue="N-A"
					onChange={ (e) => {
						setSelect(e.target.value);
						if (e.target.value !== "N-A") {
							setCheckedIA(true);
						}
						else {
							setCheckedIA(false);
						}
					} }>
					<option value="N-A" key="N-A">Agente no asignado</option>
					<option value="A-I" key="A-I">Agente Interno</option>
					<option value="A-E" key="A-E">Agente Externo</option>
					<option value="D-I" key="D-I">Dato Informativo</option>
				</Form.Select>
			</Form.Group>
			<div className="d-flex flex-row" style={ { width: '10vw' } } >
				<div className="me-3">
					<PsychologyIcon fontSize="large" />
				</div>
				<div>
					<Form.Check
						type="checkbox"
						id={ `ia-checkbox-${props.index - 1}` }
						value={ checkedIA }
						checked={ select === "N-A" || select === "D-I" ? false : true }
						onChange={ () => setCheckedIA(!checkedIA) }
						disabled
					/>
				</div>
			</div>
			<Form.Group className="d-flex flex-row" style={ { width: '4vw' } } >
				<Form.Check
					type='checkbox'
					id={ `date-checkbox-${props.index - 1}` }
					value={ checkedDate }
					checked={ checkedDate }
					onChange={ () => {
						setTimeout(() => {
							setCheckedDate(!checkedDate);
						}, 100)
					} }
				/>
			</Form.Group>
		</div >
	);
}


export default Column;