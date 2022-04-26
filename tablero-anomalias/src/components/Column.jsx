import React from "react";
import { Form } from 'react-bootstrap';

const Column = (props) => {


    return (
        <div className="mb-4 d-flex justify-content-around">
            <div className="w-25">
                <h6>{props.index}  {props.name}</h6>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <div className="me-3">
                    <h6>Agente Interno</h6>
                </div>
                <div>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                    />
                </div>
                <div className="ms-2">
                    <h6>Agente Externo</h6>
                </div>
            </div>
            <div className="d-flex flex-row">
                <div className="me-3">
                    <h6>Inteligencia Artificial</h6>
                </div>
                <div>
                    <Form.Check
                        type="checkbox"
                        id={`default-checkbox`}
                    />
                </div>
            </div>
        </div >
    );
}


export default Column;