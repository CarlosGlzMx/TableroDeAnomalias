import React, { useState, useEffect } from "react";
import { Form } from 'react-bootstrap';
import PsychologyIcon from '@mui/icons-material/Psychology';

const Column = (props) => {

    const [checkedBox, setCheckedBox] = useState(true);
    const [checkedRadio, setCheckedRadio] = useState(false);

    const [select, setSelect] = useState('N-A');

    useEffect(() => {
        console.log('Value:', select);
    }, [select]);


    return (
        <div
            className="mb-4 d-flex justify-content-between ms-5"
            style={{
                marginRight: '5vw'
            }} >
            <div style={{ width: '30vw' }} >
                <h6>{props.index}  {props.name}</h6>
            </div>
            <Form.Group className="d-flex flex-row justify-content-between">
                <Form.Select
                    as="select"
                    id={`select-${props.key}`}
                    onChange={(e) => setSelect(e.target.value)}>
                    <option selected value="N-A" key="N-A">Agente no asignado</option>
                    <option value="A-I" key="A-I">Agente Interno</option>
                    <option value="A-E" key="A-E">Agente Externo</option>
                </Form.Select>
            </Form.Group>
            <div className="d-flex flex-row" style={{ width: '10vw' }} >
                <div className="me-3">
                    <PsychologyIcon fontSize="large" />
                </div>
                <div>
                    <Form.Check
                        type="checkbox"
                        id={`default-checkbox-${props.key}`}
                        value={checkedBox}
                        disabled={select === "N-A" ? true : false}
                        checked={select === "N-A" ? false : checkedBox}
                        onChange={() => setCheckedBox(!checkedBox)}
                    />
                </div>
            </div>
            <Form.Group className="d-flex flex-row" style={{ width: '4vw' }} >
                <Form.Check
                    type='radio'
                    id={`default-radio-${props.key}`}
                    value={checkedRadio}
                    checked={checkedRadio}
                    onClick={() => setCheckedRadio(!checkedRadio)}
                />
            </Form.Group>
        </div >
    );
}


export default Column;