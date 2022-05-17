import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import { useLocation } from "react-router-dom";
import Column from './Column';
import { Form, Button } from 'react-bootstrap';
// import readXlsxFile from 'read-excel-file';
import * as XLSX from "xlsx";

const SelectColumn = (props) => {

    const location = useLocation();

    // Archivo .csv o .xlsx
    const data = location.state?.data;

    const type = location.state?.type;

    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);

    // Form Data
    //TODO: Esto puede cambiar según el nombre que recibe la API
    const [formData, setFormData] = useState([])

    useEffect(() => {
        console.log('FormData', formData);
    }, [formData]);

    useEffect(() => {
        if (data !== undefined) {
            if (type === "text/csv") {
                // Passing file data (event.target.files[0]) to parse using Papa.parse
                Papa.parse(data, {
                    header: true,
                    skipEmptyLines: true,
                    complete: function (results) {
                        const rowsArray = [];
                        const valuesArray = [];

                        // Iterating data to get column name and their values
                        results.data.map((d) => {
                            rowsArray.push(Object.keys(d));
                            valuesArray.push(Object.values(d));
                        });

                        // Filtered Column Names
                        setTableRows(rowsArray[0]);
                    },
                });
            }
            if (type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {                
                const reader = new FileReader();

                reader.onload = (evt) => {
                    const bstr = evt.target.result;
                    const wb = XLSX.read(bstr, { type: "binary", sheetRows: 1 });
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    const f = XLSX.utils.sheet_to_json(ws, { header: 1 });
                    setTableRows(f[0]);
                    console.log(tableRows);
                };
                reader.readAsBinaryString(data);
            }
        }
    }, [])


    const submitHandler = (event) => {
        event.preventDefault();

        //TODO:
        // Guardamos la info en formData para después se envíe
        tableRows.map((rows, index) => {
            setFormData(formData => [
                ...formData,
                {
                    name: tableRows[index],
                    column_type: event.target[index * 3].value,
                    ia: event.target[(index * 3) + 1].value,
                    date: event.target[(index * 3) + 2].value
                }
            ]);
        })
    }

    return (
        <div className="SelectColumn">
            <div
                style={{
                    height: "20vh",
                    marginLeft: "25%",
                    padding: "5vh 0"
                }}>
                <h2>Define los actores para entrenar el modelo</h2>
            </div>
            <Form onSubmit={submitHandler}>
                <div className="">
                    <div className="mb-4 d-flex justify-content-between ms-5">
                        <div className="" style={{ width: '36vw' }}>
                            <h6>Nombre</h6>
                        </div>
                        <div className="d-flex flex-row justify-content-between" style={{ width: '15vw' }} >
                            <h6>Tipo de columna</h6>
                        </div>
                        <div className="d-flex flex-row" style={{ width: '13vw' }} >
                            <h6>Intelingecia artificial</h6>
                        </div>
                        <div className="d-flex flex-row pe-5">
                            <h6>Fecha Principal</h6>
                        </div>
                    </div >
                    {
                        tableRows.map((rows, index) => {
                            return <Column key={index} index={index + 1} name={rows} ></Column>
                        })
                    }


                </div>
                <div className="mb-4 d-flex justify-content-center">
                    <Button
                        style={{
                            backgroundColor: "#ff8300",
                            border: "none"
                        }}
                        className="mx-auto"
                        type={'submit'}
                        size="lg">
                        Seleccionar Columnas
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SelectColumn;