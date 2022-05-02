import React from "react";
import { Form } from 'react-bootstrap';

const Column = (props) => {


    return (
        <div className="mb-4 d-flex justify-content-around">
            <div className="w-25">
                <h6>{props.index}  {props.name}</h6>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <Form.Select>
                    <option selected={true} value="N-A">Agente no asignado</option>
                    <option value="A-I">Agente Interno</option>
                    <option value="A-E">Agente Externo</option>
                </Form.Select>
            </div>
            <div className="d-flex flex-row">
                <div className="me-3">
                    <h6>Inteligencia Artificial</h6>
                </div>
                <div>
                    <Form.Check
                        type="checkbox"
                        id={`default-checkbox`}
                        checked={true}
                    />
                </div>
            </div>
        </div >
    );
}


export default Column;